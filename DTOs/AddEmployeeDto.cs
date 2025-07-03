using System.ComponentModel.DataAnnotations;

namespace EmployeeAdminPortal.DTOs
{
    public class AddEmployeeDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public string? Phone { get; set; }
        
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive number")]
        public decimal Salary { get; set; }
    }
}


