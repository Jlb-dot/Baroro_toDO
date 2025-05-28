
let tasks = [
    {
        id: 1,
        title: "Morning skincare routine",
        description: "Cleanse, tone, moisturize, and apply SPF",
        status: "todo"
    },
    {
        id: 2,
        title: "Plan weekend brunch",
        description: "Research cute cafes and make reservations",
        status: "todo"
    },
    {
        id: 3,
        title: "Organize closet",
        description: "Sort through clothes and donate items I don't wear",
        status: "todo"
    },
    {
        id: 4,
        title: "Read 20 pages",
        description: "Continue with 'The Seven Husbands of Evelyn Hugo'",
        status: "progress"
    },
    {
        id: 5,
        title: "Workout session",
        description: "30-minute yoga flow and stretching",
        status: "progress"
    },
    {
        id: 6,
        title: "Call mom",
        description: "Catch up and plan next visit",
        status: "done"
    },
    {
        id: 7,
        title: "Buy fresh flowers",
        description: "Peonies or roses for the living room",
        status: "done"
    }
];
let taskIdCounter = 8;

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


    
    document.getElementById('todoCount').textContent = todoTasks.length;
    document.getElementById('progressCount').textContent = progressTasks.length;
    document.getElementById('doneCount').textContent = doneTasks.length;
    document.getElementById('progressCircle').textContent = `${doneTasks.length}/${tasks.length}`;
}

function createTaskCard(task) {
    const card = document.createElement('div');
    

    
    if (task.status === 'todo') {
        card.className = 'task-card todo-card';
    } else if (task.status === 'progress') {
        card.className = 'task-card progress-card';
    } else if (task.status === 'done') {
        card.className = 'task-card done-card';
    }
    
    card.innerHTML = `
        <div class="task-title">${task.title}</div>
        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
        <div class="task-actions">
            ${task.status === 'todo' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'progress')">🦋 Start</button>` : ''}
            ${task.status === 'progress' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'done')">💖 Complete</button>` : ''}
            ${task.status === 'progress' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'todo')">🌷 Back</button>` : ''}
            ${task.status === 'done' ? `<button class="action-btn" onclick="moveTask(${task.id}, 'progress')">🌼 Undo</button>` : ''}
            <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">✨ Delete</button>
        </div>
    `;
    
    return card;
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });


    
    renderTasks();
});