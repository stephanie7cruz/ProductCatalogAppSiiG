using ProductCatalogAppSii.Services.Interfaces;
using ProductCatalogAppSii.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalogAppSii.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductApiClient _productApiClient;
        private const decimal TaxRate = 0.19m; // 19%

        public ProductService(IProductApiClient productApiClient)
        {
            _productApiClient = productApiClient;
        }

        public async Task<List<ProductViewModel>> GetAllProductsWithTaxAsync()
        {
            var products = await _productApiClient.GetProductsAsync();
            return products.Select(p => new ProductViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Price = p.Price,
                Description = p.Description,
                Image = p.Image,
                Category = p.Category,
                Tax = CalculateTax(p.Price),
                PriceWithTax = p.Price + CalculateTax(p.Price)
            }).ToList();
        }

        public async Task<ProductViewModel> GetProductWithTaxByIdAsync(int id)
        {
            var product = await _productApiClient.GetProductByIdAsync(id);
            if (product == null)
            {
                return null;
            }

            return new ProductViewModel
            {
                Id = product.Id,
                Title = product.Title,
                Price = product.Price,
                Description = product.Description,
                Image = product.Image,
                Category = product.Category,
                Tax = CalculateTax(product.Price),
                PriceWithTax = product.Price + CalculateTax(product.Price)
            };
        }

        // Método privado para el cálculo de impuestos
        private decimal CalculateTax(decimal price)
        {
            return price * TaxRate;
        }
    }
}

