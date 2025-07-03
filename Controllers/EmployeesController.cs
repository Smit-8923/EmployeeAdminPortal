using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.DTOs;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Controllers
{
    //localhost:xxxx/api/employees 
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var allEmployees = dbContext.Employees.ToList();
            return Ok(allEmployees);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetEmployeesById([FromRoute] Guid id)
        {
            var employee = dbContext.Employees.Find(id);
            if (employee == null)
            {
                return NotFound($"Employee with ID '{id}' does not exist.");
            }
            return Ok(employee);
        }
        
        [HttpPost]
        public IActionResult AddEmployee([FromBody] AddEmployeeDto addEmployeeDto)
        {
            var employeeEntity = new Employee()
            {
                Id = Guid.NewGuid(),
                Name = addEmployeeDto.Name,
                Email = addEmployeeDto.Email,
                Phone = addEmployeeDto.Phone,
                Salary = addEmployeeDto.Salary,
            };

            dbContext.Employees.Add(employeeEntity);
            dbContext.SaveChanges();

            return Ok(employeeEntity);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult UpdateEmployee([FromRoute] Guid id, [FromBody] UpdateEmployeeDto updateEmployeeDto)
        {
            try
            {
                var employee = dbContext.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound($"Employee with ID '{id}' not found");
                }

                employee.Name = updateEmployeeDto.Name;
                employee.Email = updateEmployeeDto.Email;
                employee.Phone = updateEmployeeDto.Phone;
                employee.Salary = updateEmployeeDto.Salary;

                dbContext.SaveChanges();

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the employee: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult DeleteEmployee([FromRoute] Guid id)
        {
            try
            {
                var employee = dbContext.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound($"Employee with ID '{id}' not found");
                }

                dbContext.Employees.Remove(employee);
                dbContext.SaveChanges();

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the employee: {ex.Message}");
            }
        }
    }
}

    
