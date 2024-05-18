/**
 * This function returns an HTML template of a plus icon for adding subtasks.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 * @returns {string} HTML template of plus icon.
 */
function subtaskInputPlusIcon(idPrefix) {
    return /* html */ `<div class="input-icon-container" onclick="activateSubtaskInput('${idPrefix}-subtask-input')">
        <img class="edit-task-plus-icon" src="../assets/img/add-dark.svg" alt="plus icon">
    </div>`;
}


/**
 * This function returns an initial avatar HTML template for a user or contact.
 * @param {Object} user user or contact
 * @returns {string} initial avatar HTML template.
 */
function initialAvatarTemplate(userOrContact) {
    return /* html */ `<div class="initial-avatar ${userOrContact.color}">${getInitials(userOrContact)}</div>`;
}


/**
 * This function returns an initial avatar HTML template for a user or contact.
 * @param {Object} userOrContact user or contact 
 * @returns {string} initial avatar HTML template, large.
 */
function initialAvatarLargeTemplate(userOrContact) {
    return /* html */ `<div class="initial-avatar initial-avatar-large ${userOrContact.color}">${getInitials(userOrContact)}</div>`;
}


/**
 * This function returns an HTML template with inital avatars of all the collaborators of a task.
 * @param {Object} task 
 * @returns {string} HTML string of initial avatar divs.
 */
function generateInitialAvatarsTemplate(task) {
    let collaborators = getCollaborators(task);
    let HTMLString = '';
    if (collaborators) {
        for (let i = 0; i < collaborators.length && i < 3; i++) {
            let collaborator = collaborators[i];
            HTMLString += initialAvatarTemplate(collaborator);
        }
        if (collaborators.length > 3) {
            HTMLString += `+${collaborators.length - 3}`;
        }
    }
    return HTMLString;
}


/**
 * This function returns a template with the names of the collaborators on a task.
 * @param {Object} task 
 * @returns {string} HTML template of collaborators.
 */
function generateCollaboratorNames(task) {
    let collaborators = getCollaborators(task);
    let HTMLString = '';
    if (collaborators) {
        HTMLString = `<div class="collaborator-names-container">
        <div>Assigned to:</div>
        <div class="collaborator-names">`;
            if (collaborators) {
                for (let i = 0; i < collaborators.length; i++) {
                    let collaborator = collaborators[i];
                    HTMLString += collaboratorNameTemplate(collaborator);
                }
            }
        HTMLString += `</div>
        </div>`;
    }
    return HTMLString;
}


/**
 * This function renders the avatars of the collaborators with their initials.
 * @param {Array} collaborators 
 * @returns {string} HTML template of collaborator avatars.
 */
function generateCollaboratorAvatars(collaborators) {
    let HTMLString = '';
    if (collaborators) {
        for (let i = 0; i < collaborators.length; i++) {
            let collaborator = collaborators[i];
            HTMLString += initialAvatarLargeTemplate(collaborator);
        }
    }
    return HTMLString;
}


/**
 * This function returns a collaborator name template with first and last name.
 * @param {Object} contact 
 * @returns {string} HTML template of collaborator name.
 */
function collaboratorNameTemplate(contact) {
    let suffix = getUserNameSuffix(contact);
    return /* html */ `<div class="collaborator-name-outer-container">
        <div class="collaborator-name-container">
            ${initialAvatarLargeTemplate(contact)}
            <div class="collaborator-name">${contact.firstName} ${contact.lastName}${suffix}</div>
        </div>
    </div>`;
}


/**
 * This function returns a template of a subtask with a checkbox that is either checked or unchecked
 * depending on whether the subtask has been completed yet. The template is to be used in the pop-up
 * for opening tasks.
 * @param {Object} subtask 
 * @param {number} subtaskIndex 
 * @param {number} taskId 
 * @returns {string} HTML template of subtask for pop-up.
 */
function subTaskTemplate(subtask, subtaskIndex, taskId) {
    return /* html */ `
        <div class="subtask">
            <img class="cursor-pointer" src="${subtask.done ? 'assets/img/checkbox-icon-checked.svg' : 'assets/img/checkbox-icon-unchecked.svg'}" alt="subtask checkbox icon" onclick="checkOrUncheckSubtaskBox(${taskId}, ${subtaskIndex})">
            <div class="subtask-title">${subtask.title}</div>
        </div>
    `;
}


/**
 * This function returns a template of a subtask with buttons to edit or delete it.
 * @param {Object} subtask 
 * @param {number} subtaskIndex 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 * @returns {string} HTML template of subtask.
 */
