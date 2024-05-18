let draggedTaskId;

/**
 * This function enables dropping a task into the respective area by preventing the default action that occurs when something is dropped.
 * @param {Event} event 
 */
function allowTaskDrop(event) {
    event.preventDefault();
}


/**
 * This function stores the ID of the task that is currently being dragged in a global variable.
 * @param {number} id 
 */
function startDraggingTask(event, id) {
    draggedTaskId = id;
    event.target.classList.add('rotate-task');
}


/**
 * This function removes the task rotation if the drag event ends without the task being dropped anywhere.
 * @param {Event} event 
 */
function endDraggingTask(event) {
    event.target.classList.remove('rotate-task');
}


/**
 * This function finds the temporary collaborators in the contacts array and returns them as objects.
 * @returns {Array} collaborators as objects.
 */
function getTemporaryCollaborators() {
    let foundCollaborators = [];
    for (let i = 0; i < temporaryCollaborators.length; i++) {
        let collaboratorId = temporaryCollaborators[i];
        let contact = contacts.find(contact => contact.id === collaboratorId);
        if (contact !== -1) {
            foundCollaborators.push(contact);
        }
    }
    return foundCollaborators;
}


/**
 * This function deletes a task.
 * @param {number} taskId 
 */
function deleteTask(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
    storeTasks();
    removePopup('open-task-pop-up');
    renderTasks(tasks);
}


/**
 * This function opens a task for editing.
 * @param {number} taskId 
 */
function editTask(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let openTaskPopup = document.getElementById('open-task-pop-up');
    openTaskPopup.innerHTML = editTaskTemplate(task);
    openTaskPopup.setAttribute('onclick', 'closeEditAssignedToList() | doNotClose(event)');
    priority = task.priority;
    temporarySubtasks = [...task.subtasks];
    temporaryCollaborators = [...task.collaborators];
    clickPriorityButton(priority, 'edit-task');
    addInputEventListener('edit-task');
    checkEditDueDateRequirement();
}


/**
 * This function stores the current tasks in the backend once the task has been edited and the form is submitted.
 * @param {number} taskId 
 */
async function onSubmitEditTaskForm(taskId) {
    let editTaskOKButton = document.getElementById('edit-task-ok-button');
    editTaskOKButton.disabled = true;
    let task = tasks.find(task => task.id === taskId);
    task.title = document.getElementById('edit-task-title-input').value;
    task.description = document.getElementById('edit-task-description-textarea').value;
    task.collaborators = temporaryCollaborators;
    task.dueDate = document.getElementById('edit-task-due-date').value;
    task.priority = priority;
    task.subtasks = temporarySubtasks;
    await storeTasks();
    renderTasks(tasks);
    fillOpenTaskPopup(taskId);
}


/**
 * This function checks if a certain user is assigned to a certain task.
 * @param {Object} contact
 * @param {Object} task
 * @returns {boolean} has the user been assigned to the task or not.
 */
function isAssigned(contact, task) {
    let collaborators = getCollaborators(task);
    if (collaborators.indexOf(contact) === -1) {
        return false;
    } else {
        return true;
    }
}


/**
 * This function displays contacts as options.
 * @param {Object} task 
 * @param {Array} contactsToBeRendered
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 * @returns {string} HTML template string.
 */
function renderSelectOptions(task, contactsToBeRendered, idPrefix) {
    contactsToBeRendered.sort(sortByFirstName);
    let selectOptions = '';
    for (let i = 0; i < contactsToBeRendered.length; i++) {
        let contact = contactsToBeRendered[i];
        if (contact.id != 0) {
            let suffix = getUserNameSuffix(contact);
            selectOptions += `<div id="${idPrefix}-collaborator-option-${contact.id}" class="collaborator-option ${isAssigned(contact, task) ? 'collaborator-focus' : ''}" value="${contact.eMail} "onclick="checkOrUncheckCollaboratorBox(${contact.id}, '${idPrefix}') ">
                <div class="collaborator-option-name-and-initial-avatar">${initialAvatarLargeTemplate(contact)} ${contact.firstName} ${contact.lastName}${suffix}</div>
                <img id="${idPrefix}-collaborator-checkbox-${contact.id}" class="cursor-pointer" src="${isAssigned(contact, task) ? 'assets/img/checkbox-icon-checked-white.svg' : 'assets/img/checkbox-icon-unchecked.svg'}" alt="collaborator checkbox icon">
            </div>`;
        }
    }
    return selectOptions;
}


