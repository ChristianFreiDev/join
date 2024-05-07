// Board and Add Task templates

/**
 * This function returns an HTML template showing the progress of a task or an empty string if there are no subtasks.
 * @param {Object} task 
 * @param {number} doneSubtasks number of completed subtasks
 * @returns 
 */
function generateTaskProgressContainerTemplate(task, doneSubtasks) {
    if (task.subtasks.length > 0) {
        return /* html */ `<div class="task-progress-container">
            <progress class="task-progress" max="100" value="${doneSubtasks/task.subtasks.length * 100}"></progress>
            <span>${doneSubtasks}/${task.subtasks.length} subtasks</span>
            <span class="subtask-tooltip">${doneSubtasks} of ${task.subtasks.length} subtasks completed</span>
        </div>`;
    } else {
        return '';
    }
}


/**
 * This function returns an HTML template of a task.
 * @param {Object} task
 * @param {number} doneSubtasks number of completed subtasks
 * @returns {string} task HTML template
 */
function taskTemplate(task, doneSubtasks) {
    return /* html */ `<div class="task" draggable="true" ondragstart="startDraggingTask(event, ${task.id})" ondragend="endDraggingTask(event)" onclick="openTask(${task.id})">
            <div class="task-category-and-mobile-drag-arrows-container">
                <div class="task-category task-category-small ${task.category === 'Technical Task' ? 'technical-task' : 'user-story'}">${task.category}</div>
                <div class="move-arrows" onclick="openMoveTaskPopup(event, ${task.id})">⇵</div>
            </div>
            <div class="task-title-and-description-container">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${createTaskDescriptionPreview(task.description)}</div>
            </div>
            ${generateTaskProgressContainerTemplate(task, doneSubtasks)}
            <div class="initial-avatars-and-priority-container">
                <div id="initial-avatars">${generateInitialAvatarsTemplate(task)}</div>
                <img src="${'../assets/img/' + task.priority.toLowerCase() + '-board-priority-icon.svg'}" class="priority-icon">
            </div>
        </div>`;
}


/**
 * This function returns an HTML template of a task opened in a pop-up.
 * @param {Object} task 
 * @returns {string} task pop-up HTML template
 */
function openTaskPopupTemplate(task) {
    return /* html */ `<div class="open-task-pop-up-header">
        <div id="open-task-pop-up-category">${openTaskPopupCategoryTemplate(task)}</div>
        <img class="close-pop-up-icon" src="assets/img/close-pop-up-icon.svg" alt="close pop-up icon" onclick="removePopup('open-task-pop-up')">
    </div>
    <div class="open-task-pop-up-content">
        <h2 id="open-task-heading">${task.title}</h2>
        <div id="open-task-description">${task.description}</div>
        <div class="open-task-due-date-outer-container">
                <div>Due date:</div>
                <div id="open-task-due-date">${task.dueDate}</div>
        </div>
        <div class="open-task-priority-outer-container">
                <div>Priority:</div>
                <div id="open-task-priority">${openTaskPopupPriorityTemplate(task)}</div>
        </div>
        <div class="open-task-collaborators-outer-container">
            <div id="open-task-collaborators">${generateCollaboratorNames(task)}</div>
        </div>
        <div class="open-task-subtasks-outer-container">
            <div id="open-task-subtasks">${generateSubtasks(task, task.subtasks)}</div>
        </div>
        <div class="open-task-buttons-container">
            <div id="open-task-delete-button" class="open-task-button cursor-pointer" onclick="deleteTask(${task.id})">
                <img src="assets/img/open-task-delete-button-icon.svg" alt="open task delete button icon">
                <span>Delete</span>
            </div>
            <div class="open-task-button-separator"></div>
            <div id="open-task-edit-button" class="open-task-button cursor-pointer" onclick="editTask(${task.id})">
                <img src="assets/img/open-task-edit-button-icon.svg" alt="open task edit button icon">
                <span>Edit</span>
            </div>
        </div>
    </div>`;
}


/**
 * This function returns an HTML template of a task being edited in a pop-up.
 * @param {Object} task 
 * @returns {string} HTML template of task for editing
 */