function subTaskTemplateTemporary(subtask, subtaskIndex, idPrefix) {
    return /* html */ `
        <div id="${idPrefix}-subtask-container-${subtaskIndex}">
            <div class="subtask edit-task-subtask">
                <li id="${idPrefix}-subtask-title-${subtaskIndex}">${subtask.title}</li>
                <div class="edit-task-buttons-container">
                    <div id="open-task-edit-button" class="edit-task-button cursor-pointer" onclick="editSubtask(${subtaskIndex}, '${idPrefix}')">
                        <img src="assets/img/open-task-edit-button-icon.svg" alt="open task edit button icon">
                    </div>
                    <div class="open-task-button-separator"></div>
                    <div id="open-task-delete-button" class="edit-task-button cursor-pointer" onclick="deleteSubtask(${subtaskIndex}, '${idPrefix}')">
                        <img src="assets/img/open-task-delete-button-icon.svg" alt="open task delete button icon">
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * This function returns a subtask as an input so that it can be edited.
 * @param {number} subtaskIndex 
 * @param {string} subtaskTitle 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 * @returns {string} HTML template of subtask being edited.
 */
function subTaskTemplateTemporaryEditable(subtaskIndex, subtaskTitle, idPrefix) {
    return /* html */ `<div class="edit-task-subtask-input-container">
        <input id="${idPrefix}-subtask-title-input-editable-${subtaskIndex}" class="input-padding-size1 subtask-title-input-editable" type="text" value="${subtaskTitle}">
        <div id="${idPrefix}-input-icons-container" class="input-icons-container">
            ${confirmOrDeleteIcons(`deleteSubtaskInputForEditing(${subtaskIndex}, '${idPrefix}')`, `confirmSubtaskInputForEditing(${subtaskIndex}, '${idPrefix}')`)}
        </div>
    </div>`;
}


/**
 * This function generates subtasks with checkboxes.
 * @param {Object} task 
 * @param {Array} subtasks 
 * @returns {string} HTML template of subtasks with checkboxes.
 */
function generateSubtasks(task, subtasks, className) {
    let HTMLString = '';
    if (subtasks.length > 0) {
        HTMLString = `<div class="subtasks-container">
        <div>Subtasks</div>
        <div class="${className}">`;
            if (subtasks) {
                for (let i = 0; i < subtasks.length; i++) {
                    let subtask = subtasks[i];
                    HTMLString += subTaskTemplate(subtask, i, task.id);
                }
            }
        HTMLString += `</div>
        </div>`;
    }
    return HTMLString;
}


/**
 * This function returns an HTML template of subtasks with edit and delete buttons.
 * @param {Array} subtasks 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 * @returns {string} HTML template of subtasks with edit and delete buttons.
 */
function generateSubtasksTemporary(subtasks, idPrefix) {
    let HTMLString = '';
    if (subtasks.length > 0) {
            if (subtasks) {
                for (let i = 0; i < subtasks.length; i++) {
                    let subtask = subtasks[i];
                    HTMLString += subTaskTemplateTemporary(subtask, i, idPrefix);
                }
            }
    }
    return HTMLString;
}


/**
 * This function returns an HTML template of the form section for assigning contacts to a task.
 * @param {Object} task 
 * @returns {string} HTML template of assignment section.
 */
function editTaskAssignedToItemsTemplate(task, idPrefix) {
    return /* html */ `
        <label for="edit-task-drop-down-input" class="task-form-label" onclick="event.preventDefault()">Assigned to</label>
        <div class="task-drop-down" onclick="doNotClose(event)">
            <input id="edit-task-drop-down-input" type="text" class="input input-padding-size4 pop-up-input" onclick="onTaskDropDownInputClick('edit-task-assigned-to','edit-arrow-drop-down')" oninput="searchContacts(${task.id}, '${idPrefix}')" placeholder="Select contacts to assign">
            <img id="edit-arrow-drop-down" class="arrow-drop-down" src="../assets/img/arrow-drop-down.svg" alt="drop-down arrow">
        </div>
        <div id="edit-task-assigned-to" class="task-user-dropdown display-none" onclick="doNotClose(event)">
            ${renderSelectOptions(task, contacts, idPrefix)}
        </div>
        <div id="${idPrefix}-initial-avatars-large-container" class="initial-avatars-large-container">
            ${generateCollaboratorAvatars(getCollaborators(task))}
        </div>
    `;
}


/**
 * This function returns an HTML template of buttons to reject or confirm a change.
 * @param {*} deletionFunctionName 
 * @param {*} confirmationFunctionName 
 * @returns {string} HTML template of icons for confirmation or deletion.
 */
function confirmOrDeleteIcons(deletionFunctionName, confirmationFunctionName) {
    return /* html */ `<div class="input-icon-container" onclick="${deletionFunctionName}">
            <img src="../assets/img/open-task-delete-button-icon.svg" alt="delete icon">
        </div>
        <div class="input-icon-container" onclick="${confirmationFunctionName}">
            <img src="../assets/img/edit-task-confirm-button-icon.svg" alt="confirm icon">
        </div>`;
}