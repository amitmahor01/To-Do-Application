// Select the DOM elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// Function to load tasks from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

// Function to save tasks to localStorage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('span').textContent;
        const completed = li.classList.contains('completed');
        todos.push({ text, completed });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to create and add a new task element
function createTodoElement(todoText, isCompleted = false) {
    const li = document.createElement('li');
    
    // Create the checkbox to mark tasks as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTodos();
    });

    // Create a span element to hold the task text
    const span = document.createElement('span');
    span.textContent = todoText;

    // Create the edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit your task:', span.textContent);
        if (newText) {
            span.textContent = newText.trim();
            saveTodos();
        }
    });

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
        saveTodos();
    });

    // Add classes for styling if the task is completed
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Append everything to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    // Append the list item to the to-do list
    todoList.appendChild(li);
}

// Function to add a new task
function addTodo() {
    const todoText = todoInput.value.trim(); // Get the input value and remove extra spaces
    if (todoText !== "") {
        createTodoElement(todoText);
        todoInput.value = ""; // Clear the input field
        saveTodos(); // Save the updated list to localStorage
    }
}

// Add event listener to the "Add" button
addTodoBtn.addEventListener('click', addTodo);

// Add "Enter" key functionality for adding tasks
todoInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Clear all tasks function
function clearAllTasks() {
    todoList.innerHTML = '';
    saveTodos();
}

// Create the "Clear All" button
const clearAllBtn = document.createElement('button');
clearAllBtn.textContent = 'Clear All Tasks';
clearAllBtn.classList.add('clear-btn');
clearAllBtn.addEventListener('click', clearAllTasks);
document.body.appendChild(clearAllBtn); // Add it to the body

// Load existing tasks from localStorage when the page loads
window.onload = loadTodos;
