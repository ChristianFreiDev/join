let priority = "Medium"
let temporaryCollaborators = [];
let temporarySubtasks = [];
let temporaryTask = {
    title: undefined,
    description: undefined,
    id: undefined,
    collaborators: temporaryCollaborators,
    dueDate: undefined,
    priority: 'Medium',
    category: undefined,
    status: undefined,
    subtasks: temporarySubtasks
}


/**
 * This function gets a status from local storage.
 * @returns {string} status of task to be added.
 */
function getStatus() {
    let status = loadVariableFromLocalStorage('status');
    if (status) {
        return status;
    } else {
        return false;
    }
}


/**
 * This function initializes the Add Task page by calling init(),
 * loading the required data, rendering a list of users to assign to a task, and adding an event listener.
 */
async function initAddTask() {
    checkForLogin();
    await init();
    await Promise.all([loadTasks(), loadUsers(), loadContacts()]);
    setMinDate();
    renderAssignedToList();
    addInputEventListener('add-task');
    mouseoverCheckRequirements();
    checkDueDateRequirement();
    checkCategoryRequirement();
}


/** 
 * This object is used to avoid repetitions at the priority buttons.
 */
const buttonActions = {
    'Urgent': {
        'clicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-urgent`).classList.add('priority-button-urgent-clicked');
            document.getElementById(`${idPrefix}-priority-icon-urgent`).src = '/assets/img/priority-icon-urgent-white.svg';
        },
        'unclicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-urgent`).classList.remove('priority-button-urgent-clicked');
            document.getElementById(`${idPrefix}-priority-icon-urgent`).src = '/assets/img/priority-icon-urgent.svg';
        }
    },
    'Medium': {
        'clicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-medium`).classList.add('priority-button-medium-clicked');
            document.getElementById(`${idPrefix}-priority-icon-medium`).src = '/assets/img/priority-icon-medium-white.svg';
        },
        'unclicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-medium`).classList.remove('priority-button-medium-clicked');
            document.getElementById(`${idPrefix}-priority-icon-medium`).src = '/assets/img/priority-icon-medium.svg';
        }
    },
    'Low': {
        'clicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-low`).classList.add('priority-button-low-clicked');
            document.getElementById(`${idPrefix}-priority-icon-low`).src = '/assets/img/priority-icon-low-white.svg';
        },
        'unclicked': function (idPrefix) {
            document.getElementById(`${idPrefix}-priority-button-low`).classList.remove('priority-button-low-clicked');
            document.getElementById(`${idPrefix}-priority-icon-low`).src = '/assets/img/priority-icon-low.svg';
        }
    }
};


/**
 * This function is used to change the color of the priority buttons.
 * 
 * @param {string} newPriority - this is the name of the priority. ('Urgent', 'Medium' or 'Low').
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
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
 * This functions sets up the temporary task so that it can be stored.
 * @param {string} status status of the task (for example, 'In progess').
 */
async function setUpTemporaryTask(status) {
    temporaryTask.title = document.getElementById('input-title').value;
    temporaryTask.description = document.getElementById('input-description').value;
    temporaryTask.dueDate = document.getElementById('input-due-date').value;
    temporaryTask.category = document.getElementById('input-category').value;
    temporaryTask.priority = priority;
    temporaryTask.status = status;
    temporaryTask.collaborators = temporaryCollaborators;
    temporaryTask.subtasks = temporarySubtasks;
    await loadTasks();
    temporaryTask.id = getHighestId(tasks) + 1;
}


/**
 * This function adds a task to the server. Before pushing a new task, the tasks are loaded from the backend to make sure they are up-to-date.
 * @param {string} status status of the task (for example, 'In progess').
 */
async function addTask(status) {
    document.getElementById('create-task-button').disabled = true;
    document.getElementById('create-task-button').classList.remove('create-task-enabled');
    await setUpTemporaryTask(status);
    tasks.push(temporaryTask);
    await storeTasks();
}


/**
 * This functions adds a task from the Add Task page.
 */
async function addTaskFromAddTaskPage() {
    let status = getStatus();
    if (status) {
        await addTask(status);
    } else {
        await addTask('To do');
    }
    animateSuccessMessage(true);
    setTimeout(function () {
        window.open('./board.html', '_self');
    }, 1800);
}


/**
 * This function renders a list of contacts that can be assigned to a task.
 */
function renderAssignedToList() {
    let assignedTo = document.getElementById('add-task-assigned-to');
    assignedTo.innerHTML = renderSelectOptions(temporaryTask, contacts, 'add-task');
}


/**
 * This function serves to add an event listener that adds buttons to confirm or reject a change
 * and an event listener that confirms the input when the Enter key is pressed.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function addInputEventListener(idPrefix) {
    let subtaskInput = document.getElementById(`${idPrefix}-subtask-input`);
    subtaskInput.addEventListener("focus", (event) => {
        let inputIconsContainer = document.getElementById(`${idPrefix}-input-icons-container`);
        let deletionFunctionName = `deleteSubtaskInput('${idPrefix}')`;
        let confirmationFunctionName = `confirmSubtaskInput('${idPrefix}')`;
        inputIconsContainer.innerHTML = confirmOrDeleteIcons(deletionFunctionName, confirmationFunctionName);
    });
    subtaskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            confirmSubtaskInput(idPrefix);
        }
    })
}


/**
 * This function adds an error message below an input field if it is invalid.
 * @param {Object} element HTML element.
 * @param {string} message error message.
 */
