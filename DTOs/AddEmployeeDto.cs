namespace EmployeeAdminPortal.DTOs
{
    public class AddEmployeeDto
    {
        public required string Name { get; set; }
        public required String Email { get; set; }
        public string? Phone { get; set; }
        public decimal Salary { get; set; }
    }
}


