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
 * This function centers a pop-up with a certain id.
 * @param {string} id pop-up id
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
 * This function opens the add-task popup.
 * @param {string} statusId task status ID
 */
function openAddTaskPopup(status) {
    clearForm();
    centerPopup('add-task-pop-up');
    // This should actually change the onsubmit attribute of the form once the form supports it
    let createTaskButton = document.getElementById('create-task-button');
    createTaskButton.setAttribute('onclick', `createTaskFromBoard('${status}'); validateInputs(['input-title', 'input-due-date', 'input-category'])`);
    addInputEventListener('add-task');
    renderAssignedToList();
}


/**
 * This function fills the pop-up for opening a task using a template.
 * @param {number} taskId 
 */
function fillOpenTaskPopup(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let openTaskPopup = document.getElementById('open-task-pop-up');
    openTaskPopup.setAttribute('onclick', 'doNotClose(event)');
    openTaskPopup.innerHTML = openTaskPopupTemplate(task);
}


/**
 * This function opens a task in a pop-up.
 * @param {number} taskId 
 */
function openTask(taskId) {
    fillOpenTaskPopup(taskId);
    centerPopup('open-task-pop-up');
}


/**
 * This function checks the checkbox of a subtask in the pop-up for opening tasks.
 * @param {number} taskId 
 * @param {number} subtaskIndex 
 */
function checkOrUncheckSubtaskBox(taskId, subtaskIndex) {
    let task = tasks.find(task => task.id === taskId);
    let subtasks = task.subtasks;
    let subtask = subtasks[subtaskIndex];
    if (subtask.done) {
        subtask.done = false;
    } else {
        subtask.done = true;
    }
    let openTaskPopupSubtasks = document.getElementById('open-task-subtasks');
    openTaskPopupSubtasks.innerHTML = generateSubtasks(task, subtasks);
    storeTasks();
    renderTasks(tasks);
}


/**
 * This function focuses an input.
 * @param {string} inputId 
 */
function activateSubtaskInput(inputId) {
    let subtaskInput = document.getElementById(inputId);
    subtaskInput.focus();
}


/**
 * This function clears the subtask input.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function deleteSubtaskInput(idPrefix) {
    let subtaskInput = document.getElementById(`${idPrefix}-subtask-input`);
    subtaskInput.value = '';
    let inputIconsContainer = document.getElementById(`${idPrefix}-input-icons-container`);
    inputIconsContainer.innerHTML = subtaskInputPlusIcon();
}


/**
 * This function clears the input used for editing an existing subtask.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function deleteSubtaskInputForEditing(subtaskIndex, idPrefix) {
    let subtask = temporarySubtasks[subtaskIndex];
    let subtaskContainer = document.getElementById(`${idPrefix}-subtask-container-${subtaskIndex}`);
    subtaskContainer.innerHTML = subTaskTemplateTemporary(subtask, subtaskIndex, idPrefix);
}


/**
 * This function confirms that the value of the input used for editing an existing subtask can be stored when the check mark is clicked.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function confirmSubtaskInputForEditing(subtaskIndex, idPrefix) {
    let subtaskTitleInputEditable = document.getElementById(`${idPrefix}-subtask-title-input-editable-${subtaskIndex}`);
    let subtask = temporarySubtasks[subtaskIndex];
    if (subtaskTitleInputEditable.value !== '') {
        subtask.title = subtaskTitleInputEditable.value;
    }
    let subtaskContainer = document.getElementById(`${idPrefix}-subtask-container-${subtaskIndex}`);
    subtaskContainer.innerHTML = subTaskTemplateTemporary(subtask, subtaskIndex, idPrefix);
}


/**
 * This function confirms that the value of the input used for adding a new subtask can be stored when the check mark is clicked.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function confirmSubtaskInput(idPrefix) {
    let subtaskInput = document.getElementById(`${idPrefix}-subtask-input`);
    if (subtaskInput.value !== '') {
        temporarySubtasks.push({
            title: subtaskInput.value,
            done: false
        })
    }
    subtaskInput.value = '';
    let inputIconsContainer = document.getElementById(`${idPrefix}-input-icons-container`);
    inputIconsContainer.innerHTML = subtaskInputPlusIcon();
    updateSubtaskList(idPrefix);
}


/**
 * This function finds the temporary collaborators in the users array and returns them as objects.
 * @returns {Array} collaborators as objects
 */
