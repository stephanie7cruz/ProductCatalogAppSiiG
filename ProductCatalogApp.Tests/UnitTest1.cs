using Moq;
using ProductCatalogAppSii.Models;
using ProductCatalogAppSii.Services.Implementations;
using ProductCatalogAppSii.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace ProductCatalogAppSii.Tests
{
    public class ProductServiceTests
    {
        private readonly Mock<IProductApiClient> _mockProductApiClient;
        private readonly ProductService _productService;

        public ProductServiceTests()
        {
            _mockProductApiClient = new Mock<IProductApiClient>();
            _productService = new ProductService(_mockProductApiClient.Object);
        }

        [Fact]
        public async Task CalculateTax_ShouldReturnCorrectTaxForSingleProduct()
        {
            // Arrange
            var product = new Product { Id = 1, Title = "Test Product", Price = 100.00m, Description = "Desc", Image = "img.png", Category = new Category { Id = 1, Name = "Cat1" } };
            _mockProductApiClient.Setup(client => client.GetProductByIdAsync(1))
                                 .ReturnsAsync(product);

            // Act
            var result = await _productService.GetProductWithTaxByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(100.00m, result.Price);
            Assert.Equal(19.00m, result.Tax); // 100 * 0.19 = 19
            Assert.Equal(119.00m, result.PriceWithTax); // 100 + 19 = 119
        }

        [Fact]
        public async Task GetAllProductsWithTax_ShouldCalculateTaxForAllProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Title = "Product A", Price = 50.00m, Description = "Desc A", Image = "imgA.png", Category = new Category { Id = 1, Name = "Cat1" } },
                new Product { Id = 2, Title = "Product B", Price = 200.00m, Description = "Desc B", Image = "imgB.png", Category = new Category { Id = 2, Name = "Cat2" } }
            };
            _mockProductApiClient.Setup(client => client.GetProductsAsync())
                                 .ReturnsAsync(products);

            // Act
            var results = await _productService.GetAllProductsWithTaxAsync();

            // Assert
            Assert.NotNull(results);
            Assert.Equal(2, results.Count);

            var productA = results.Find(p => p.Id == 1);
            Assert.NotNull(productA);
            Assert.Equal(50.00m, productA.Price);
            Assert.Equal(9.50m, productA.Tax); // 50 * 0.19 = 9.50
            Assert.Equal(59.50m, productA.PriceWithTax); // 50 + 9.50 = 59.50

            var productB = results.Find(p => p.Id == 2);
            Assert.NotNull(productB);
            Assert.Equal(200.00m, productB.Price);
            Assert.Equal(38.00m, productB.Tax); // 200 * 0.19 = 38
            Assert.Equal(238.00m, productB.PriceWithTax); // 200 + 38 = 238
        }

        [Fact]
        public async Task GetProductWithTaxById_ShouldReturnNullIfProductNotFound()
        {
            // Arrange
            _mockProductApiClient.Setup(client => client.GetProductByIdAsync(It.IsAny<int>()))
                                 .ReturnsAsync((Product)null);

            // Act
            var result = await _productService.GetProductWithTaxByIdAsync(999); // ID que no existe

            // Assert
            Assert.Null(result);
        }
    }
}