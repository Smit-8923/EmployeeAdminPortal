namespace EmployeeAdminPortal.DTOs
{
    public class UpdateEmployeeDto
    {
        public required string Name { get; set; }
        public required String Email { get; set; }
        public string? Phone { get; set; }
        public decimal Salary { get; set; }

    }
}