function getTemporaryCollaborators() {
    let foundCollaborators = [];
    for (let i = 0; i < temporaryCollaborators.length; i++) {
        let collaboratorId = temporaryCollaborators[i];
        let user = users.find(user => user.id === collaboratorId);
        if (user !== -1) {
            foundCollaborators.push(user);
        }
    }
    return foundCollaborators;
}


/**
 * This function checks the collaborator checkbox in the list of assigned users.
 * @param {number} userId
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function checkOrUncheckCollaboratorBox(userId, idPrefix) {
    let collaboratorIndex = temporaryCollaborators.findIndex(collaboratorId => collaboratorId === userId);
    let checkBox = document.getElementById(`${idPrefix}-collaborator-checkbox-${userId}`);
    let collaboratorOption = document.getElementById(`${idPrefix}-collaborator-option-${userId}`);
    if (collaboratorIndex > -1) {
        temporaryCollaborators.splice(collaboratorIndex, 1);
        checkBox.src = 'assets/img/checkbox-icon-unchecked.svg';
    } else {
        checkBox.src = 'assets/img/checkbox-icon-checked-white.svg';
        temporaryCollaborators.push(userId);
    }
    collaboratorOption.classList.toggle('collaborator-focus');
    renderInitalAvatarsLargeInPopup(idPrefix);
}


/**
 * This function renders the large initial avatars below the drop-down list in a pop-up.
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function renderInitalAvatarsLargeInPopup(idPrefix) {
    let initialAvatarsLargeContainer = document.getElementById(`${idPrefix}-initial-avatars-large-container`);
    initialAvatarsLargeContainer.innerHTML = generateCollaboratorAvatars(getTemporaryCollaborators());
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
    editSetMinDate();
}


/**
 * This function opens a subtask for editing.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function editSubtask(subtaskIndex, idPrefix) {
    let subtaskContainer = document.getElementById(`${idPrefix}-subtask-container-${subtaskIndex}`);
    subtaskContainer.innerHTML = subTaskTemplateTemporaryEditable(subtaskIndex, temporarySubtasks[subtaskIndex].title, idPrefix);
}


/**
 * This function deletes a subtask.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function deleteSubtask(subtaskIndex, idPrefix) {
    temporarySubtasks.splice(subtaskIndex, 1);
    updateSubtaskList(idPrefix);
}


/**
 * This function updates the list of subtasks to reflect the current subtasks.
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function updateSubtaskList(idPrefix) {
    let subtaskListId = `${idPrefix}-subtasks-list`;
    let subtasksList = document.getElementById(subtaskListId);
    subtasksList.innerHTML = generateSubtasksTemporary(temporarySubtasks, idPrefix);
}


/**
 * This function stores the current tasks in the backend once the task has been edited and the form is submitted.
 * @param {number} taskId 
 */
function onSubmitEditTaskForm(taskId) {
    let task = tasks.find(task => task.id === taskId);
    task.title = document.getElementById('edit-task-title-input').value;
    task.description = document.getElementById('edit-task-description-textarea').value;
    task.collaborators = temporaryCollaborators;
    task.dueDate = document.getElementById('edit-task-due-date').value;
    task.priority = priority;
    task.subtasks = temporarySubtasks;
    storeTasks();
    renderTasks(tasks);
    fillOpenTaskPopup(taskId);
}


/**
 * This function checks if a certain user is assigned to a certain task.
 * @param {Object} user
 * @param {Object} task
 * @returns {boolean} has the user been assigned to the task or not
 */
function isAssigned(user, task) {
    let collaborators = getCollaborators(task);
    if (collaborators.indexOf(user) === -1) {
        return false;
    } else {
        return true;
    }
}


/**
 * This function displays users as options.
 * @param {Object} task 
 * @param {Array} usersToBeRendered
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 * @returns {string} HTML template string
 */
