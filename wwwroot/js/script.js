// API Base URL
const API_BASE_URL = 'http://localhost:5023/api';

// Toggle sidebar
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Load employee list by default
    loadEmployeeList();
});

// Load employee list
async function loadEmployeeList() {
    try {
        const response = await fetch(`${API_BASE_URL}/Employees`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }
        const employees = await response.json();
        
        const content = `
            <div class="container">
                <h2 class="mb-4">Employee List</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${employees.map(employee => `
                                <tr>
                                    <td>${employee.name}</td>
                                    <td>${employee.email}</td>
                                    <td>${employee.phone || '-'}</td>
                                    <td>${employee.salary.toFixed(2)}</td>
                                    <td class="table-actions">
                                        <button class="btn btn-sm btn-primary" onclick="loadUpdateEmployee('${employee.id}')">
                                            <i class="fas fa-edit"></i> Edit
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${employee.id}')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        document.getElementById('main-content').innerHTML = content;
    } catch (error) {
        showError('Failed to load employees: ' + error.message);
        console.error('Error:', error);
    }
}

// Load create employee form
function loadCreateEmployee() {
    const content = `
        <div class="form-container">
            <h2 class="mb-4">Create New Employee</h2>
            <form id="createEmployeeForm" onsubmit="createEmployee(event)">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                    <label for="salary" class="form-label">Salary</label>
                    <input type="number" step="0.01" min="0" class="form-control" id="salary" required>
                </div>
                <button type="submit" class="btn btn-primary">Create Employee</button>
                <button type="button" class="btn btn-secondary" onclick="loadEmployeeList()">Cancel</button>
            </form>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

// Create employee
async function createEmployee(event) {
    event.preventDefault();
    
    const employee = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || null,
        salary: parseFloat(document.getElementById('salary').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/Employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to create employee');
        }

        const result = await response.json();
        showSuccess('Employee created successfully');
        loadEmployeeList();
    } catch (error) {
        showError('Failed to create employee: ' + error.message);
        console.error('Error:', error);
    }
}

// Load update employee form
async function loadUpdateEmployee(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/Employees/${id}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }
        const employee = await response.json();
        
        const content = `
            <div class="form-container">
                <h2 class="mb-4">Update Employee</h2>
                <form id="updateEmployeeForm" onsubmit="updateEmployee(event, '${employee.id}')">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" value="${employee.name}" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" value="${employee.email}" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="tel" class="form-control" id="phone" value="${employee.phone || ''}">
                    </div>
                    <div class="mb-3">
                        <label for="salary" class="form-label">Salary</label>
                        <input type="number" step="0.01" min="0" class="form-control" id="salary" value="${employee.salary}" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Employee</button>
                    <button type="button" class="btn btn-secondary" onclick="loadEmployeeList()">Cancel</button>
                </form>
            </div>
        `;
        
        document.getElementById('main-content').innerHTML = content;
    } catch (error) {
        showError('Failed to load employee details: ' + error.message);
        console.error('Error:', error);
    }
}

// Update employee
async function updateEmployee(event, id) {
    event.preventDefault();
    
    const employee = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || null,
        salary: parseFloat(document.getElementById('salary').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/Employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to update employee');
        }

        const result = await response.json();
        showSuccess('Employee updated successfully');
        loadEmployeeList();
    } catch (error) {
        showError('Failed to update employee: ' + error.message);
        console.error('Error:', error);
    }
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/Employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to delete employee');
        }

        showSuccess('Employee deleted successfully');
        loadEmployeeList();
    } catch (error) {
        showError('Failed to delete employee: ' + error.message);
        console.error('Error:', error);
    }
}

// Show success message
function showSuccess(message) {
    alert(message);
}

// Show error message
function showError(message) {
    alert(message);
} 