function editTaskTemplate(task) {
    return /* html */ `
        <div class="edit-task-pop-up-header">
            <img class="close-pop-up-icon" src="assets/img/close-pop-up-icon.svg" alt="close pop-up icon" onclick="removePopup('open-task-pop-up')">
        </div>
        <form class="edit-task-form" onsubmit="onSubmitEditTaskForm(${task.id}); return false">
            <div class="open-task-pop-up-content">
                <div class="form-label-and-input-container">
                    <label for="edit-task-title-input" class="task-form-label">Title</label>
                    <input id="edit-task-title-input" class="input input-padding-size4 pop-up-input" type="text" placeholder="Enter a title" value="${task.title}" required autocomplete="off">
                    <div class="error-message"></div>
                </div>
                <div class="form-label-and-input-container">
                    <label for="edit-task-description-textarea" class="task-form-label">Description</label>
                    <textarea id="edit-task-description-textarea" class="input pop-up-input" type="text" placeholder="Enter a description">${task.description}</textarea>
                </div>
                <div class="form-label-and-input-container">
                    <label for="edit-task-due-date" class="task-form-label">Due date</label>
                    <input id="edit-task-due-date" class="input input-padding-size3 pop-up-input" type="date" placeholder="Enter a due date" value="${task.dueDate}" required>
                    <div class="error-message"></div>
                </div>
                <div class="form-label-and-input-container">
                    <label for="edit-task-due-date" class="task-form-label task-form-label-priority">Priority</label>
                    <div class="edit-task-priority-buttons-container">
                        <button id="edit-task-priority-button-urgent" class="priority-button" type="button" onclick="clickPriorityButton('Urgent', 'edit-task')">
                            <span>Urgent</span>
                            <img id="edit-task-priority-icon-urgent" src="../assets/img/priority-icon-urgent.svg" alt="priority icon urgent">
                        </button>
                        <button id="edit-task-priority-button-medium" class="priority-button" type="button" onclick="clickPriorityButton('Medium', 'edit-task')">
                            <span>Medium</span>
                            <img id="edit-task-priority-icon-medium" src="../assets/img/priority-icon-medium.svg" alt="priority icon medium">
                        </button>
                        <button id="edit-task-priority-button-low" class="priority-button" type="button" onclick="clickPriorityButton('Low', 'edit-task')">
                            <span>Low</span>
                            <img id="edit-task-priority-icon-low" src="../assets/img/priority-icon-low.svg" alt="priority icon low">
                        </button>
                    </div>
                </div>
                <div class="form-label-and-input-container">
                    ${editTaskAssignedToItemsTemplate(task, 'edit-task')}
                </div>
                <div class="form-label-and-input-container">
                    <div id="open-task-subtasks">
                        <div class="subtasks-container">
                            <div>Subtasks</div>
                            <div class="edit-task-subtask-input-container">
                                <input id="edit-task-subtask-input" type="text" class="input input-padding-size3 pop-up-input" placeholder="Add new subtask" autocomplete="off">
                                <div id="edit-task-input-icons-container" class="input-icons-container">
                                    ${subtaskInputPlusIcon('edit-task')}
                                </div>
                            </div>
                            <ul id="edit-task-subtasks-list" class="subtasks">
                                ${generateSubtasksTemporary(task.subtasks, 'edit-task')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button class="button edit-task-ok-button" onclick="validateInputs(['edit-task-title-input', 'edit-task-due-date'])">OK</button>
        </form>`;
}


/**
 * This function returns an HTML template of a plus icon for adding subtasks.
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 * @returns {string} HTML template of plus icon
 */
function subtaskInputPlusIcon(idPrefix) {
    return /* html */ `<div class="input-icon-container" onclick="activateSubtaskInput('${idPrefix}-subtask-input')">
        <img class="edit-task-plus-icon" src="../assets/img/add-dark.svg" alt="plus icon">
    </div>`;
}


/**
 * This function returns a task category with an appropriate class (different color depending on the category)
 * for the pop-up for opening tasks.
 * @param {Object} task 
 * @returns {string} HTML template of task category for pop-up
 */
function openTaskPopupCategoryTemplate(task) {
    return /* html */ `<div class="task-category task-category-large ${task.category === 'Technical Task' ? 'technical-task' : 'user-story'}">${task.category}</div>`;
}

/**
 * This function returns an HTMl template of a task priority including the corresponding icon
 * for the pop-up for opening tasks.
 * @param {Object} task 
 * @returns {string} HTML template of task priority for pop-up
 */
function openTaskPopupPriorityTemplate(task) {
    return /* html */ `<div>${task.priority}</div>
        <img src="${'../assets/img/' + task.priority.toLowerCase() + '-board-priority-icon.svg'}" class="priority-icon">`;
}


/**
 * This function returns an initial avatar HTML template for a user.
 * @param {Object} user 
 * @returns {string} inital avatar HTML template
 */
function initialAvatarTemplate(user) {
    return /* html */ `<div class="initial-avatar ${user.color}">${getInitials(user)}</div>`;
}


/**
 * This function returns an initial avatar HTML template for a user.
 * @param {Object} user 
 * @returns {string} inital avatar HTML template
 */
