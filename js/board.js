/**
 * This function returns an HTML template of a task
 * @param {*} task 
 * @param {*} doneSubtasks 
 * @returns 
 */
function taskTemplate(task, doneSubtasks) {
    return /* html */ `
        <div class="task">
            <div class="task-category ${task.category === 'Technical task' ? 'technical-task' : 'user-story'}">${task.category}</div>
            <div class="task-title-and-description-container">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div>
                <progress class="task-progress" max="100" value="${doneSubtasks/task.subtasks.length * 100}"></progress>
                <span>${doneSubtasks}/${task.subtasks.length}</span>
            </div>
            <div class="profile-icons-and-priority-container">
                <div class="profile-icons"></div>
                <img src="'../assets/img/' + ${task.priority.toLowerCase()} + 'icon.svg" class="priority-icon">
            </div>
        </div>
    `;
}

/**
 * This function renders the tasks of all users
 */
function renderTasksOfAllUsers() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        renderTasksOfSingleUser(user);
    }
}


/**
 * This function calculates the number of subtasks of a task
 * @param {*} task 
 * @returns 
 */
function calculateSubtasks(task) {
    let doneSubtasks = 0;
    for (let j = 0; j < task.subtasks.length; j++) {
        let subtask = task.subtasks[j];
        if (subtask.done) {
            doneSubtasks++;
        }
    }
    return doneSubtasks;
}

/**
 * This function renders the tasks of one user
 * @param {*} user 
 */
function renderTasksOfSingleUser(user) {
    for (let i = 0; i < user.tasks.length; i++) {
        let task = user.tasks[i];
        renderTask(task);
    }
}


/**
 * This function renders one task
 * @param {*} task 
 */
function renderTask(task) {
    let doneSubtasks = calculateSubtasks(task);
    let status = task.status;
    let id = '';
    if (status === 'To do') {
        id = 'to-do';
    } else if (status === 'In progress') {
        id = 'in-progress';
    } else if (status === 'Await feedback') {
        id = 'await-feedback';
    } else if (status === 'Done') {
        id = 'done';
    } else {
        console.error('Invalid task status');
    }
    document.getElementById(id).innerHTML += taskTemplate(task, doneSubtasks);
}


/**
 * This function renders an array of tasks
 * @param {*} tasks 
 */
function renderTasks(tasks) {
    clearTasks();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        renderTask(task);
    }
}


/**
 * This function removes all tasks from the board
 */
function clearTasks() {
    let statusIds = ['to-do', 'in-progress', 'await-feedback', 'done'];
    for (let i = 0; i < statusIds.length; i++) {
        let statusId = statusIds[i];
        document.getElementById(statusId).innerHTML = '';
    }
}


/**
 * This function initializes the board by calling init() and rendering the tasks of all users
 */
async function initBoard() {
    await init();
    renderTasksOfAllUsers();
}


/**
 * This function searches for the tasks that match the search input value and calls the function that renders them
 */
function searchTasks() {
    let searchInput = document.getElementById('board-search-input');
    let searchString = searchInput.value.toLowerCase();
    let foundTasks = [];
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        foundTasks = [...foundTasks, ...user.tasks.filter(task => task.description.toLowerCase().includes(searchString) || task.title.toLowerCase().includes(searchString))];
    }
    renderTasks(foundTasks);
}