/**
 * This function toggles the display property of the drop-down list of contacts.
 * @param {string} taskAssignedToId 
 */
function onTaskDropDownInputClick(taskAssignedToId, assignedToArrow) {
    let taskAssignedTo = document.getElementById(taskAssignedToId);
    let rotateArrow = document.getElementById(assignedToArrow)

    if (taskAssignedTo.classList.contains('display-none')) {
        taskAssignedTo.classList.remove('display-none');
        rotateArrow.style.transform = "rotate(180deg)";
    } else {
        taskAssignedTo.classList.add('display-none');
        rotateArrow.style.transform = null;
    }
}


/**
 * This function creates a task from the board's task pop-up.
 * @param {string} statusId task status ID.
 */
async function createTaskFromBoard(status) {
    await addTask(status);
    renderTasks(tasks);
    removePopup('add-task-pop-up');
}


/**
 * This function moves a certain task to a different column (or row) in the board
 * by giving it a different status and saving the result.
 * @param {number} taskId 
 * @param {string} status 
 */
function moveTaskToStatus(taskId, status) {
    let foundTask = tasks.find(task => task.id === taskId);
    if (foundTask) {
        foundTask.status = status;
    }
    storeTasks();
}


/**
 * This function drops a task in an area.
 * @param {Event} event 
 */
function dropTaskInArea(id, status) {
    moveTaskToStatus(draggedTaskId, status);
    renderTasks(tasks);
    stopHighlightingArea(id);
}


/**
 * This function highlights an area when a task hovers over it.
 * @param {string} id drop area/task column (or row).
 */
function highlightArea(id) {
    let area = document.getElementById(id);
    area.classList.add('drop-area-highlight');
}


/**
 * This function removes the highlight from a drop area.
 * @param {string} id drop area/task column (or row).
 */
function stopHighlightingArea(id) {
    let area = document.getElementById(id);
    area.classList.remove('drop-area-highlight');
}


/**
 * This function returns all the collaborators of a task.
 * @param {Object} task 
 * @returns {Array} collaborators.
 */
function getCollaborators(task) {
    let collaborators = [];
    for (let i = 0; i < task.collaborators.length; i++) {
        let collaboratorId = task.collaborators[i];
        let contact = contacts.filter(contact => contact.id === collaboratorId)[0];
        collaborators.push(contact);
    }
    return collaborators;
}


/**
 * This function converts a status (e.g., "Await feedback") to an ID (e.g., "await-feedback").
 * @param {string} status 
 * @returns {string} statusId (id of an HTML element).
 */
function statusToStatusId(status) {
    let statusId = status.toLowerCase().replace(' ', '-');
    return statusId;
}


/**
 * This function renders one task.
 * @param {Object} task 
 */
function renderTask(task) {
    let doneSubtasks = calculateSubtasks(task);
    let status = task.status;
    let statusId = statusToStatusId(status);
    document.getElementById(statusId).innerHTML += taskTemplate(task, doneSubtasks);
}


/**
 * This function renders an array of tasks.
 * @param {Array} tasks 
 */
function renderTasks(tasks) {
    clearTasks();
    addNoTasksMessage();
    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            renderTask(task);
        }
    }
}


/**
 * This function displays a message in the appropriate column (or row) when there are no tasks with that status.
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
 * This function removes all tasks from the board.
 */
function clearTasks() {
    let statusIds = ['to-do', 'in-progress', 'await-feedback', 'done'];
    for (let i = 0; i < statusIds.length; i++) {
        let statusId = statusIds[i];
        document.getElementById(statusId).innerHTML = '';
    }
}


/**
 * This function initializes the board by calling init() and rendering all tasks.
 */
async function initBoard() {
    checkForLogin();
    await init();
    await Promise.all([loadTasks(), loadUsers(), loadContacts()]);
    renderTasks(tasks);
    initAddTask();
}


/**
 * This function cuts off the task description after a certain number of characters.
 * @param {string} taskDescription 
 * @returns {string} string with a certain length.
 */
function createTaskDescriptionPreview(taskDescription) {
    let result = '';
    for (let i = 0; i < taskDescription.length; i++) {
        let character = taskDescription[i];
        if ((character === ' ' && i > 35) || i > 55) {
            if (taskDescription.length > i) {
                return result + '...';
            } else {
                return result;
            }
        } else {
            result += character;
        }
    }
    return result;
}