let priority = "Medium"
let temporaryCollaborators = [];
let temporarySubtasks = [];
let temporaryTask = {
    title: undefined,
    description: undefined,
    id: undefined,
    collaborators: temporaryCollaborators, // user id
    dueDate: undefined,
    priority: 'Medium',
    category: undefined,
    status: undefined,
    subtasks: temporarySubtasks
}


/**
 * This function initializes the Add Task page by calling init(),
 * loading the required data, rendering a list of users to assign to a task, and adding an event listener.
 */
async function initAddTask() {
    await init();
    await Promise.all([loadTasks(), loadUsers()]);
    renderAssignedToList();
    addInputEventListener('add-task');
}

//----------------------- Prio Buttons---------------------------------//

/** 
 * This object is used to avoid repetitions at the prio buttons.
 */

const buttonActions = {
    'Urgent': {
        'clicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-urgent`).classList.add('priority-button-urgent-clicked');
            document.getElementById(`${idPrefix}-priority-icon-urgent`).src = '/assets/img/priority-icon-urgent-white.svg';
        },
        'unclicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-urgent`).classList.remove('priority-button-urgent-clicked');
            document.getElementById(`${idPrefix}-priority-icon-urgent`).src = '/assets/img/priority-icon-urgent.svg';
        }
    },
    'Medium': {
        'clicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-medium`).classList.add('priority-button-medium-clicked');
            document.getElementById(`${idPrefix}-priority-icon-medium`).src = '/assets/img/priority-icon-medium-white.svg';
        },
        'unclicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-medium`).classList.remove('priority-button-medium-clicked');
            document.getElementById(`${idPrefix}-priority-icon-medium`).src = '/assets/img/priority-icon-medium.svg';
        }
    },
    'Low': {
        'clicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-low`).classList.add('priority-button-low-clicked');
            document.getElementById(`${idPrefix}-priority-icon-low`).src = '/assets/img/priority-icon-low-white.svg';
        },
        'unclicked': function(idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-low`).classList.remove('priority-button-low-clicked');
            document.getElementById(`${idPrefix}-priority-icon-low`).src = '/assets/img/priority-icon-low.svg';
        }
    }
};


/**
 * This function is used to change the color of the priority buttons.
 * 
 * @param {string} newPriority - this is the name of the priority. ('Urgent', 'Medium' or 'Low')
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function clickPriorityButton(newPriority, idPrefix) {
    let priorities = ['Urgent', 'Medium', 'Low'];
    for (let i = 0; i < priorities.length; i++) {
        if (newPriority == priorities[i]) {
            buttonActions[priorities[i]].clicked(idPrefix);
        } else {
            buttonActions[priorities[i]].unclicked(idPrefix);
        }
    }
    priority = newPriority;
}


/**
 * This function adds a task to the server. Before pushing a new task, the tasks are loaded from the backend to make sure they are up-to-date.
 */
async function addTask(status){
    let title = document.getElementById('input-title');
    let description = document.getElementById('input-description');
    let date = document.getElementById('input-due-date');
    let category = document.getElementById('input-category');
    temporaryTask.title = title.value;
    temporaryTask.description = description.value;
    temporaryTask.dueDate = date.value;
    temporaryTask.category = category.value;
    temporaryTask.priority = priority;
    temporaryTask.status = status;
    temporaryTask.id = tasks.length;
    temporaryTask.collaborators = temporaryCollaborators;
    temporaryTask.subtasks = temporarySubtasks;
    await loadTasks();
    temporaryTask.id = getHighestTaskId() + 1;
    tasks.push(temporaryTask);
    await storeTasks();
}


/**
 * This function determines the highest id of the task ids of the existing tasks.
 * @returns {number} highest id of a task in the tasks array
 */
function getHighestTaskId() {
    let taskIds = tasks.map(task => task.id);
    let highestId = Math.max(...taskIds);
    return highestId;
}


/**
 * This functions adds a task from the Add Task page.
 */
async function addTaskFromAddTaskPage() {
    await addTask('To do');
    window.open('./board.html', '_self');
}


/**
 * This function resets all values of the form.
 */
function resetForm() {
    temporaryCollaborators = [];
    temporarySubtasks = [];
    renderInitalAvatarsLargeInPopup('add-task');
    let title = document.getElementById('input-title');
    let description = document.getElementById('input-description');
    let date = document.getElementById('input-due-date');
    let category = document.getElementById('input-category');
    let addTaskSubtaskInput = document.getElementById('add-task-subtask-input');
    let addTaskSubtasksList = document.getElementById('add-task-subtasks-list');
    title.value = '';
    description.value = '';
    date.value = '';
    category.value ='';
    addTaskSubtaskInput.value = '';
    addTaskSubtasksList.innerHTML = '';
}


/**
 * This function renders a list of users that can be assigned to a task.
 */
function renderAssignedToList() {
    let assignedTo = document.getElementById('add-task-assigned-to');
    assignedTo.innerHTML = renderSelectOptions(temporaryTask, users, 'add-task');
}


/**
 * This function serves to add an event listener that adds buttons to confirm or reject a change.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function addInputEventListener(idPrefix) {
    let subtaskInput = document.getElementById(`${idPrefix}-subtask-input`);
    subtaskInput.addEventListener("focus", (event) => {
        let inputIconsContainer = document.getElementById(`${idPrefix}-input-icons-container`);
        let deletionFunctionName = `deleteSubtaskInput('${idPrefix}')`;
        let confirmationFunctionName = `confirmSubtaskInput('${idPrefix}')`;
        inputIconsContainer.innerHTML = confirmOrDeleteIcons(deletionFunctionName, confirmationFunctionName);
    });
}


/**
 * This function adds an error message below an input field if it is invalid.
 * @param {Object} element 
 * @param {string} message 
 */
function setError(element, message) {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    errorDisplay.classList.add('error');
}


/**
 * This function removes the error message that was displayed if the input field was invalid.
 * @param {Object} element 
 */
function setSuccess(element) {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    errorDisplay.classList.remove('error');
}


/**
 * This function validates the title and due date inputs.
 */
function validateInputs() {
    const inputTitle = document.getElementById('input-title');
    const inputDueDate = document.getElementById('input-due-date');

    let ids = [inputTitle, inputDueDate];
    for (let i = 0; i < ids.length; i++) {
        let value = ids[i].value.trim();
        if(value === ''){
            setError(ids[i], 'This field is required')
        } else {
            setSuccess(ids[i]);
        }
    }
};