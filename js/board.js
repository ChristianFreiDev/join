let draggedTaskId;

/**
 * This function enables dropping a task into the respective area by preventing the default action that occurs when something is dropped
 * @param {Event} event 
 */
function allowTaskDrop(event) {
    event.preventDefault();
}


/**
 * This function stores the ID of the task that is currently being dragged in a global variable
 * @param {number} id 
 */
function startDraggingTask(event, id) {
    draggedTaskId = id;
    event.target.classList.add('rotate-task');
}


/**
 * This function removes the task rotation if the drag event ends without the task being dropped anywhere
 * @param {Event} event 
 */
function endDraggingTask(event) {
    event.target.classList.remove('rotate-task');
}


/**
 * This function centers a pop-up with a certain id
 * @param {string} id 
 */
function centerPopup(id) {
    let popup = document.getElementById(id);
    let popupContainer = document.getElementById('pop-up-container');
    popupContainer.style.display = 'block';
    popup.style.display = 'flex';
    // This is needed for the function to work:
    setTimeout(function() {
        popup.classList.add('center-pop-up')
        document.body.style.overflow = 'hidden';
    }, 0);
}


/**
 * This function removes a pop-up
 * @param {string} id 
 */
function removePopup(id) {
    let popup = document.getElementById(id);
    let popupContainer = document.getElementById('pop-up-container');
    popup.classList.remove('center-pop-up');
    // Wait for transition to end, then hide pop-up container and enable scrolling again:
    setTimeout(function() {
        popup.style.display = 'none';
        popupContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 126);
}


/**
 * This function opens the add-task popup
 * @param {string} statusId task status ID
 */
function openAddTaskPopup(statusId) {
    centerPopup('add-task-pop-up');
    // This should actually change the onsubmit attribute of the form once the form supports it
    let createTaskButton = document.getElementById('create-task-button');
    createTaskButton.setAttribute('onclick', createTaskFromBoard(statusId));
}


function fillopenTaskPopup(taskId) {
    let task = tasks[taskId];
    let openTaskPopupCategory = document.getElementById('open-task-pop-up-category');
    openTaskPopupCategory.innerHTML = openTaskPopupCategoryTemplate(task);
    let openTaskPopupHeading = document.getElementById('open-task-heading');
    openTaskPopupHeading.innerHTML = task.title;
    let openTaskPopupDescription = document.getElementById('open-task-description');
    openTaskPopupDescription.innerHTML = task.description;
    let openTaskPopupDueDate = document.getElementById('open-task-due-date');
    openTaskPopupDueDate.innerHTML = task.dueDate;
    let openTaskPopupPriority = document.getElementById('open-task-priority');
    openTaskPopupPriority.innerHTML = task.priority;
}


function openTask(taskId) {
    fillopenTaskPopup(taskId);
    centerPopup('open-task-pop-up');
}


/**
 * This function creates a task from the board's task pop-up
 * @param {string} statusId task status ID
 */
function createTaskFromBoard(statusId) {
    console.log(statusId);
}


function moveTaskToStatus(taskId, status) {
    tasks[taskId].status = status;
    storeTasks();
}


/**
 * This function drops a task in an area
 * @param {Event} event 
 */
function dropTaskInArea(id, status) {
    moveTaskToStatus(draggedTaskId, status);
    renderTasks(tasks);
    stopHighlightingArea(id);
}


/**
 * This function highlights an area when a task hovers over it
 * @param {string} id drop area/task column (or row)
 */
function highlightArea(id) {
    let area = document.getElementById(id);
    area.classList.add('drop-area-highlight');
}


/**
 * This function removes the highlight from a drop area
 * @param {string} id drop area/task column (or row)
 */
function stopHighlightingArea(id) {
    let area = document.getElementById(id);
    area.classList.remove('drop-area-highlight');
}


function openMoveTaskPopup(taskId) {
    draggedTaskId = taskId;
    centerPopup('move-task-pop-up');
}

function moveTaskFromPopup(status) {
    removePopup('move-task-pop-up');
    moveTaskToStatus(draggedTaskId, status);
    renderTasks(tasks);
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
 * This function converts a status (e.g., "Await feedback") to an ID (e.g., "await-feedback")
 * @param {string} status 
 * @returns 
 */
function statusToStatusId(status) {
    let statusId = status.toLowerCase().replace(' ', '-');
    return statusId;
}


/**
 * This function renders one task
 * @param {Object} task 
 */
function renderTask(task) {
    let doneSubtasks = calculateSubtasks(task);
    let status = task.status;
    let statusId = statusToStatusId(status);
    document.getElementById(statusId).innerHTML += taskTemplate(task, doneSubtasks);
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
            let statusId = statusToStatusId(status);
            document.getElementById(statusId).innerHTML = `<div class="no-tasks-message">No tasks ${status.toLowerCase()}</div>`
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
    await Promise.all([loadTasks(), loadUsers()]);
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


document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        removePopup('add-task-pop-up');
    }
})