using System.ComponentModel.DataAnnotations;

namespace WebAppProducts.Models;

public class Product
{
    public int Id { get; set; }
    [Required]
    [MaxLength(150)]
    public string? Description { get; set; }
    [Range(0, int.MaxValue, ErrorMessage = "Stock cannot be negative")]
    public int Stock { get; set; }
}