function renderSelectOptions(task, usersToBeRendered, idPrefix) {
    usersToBeRendered.sort(sortByFirstName);
    let selectOptions = '';
    for (let i = 0; i < usersToBeRendered.length; i++) {
        let user = usersToBeRendered[i];
        selectOptions += `<div id="${idPrefix}-collaborator-option-${user.id}" class="collaborator-option ${isAssigned(user, task) ? 'collaborator-focus' : ''}" value="${user.eMail} "onclick="checkOrUncheckCollaboratorBox(${user.id}, '${idPrefix}') ">
            <div class="collaborator-option-name-and-initial-avatar">${initialAvatarLargeTemplate(user)} ${user.firstName} ${user.lastName}</div>
            <img id="${idPrefix}-collaborator-checkbox-${user.id}" class="cursor-pointer" src="${isAssigned(user, task) ? 'assets/img/checkbox-icon-checked-white.svg' : 'assets/img/checkbox-icon-unchecked.svg'}" alt="collaborator checkbox icon">
        </div>`;
    }
    return selectOptions;
}


/**
 * This function toggles the display property of the drop-down list of users.
 * @param {string} taskAssignedToId 
 */
function onTaskDropDownInputClick(taskAssignedToId) {
    let taskAssignedTo = document.getElementById(taskAssignedToId);
    if (taskAssignedTo.classList.contains('display-none')) {
        taskAssignedTo.classList.remove('display-none');
    } else {
        taskAssignedTo.classList.add('display-none');
    }
}


/**
 * This function creates a task from the board's task pop-up.
 * @param {string} statusId task status ID
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
    tasks[taskId].status = status;
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
 * @param {string} id drop area/task column (or row)
 */
function highlightArea(id) {
    let area = document.getElementById(id);
    area.classList.add('drop-area-highlight');
}


/**
 * This function removes the highlight from a drop area.
 * @param {string} id drop area/task column (or row)
 */
function stopHighlightingArea(id) {
    let area = document.getElementById(id);
    area.classList.remove('drop-area-highlight');
}


/**
 * This function opens a pop-up for selecting where the task should be moved.
 * @param {Event} event 
 * @param {number} taskId 
 */
function openMoveTaskPopup(event, taskId) {
    event.stopPropagation();
    draggedTaskId = taskId;
    centerPopup('move-task-pop-up');
}


/**
 * This function moves a task to a different status (column [or row]) from the pop-up.
 * @param {string} status 
 */
function moveTaskFromPopup(status) {
    removePopup('move-task-pop-up');
    moveTaskToStatus(draggedTaskId, status);
    renderTasks(tasks);
}


/**
 * This function calculates the number of completed subtasks of a task.
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
 * This function returns all the collaborators of a task.
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
 * This function converts a status (e.g., "Await feedback") to an ID (e.g., "await-feedback").
 * @param {string} status 
 * @returns {string} statusId (id of an HTML element)
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
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        renderTask(task);
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
    await init();
    await Promise.all([loadTasks(), loadUsers()]);
    // useOfflineData();
    renderTasks(tasks);
    initAddTask();
}


/**
 * This function searches for the tasks that match the search input value and calls the function that renders them.
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


/**
 * This function searches for users matching the search criteria.
 * @param {number} taskId 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task' 
 */
function searchUsers(taskId, idPrefix) {
    let task;
    if (taskId === undefined) {
        task = temporaryTask;
    } else {
        task = tasks.find(task => task.id === taskId);
    }
    let searchInput = document.getElementById(`${idPrefix}-drop-down-input`);
    let searchString = searchInput.value.toLowerCase();
    foundUsers = users.filter(user => {
        let fullUserName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        return fullUserName.includes(searchString);
    });
    let taskAssignedTo = document.getElementById(`${idPrefix}-assigned-to`);
    if (foundUsers.length > 0) {
        taskAssignedTo.innerHTML = renderSelectOptions(task, foundUsers, idPrefix);
    } else {
        taskAssignedTo.innerHTML = '<div class="no-users-message">No users found</div>';
    }
    taskAssignedTo.classList.remove('display-none');
}


/**
 * This function cuts off the task description after a certain number of characters.
 * @param {string} taskDescription 
 * @returns {string}
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