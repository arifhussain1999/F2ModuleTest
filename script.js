const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const professionInput = document.getElementById('profession');
const ageInput = document.getElementById('age');
const messageDiv = document.getElementById('message');
const employeeList = document.getElementById('employee-list');

let employees = [];
let idCounter = 1;  // Initialize a counter for unique IDs

form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();
    
    if (name === '' || profession === '' || age === '') {
        showMessage('Error:Please Make sure All the fields are filled before adding in an employee', 'error');
    } else if (isNaN(age) || age <= 0) {
        showMessage('Age must be a positive number', 'error');
    } else {
        const employee = { id: idCounter++, name, profession, age };
        employees.push(employee);
        renderEmployees();
        showMessage('Employee added successfully', 'success');
        form.reset();
    }
});

function renderEmployees() {
    employeeList.innerHTML = '';  // Clear current list
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.innerHTML = `${employee.id}. Name: ${employee.name} Profession: ${employee.profession} Age: ${employee.age} 
        <button onclick="deleteEmployee(${employee.id})">Delete</button>`;
        employeeList.appendChild(li);
    });
    
}

function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);  // Remove employee from array
    renderEmployees();  // Re-render employee list
    showMessage('Employee removed', 'success');
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