function initialAvatarLargeTemplate(user) {
    return /* html */ `<div class="initial-avatar initial-avatar-large ${user.color}">${getInitials(user)}</div>`;
}



/**
 * This function returns an HTML template with inital avatars of all the collaborators of a task.
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
 * This function returns a template with the names of the collaborators on a task.
 * @param {Object} task 
 * @returns {string} HTML template of collaborators
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
 * @returns {string} HTML template of collaborator avatars
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
 * @param {Object} user 
 * @returns {string} HTML template of collaborator name
 */
function collaboratorNameTemplate(user) {
    return /* html */ `<div class="collaborator-name-outer-container">
        <div class="collaborator-name-container">
            ${initialAvatarLargeTemplate(user)}
            <div class="collaborator-name">${user.firstName} ${user.lastName}</div>
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
 * @returns {string} HTML template of subtask for pop-up
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 * @returns {string} HTML template of subtask
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 * @returns {string} HTML template of subtask being edited
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
function generateSubtasks(task, subtasks) {
    let HTMLString = '';
    if (subtasks.length > 0) {
        HTMLString = `<div class="subtasks-container">
        <div>Subtasks</div>
        <div class="subtasks">`;
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
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 * @returns {string} HTML template of subtasks with edit and delete buttons
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
 * This function returns an HTML template of the form section for assigning users to a task.
 * @param {Object} task 
 * @returns {string} HTML template of assignment section
 */
function editTaskAssignedToItemsTemplate(task, idPrefix) {
    return /* html */ `
        <label for="edit-task-drop-down-input" class="task-form-label" onclick="event.preventDefault()">Assigned to</label>
        <div class="task-drop-down" onclick="doNotClose(event)">
            <input id="edit-task-drop-down-input" type="text" class="input input-padding-size4 pop-up-input" onclick="onTaskDropDownInputClick('edit-task-assigned-to')" oninput="searchUsers(${task.id}, '${idPrefix}')" placeholder="Select contacts to assign">
            <img class="arrow-drop-down" src="../assets/img/arrow-drop-down.svg" alt="drop-down arrow">
        </div>
        <div id="edit-task-assigned-to" class="task-user-dropdown display-none" onclick="doNotClose(event)">
            ${renderSelectOptions(task, users, idPrefix)}
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
 * @returns {string} HTML template of icons for confirmation or deletion
 */
function confirmOrDeleteIcons(deletionFunctionName, confirmationFunctionName) {
    return /* html */ `<div class="input-icon-container" onclick="${deletionFunctionName}">
            <img src="../assets/img/open-task-delete-button-icon.svg" alt="delete icon">
        </div>
        <div class="input-icon-container" onclick="${confirmationFunctionName}">
            <img src="../assets/img/edit-task-confirm-button-icon.svg" alt="confirm icon">
        </div>`;
}


// Contacts templates

/**
 * This function generates an HTML template for the letter that is used as a heading for contacts with first names beginning with the same letter.
 * @param {string} letter 
 * @returns {string} contact letter HTML template
 */
function contactLetterTemplate(letter) {
    return /* html */ `<div class="contact-letter">${letter}</div>
                        <div class="contacts-separator-container">
                            <hr>
                        </div>`;
}


/**
 * This function generates an HTML template for the contact in the contacts list.
 * @param {Object} contact 
 * @param {string} userColor 
 * @returns 
 */
function contactInListTemplate(contact, contactColor, contactIndex) {
    return /* html */ `<div class="contact-in-list cursor-pointer" onclick="openContact(${contactIndex})">
        <div class="contact-initial-avatar-small ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
        <div class="contact-in-list-info">
            <div>${contact.firstName} ${contact.lastName}</div>
            <a href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
    </div>`;
}


/**
 * This function generates a contact profile HTML template.
 * @param {Object} contact 
 * @param {string} contactColor
 * @returns {string} contact profile HTML template
 */
function contactProfileTemplate(contact, contactColor) {
    return /* html */ `
    <div class="contact-profile-header">
        <div class="contact-initial-avatar-large ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
            <div class="contact-name-and-buttons-container">
                <h3>${contact.firstName} ${contact.lastName}</h3>
                <div class="contact-buttons">
                    <div class="contact-button">
                        <img src="assets/img/contact-edit-button-icon.svg" alt="contact edit button icon">
                        <span>Edit</span>
                    </div>
                    <div class="contact-button cursor-pointer" onclick="deleteContact('${contact.eMail}')">
                        <img src="assets/img/contact-delete-button-icon.svg" alt="contact delete button icon">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
    <div class="contact-information-heading">Contact information</div>
    <div class="contact-information-facts-container">
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Email</div>
            <a href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Phone</div>
            <div>${contact.phone}</div>
        </div>
    </div>
    `;
}