function setError(element, message) {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = message;
    errorDisplay.classList.add('error');
}


/**
 * This function removes the error message that was displayed if the input field was invalid.
 * @param {Object} element HTML element.
 */
function setSuccess(element) {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = '';
    errorDisplay.classList.remove('error');
}


/**
 * This function validates inputs (for example, title and due date).
 * @param {Array} inputIds array of ID strings of the input elements.
 */
function validateInputs(inputIds) {
    for (let i = 0; i < inputIds.length; i++) {
        let element = document.getElementById(inputIds[i])
        let value = element.value.trim();
        if (value === '') {
            setError(element, 'This field is required')
        } else {
            setSuccess(element);
            checkCreateTaskButton();
        }
    }
};


/**
 *  This function checks the requirements of the form and activates or deactivates the submit button.
 */
function checkCreateTaskButton() { 
        if (
            document.getElementById('input-title').value.length >= 1 &&
            document.getElementById('input-due-date').value &&
            document.getElementById('input-category').selectedIndex > 0
        ) {
            document.getElementById('create-task-button').disabled = false;
            document.getElementById('create-task-button').classList.add('create-task-enabled');
        } else {
            document.getElementById('create-task-button').disabled = true;
            document.getElementById('create-task-button').classList.remove('create-task-enabled');
        }
}


/**
 * This function checks and shows whether all mandatory fields have been filled out when the mouse is over the submit button.
 */
function mouseoverCheckRequirements() {
    document.getElementById('create-task-button').addEventListener("mouseover", function (event) {

        titleRequirement();
        dueDateRequirement();
        categoryRequirement();
        validateInputs(['input-title', 'input-due-date', 'input-category']);
    })
}


/**
 * This function highlights the title input's border in green or red.
 */
function titleRequirement() {
    let title = document.getElementById('input-title');

    if (title.value == "") {
        title.style.border = "1px solid var(--color-red)";
        checkCreateTaskButton();
    } else {
        title.style.border = "1px solid var(--color-low)";
    }
}


/**
 * This function highlights the date input's border in green or red.
 */
function dueDateRequirement() {
    let date = document.getElementById('input-due-date');
    if (!date.value) {
        date.style.border = "1px solid var(--color-red)";
    } else {
        date.style.border = "1px solid var(--color-low)";
    }
}


/**
 *  This function highlights the category input's border in green or red.
 */
function categoryRequirement() {
    let category = document.getElementById('input-category');

    if (!category.selectedIndex > 0) {
        category.style.border = "1px solid var(--color-red)";
    } else {
        category.style.border = "1px solid var(--color-low)";
    }
}


/**
 * This function is used to check the requirements after typing into the title input.
 */
function checkTitleRequirement() {
    titleRequirement();
    validateInputs(['input-title']);
}


/**
 * This function is used to check the requirements after choosing a date.
 */
function checkDueDateRequirement() {
        document.getElementById('input-due-date').addEventListener("change", function (event) {
        dueDateRequirement();
        validateInputs(['input-due-date']);
    })
}

/**
 * This function prevents the user from using a past date.
 */
function setMinDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("input-due-date").setAttribute("min", today);
  }


/**
 * This function is used to check the requirements after choosing a category.
 */
function checkCategoryRequirement(){
    document.getElementById('input-category').addEventListener("change", function (event){
    categoryRequirement();
    validateInputs(['input-category']);
    })   
}


/**
 * This function resets all values of the form.
 */
function resetForm() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('input-due-date').value = '';
    document.getElementById('input-category').value = '';
    document.getElementById('add-task-subtask-input').value = '';
    document.getElementById('add-task-subtasks-list').innerHTML = '';
}


/**
 * This function is used to clear the form.
 */
function clearForm(){
    resetError(['input-title', 'input-due-date', 'input-category']);
    temporaryCollaborators = [];
    temporarySubtasks = [];
    resetForm();
    renderInitalAvatarsLargeInPopup('add-task');
    document.getElementById('create-task-button').disabled = true;
    document.getElementById('create-task-button').classList.remove('create-task-enabled');
    clickPriorityButton('Medium', 'add-task');
    closeAssignedToList();
}


/**
 * This function resets the border to light gray after using the clear button.
 */
function setBorderGrey(){
    let title = document.getElementById('input-title');
    let date = document.getElementById('input-due-date');
    let category = document.getElementById('input-category');
    let description = document.getElementById('input-description');
    let subTask = document.getElementById('add-task-subtask-input');
    let assignedTo = document.getElementById('add-task-drop-down-input');

    title.style.border = "1px solid var(--color-input-light-gray)";
    date.style.border = "1px solid var(--color-input-light-gray)";
    category.style.border = "1px solid var(--color-input-light-gray)";
    description.style.border = "1px solid var(--color-input-light-gray)";
    subTask.style.border = "1px solid var(--color-input-light-gray)";
    assignedTo.style.border = "1px solid var(--color-input-light-gray)";
    assignedTo.value = '';
}


/**
 * This function removes the class "error" from every required input when the clear button is clicked.
 * @param {Array} inputIds array of ID strings of the input elements.
 */
function resetError(inputIds){
    for (let i = 0; i < inputIds.length; i++) {
        const element = document.getElementById(inputIds[i]);
         let inputControl = element.parentElement;
         let errorDisplay = inputControl.querySelector('.error-message');
         errorDisplay.innerText = '';
         errorDisplay.classList.remove('error');
        }
        setBorderGrey();
}