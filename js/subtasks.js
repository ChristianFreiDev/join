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
    openTaskPopupSubtasks.innerHTML = generateSubtasks(task, subtasks, 'board-subtasks');
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function deleteSubtaskInputForEditing(subtaskIndex, idPrefix) {
    let subtask = temporarySubtasks[subtaskIndex];
    let subtaskContainer = document.getElementById(`${idPrefix}-subtask-container-${subtaskIndex}`);
    subtaskContainer.innerHTML = subTaskTemplateTemporary(subtask, subtaskIndex, idPrefix);
}


/**
 * This function confirms that the value of the input used for editing an existing subtask can be stored when the check mark is clicked.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
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
 * This function opens a subtask for editing.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function editSubtask(subtaskIndex, idPrefix) {
    let subtaskContainer = document.getElementById(`${idPrefix}-subtask-container-${subtaskIndex}`);
    subtaskContainer.innerHTML = subTaskTemplateTemporaryEditable(subtaskIndex, temporarySubtasks[subtaskIndex].title, idPrefix);
}


/**
 * This function deletes a subtask.
 * @param {number} subtaskIndex 
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function deleteSubtask(subtaskIndex, idPrefix) {
    temporarySubtasks.splice(subtaskIndex, 1);
    updateSubtaskList(idPrefix);
}


/**
 * This function updates the list of subtasks to reflect the current subtasks.
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function updateSubtaskList(idPrefix) {
    let subtaskListId = `${idPrefix}-subtasks-list`;
    let subtasksList = document.getElementById(subtaskListId);
    subtasksList.innerHTML = generateSubtasksTemporary(temporarySubtasks, idPrefix);
}


/**
 * This function calculates the number of completed subtasks of a task.
 * @param {Object} task 
 * @returns {number} number of done subtasks.
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