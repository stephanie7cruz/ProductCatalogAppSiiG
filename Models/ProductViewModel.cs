namespace ProductCatalogAppSii.Models
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; } // Reutilizamos la clase Category de Product
        public string Image { get; set; }
        public decimal Tax { get; set; }
        public decimal PriceWithTax { get; set; }
    }
}
