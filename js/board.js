/**
 * This function returns an HTML template of a task
 * @param {Object} task
 * @param {number} doneSubtasks number of completed subtasks
 * @returns {string} task HTML template
 */
function taskTemplate(task, doneSubtasks) {
    return /* html */ `<div class="task">
            <div class="task-category ${task.category === 'Technical Task' ? 'technical-task' : 'user-story'}">${task.category}</div>
            <div class="task-title-and-description-container">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div>
                <progress class="task-progress" max="100" value="${doneSubtasks/task.subtasks.length * 100}"></progress>
                <span>${doneSubtasks}/${task.subtasks.length}</span>
            </div>
            <div class="initial-avatars-and-priority-container">
                <div id="initial-avatars">${generateInitialAvatarsTemplate(task)}</div>
                <img src="${'../assets/img/' + task.priority.toLowerCase() + '-board-priority-icon.svg'}" class="priority-icon">
            </div>
        </div>`;
}


/**
 * This function grabs the initials of a user
 * @param {Object} user 
 * @returns {string} initial string
 */
function getInitials(user) {
    let initials = user.firstName.charAt(0) + user.lastName.charAt(0);
    return initials;
}


/**
 * This function returns an initial avatar HTML template for a user
 * @param {Object} user 
 * @returns {string} inital avatar HTML template
 */
function initialAvatarTemplate(user) {
    return /* html */ `<div class="initial-avatar ${user.color}">${getInitials(user)}</div>`;
}


/**
 * This function calculates the number of completed subtasks of a task
 * @param {Object} task 
 * @returns {number} number of done subtasks
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
 * This function returns all the collaborators of a task
 * @param {Object} task 
 * @returns {Array} collaborators
 */
function getCollaborators(task) {
    let collaborators = [];
    for (let i = 0; i < task.collaborators.length; i++) {
        let collaboratorId = task.collaborators[i];
        let user = users.filter(user => user.id === collaboratorId)[0];
        collaborators.push(user);
    }
    return collaborators;
}


/**
 * This function returns an HTML template with inital avatars of all the collaborators of a task
 * @param {Object} task 
 * @returns {string} HTML string of initial avatar divs
 */
function generateInitialAvatarsTemplate(task) {
    let collaborators = getCollaborators(task);
    let HTMLString = '';
    if (collaborators) {
        for (let i = 0; i < collaborators.length; i++) {
            let collaborator = collaborators[i];
            HTMLString += initialAvatarTemplate(collaborator);
        }
    }
    return HTMLString;
}


/**
 * This function renders one task
 * @param {Object} task 
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
 * @param {Array} tasks 
 */
function renderTasks(tasks) {
    clearTasks();
    addNoTasksMessage();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        renderTask(task);
    }
}

/**
 * This function displays a message in the appropriate column (or row) when there are no tasks with that status
 */
function addNoTasksMessage() {
    let statuses = ['To do', 'In progress', 'Await feedback', 'Done'];
    for (let i = 0; i < statuses.length; i++) {
        let status = statuses[i];
        let tasksWithStatusX = tasks.filter(task => task.status === status);
        if (tasksWithStatusX.length === 0) {
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
            document.getElementById(id).innerHTML = `<div class="no-tasks-message">No tasks ${status.toLowerCase()}</div>`
        } 
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
 * This function initializes the board by calling init() and rendering all tasks
 */
async function initBoard() {
    await init();
    renderTasks(tasks);
}


/**
 * This function searches for the tasks that match the search input value and calls the function that renders them
 */
function searchTasks() {
    let searchInput = document.getElementById('board-search-input');
    let searchString = searchInput.value.toLowerCase();
    foundTasks = tasks.filter(task => task.description.toLowerCase().includes(searchString) || task.title.toLowerCase().includes(searchString));
    if (foundTasks.length > 0) {
        document.getElementById('no-results').style.display = 'none';
        document.getElementById('board-columns-container').style.display = 'flex';
        renderTasks(foundTasks);
    } else {
        document.getElementById('board-columns-container').style.display = 'none';
        document.getElementById('no-results').style.display = 'block';
    }
}