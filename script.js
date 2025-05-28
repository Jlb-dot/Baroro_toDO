let tasks = [];
let taskIdCounter = 1;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    
    if (!taskInput.value.trim()) return;

    const task = {
        id: taskIdCounter++,
        title: taskInput.value.trim(),
        description: descriptionInput.value.trim(),
        status: 'todo'
    };

    tasks.push(task);
    taskInput.value = '';
    descriptionInput.value = '';
    renderTasks();
}

function moveTask(id, newStatus) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(t => t.status !== 'done');
    renderTasks();
}

function renderTasks() {
    const todoContainer = document.getElementById('todoTasks');
    const progressContainer = document.getElementById('progressTasks');
    const doneContainer = document.getElementById('doneTasks');

    todoContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const progressTasks = tasks.filter(t => t.status === 'progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    todoTasks.forEach(task => {
        todoContainer.appendChild(createTaskCard(task));
    });

    progressTasks.forEach(task => {
        progressContainer.appendChild(createTaskCard(task));
    });

    doneTasks.forEach(task => {
        doneContainer.appendChild(createTaskCard(task));
    });

    // Update counts
    document.getElementById('todoCount').textContent = todoTasks.length;
    document.getElementById('progressCount').textContent = progressTasks.length;
    document.getElementById('doneCount').textContent = doneTasks.length;
    document.getElementById('progressCircle').textContent = `${doneTasks.length}/${tasks.length}`;
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    
    card.innerHTML = `
        <div class="task-title">${task.title}</div>
        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
        <div class="task-actions">
            ${task.status === 'todo' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'progress')">🦋</button>` : ''}
            ${task.status === 'progress' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'done')">💖</button>` : ''}
            ${task.status === 'progress' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'todo')">🌷</button>` : ''}
            ${task.status === 'done' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'progress')">🌼</button>` : ''}
            <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">✨</button>
        </div>
    `;
    
    return card;
}

// Allow Enter key to add task
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});