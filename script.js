// script.js

// Get DOM elements
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('todo-due-date');
const prioritySelector = document.getElementById('priority-selector');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

// Array to hold tasks
let tasks = [];

// Add Task
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = prioritySelector.value;

  if (text) {
    const newTask = {
      id: Date.now(),
      text,
      dueDate,
      priority,
      completed: false
    };

    tasks.push(newTask);
    renderTasks();
    clearInputs();
  }
});

// Render tasks
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.toggle('completed', task.completed);
    taskItem.innerHTML = `
      <span>${task.text} - ${task.dueDate} - ${task.priority}</span>
      <div>
        <button class="task-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="task-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
});

// Filter tasks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    if (filter === 'completed') {
      tasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      tasks = tasks.filter(task => !task.completed);
    } else {
      // Reset filter
      tasks = [...tasks];
    }
    renderTasks();
  });
});

// Clear input fields after adding task
function clearInputs() {
  todoInput.value = '';
  dueDateInput.value = '';
  prioritySelector.value = 'low';
}
