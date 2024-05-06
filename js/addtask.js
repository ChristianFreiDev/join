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
        'clicked': function() {
            document.getElementById('prio-urgent').classList.add('urgent-button-clicked');
            document.getElementById('prio-arrow-up').src = '/assets/img/prio-up-white.svg';
        },
        'unclicked': function() {
            document.getElementById('prio-urgent').classList.remove('urgent-button-clicked');
            document.getElementById('prio-arrow-up').src = '/assets/img/prio-up.svg';
        }
    },
    'Medium': {
        'clicked': function() {
            document.getElementById('prio-medium').classList.add('medium-button-clicked');
            document.getElementById('prio-medium-equals').src = '/assets/img/prio-medium-white.svg';
        },
        'unclicked': function() {
            document.getElementById('prio-medium').classList.remove('medium-button-clicked');
            document.getElementById('prio-medium-equals').src = '/assets/img/prio-medium-orange.svg';
        }
    },
    'Low': {
        'clicked': function() {
            document.getElementById('prio-low').classList.add('low-button-clicked');
            document.getElementById('prio-arrow-down').src = '/assets/img/prio-down-white.svg';
        },
        'unclicked': function() {
            document.getElementById('prio-low').classList.remove('low-button-clicked');
            document.getElementById('prio-arrow-down').src = '/assets/img/prio-down.svg';
        }
    }
};


/**
 * This function is used to change the color of the priority buttons.
 * 
 * @param {string} newPriority - this is the name of the priority. ('Urgent', 'Medium' or 'Low')
 */
function clickButton(newPriority) {
    let priorities = ['Urgent', 'Medium', 'Low'];
    for (let i = 0; i < priorities.length; i++) {
        if (newPriority == priorities[i]) {
            buttonActions[priorities[i]].clicked();
        } else {
            buttonActions[priorities[i]].unclicked();
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