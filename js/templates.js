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
                    <label for="edit-task-title-input" class="task-form-label">Title <span class="color-red">*</span></label>
                    <input id="edit-task-title-input" class="input input-padding-size4 pop-up-input" type="text" placeholder="Enter a title" value="${task.title}" autocomplete="off" onkeyup="checkEditTitleRequirement()">
                    <div class="error-message"></div>
                </div>
                <div class="form-label-and-input-container">
                    <label for="edit-task-description-textarea" class="task-form-label">Description</label>
                    <textarea id="edit-task-description-textarea" class="input pop-up-input" type="text" placeholder="Enter a description">${task.description}</textarea>
                </div>
                <div class="form-label-and-input-container">
                    <label for="edit-task-due-date" class="task-form-label">Due date <span class="color-red">*</span></label>
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
                <div class="edit-task-assigned-to-container">
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
            <button class="button dark-button button-padding-size3 edit-task-ok-button" id="edit-task-ok-button" onclick="validateEditInputs(['edit-task-title-input', 'edit-task-due-date'])">OK</button>
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
 * @returns {string} inital avatar HTML template, large
 */
function initialAvatarLargeTemplate(user) {
    return /* html */ `<div class="initial-avatar initial-avatar-large ${user.color}">${getInitials(user)}</div>`;
}


/**
 * This function returns an initial avatar HTML template for a user.
 * @param {Object} user 
 * @returns {string} inital avatar HTML template, very large
 */
function initialAvatarVeryLargeTemplate(user) {
    return /* html */ `<div class="initial-avatar initial-avatar-very-large ${getContactColor(user.eMail)}">${getInitials(user)}</div>`;
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
    let suffix = getUserNameSuffix(user);
    return /* html */ `<div class="collaborator-name-outer-container">
        <div class="collaborator-name-container">
            ${initialAvatarLargeTemplate(user)}
            <div class="collaborator-name">${user.firstName} ${user.lastName}${suffix}</div>
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
function contactInListTemplate(contact, contactColor, contactIndex, suffix) {
    return /* html */ `<div id="contact-in-list${contactIndex}" class="contact-in-list cursor-pointer" onclick="openContact(${contactIndex})">
        <div class="contact-initial-avatar-small ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
        <div class="contact-in-list-info">
            <div>${contact.firstName} ${contact.lastName}${suffix}</div>
            <a class="contact-link" href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
    </div>`;
}


/**
 * This function returns a pencil icon as svg.
 * @returns {string} svg template of button icon for editing contacts
 */
function editButtonSvg() {
    return /* html */ `<svg class="contact-button-icon" width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 17H3.9L12.525 8.375L11.125 6.975L2.5 15.6V17ZM16.8 6.925L12.55 2.725L13.95 1.325C14.3333 0.941667 14.8042 0.75 15.3625 0.75C15.9208 0.75 16.3917 0.941667 16.775 1.325L18.175 2.725C18.5583 3.10833 18.7583 3.57083 18.775 4.1125C18.7917 4.65417 18.6083 5.11667 18.225 5.5L16.8 6.925ZM15.35 8.4L4.75 19H0.5V14.75L11.1 4.15L15.35 8.4Z" />
    </svg>`;
}


/**
 * This function returns a trash can icon as svg.
 * @returns {string} svg template of button icon for deleting contacts
 */
function deleteButtonSvg() {
    return /* html */ `<svg class="contact-button-icon" width="17" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" />
    </svg>`;
}


function cancelIconSVG() {
    return /* html */ `<svg class="cancel-button-icon" width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
}


function closeIconSvg() {
    return /* html */ `<svg class="close-pop-up-icon close-edit-add-contact-pop-up-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="removePopup('edit-add-contact-pop-up')">
        <mask id="mask0_71720_5848" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_71720_5848)">
        <path d="M15.9998 17.4L11.0998 22.3C10.9165 22.4834 10.6831 22.575 10.3998 22.575C10.1165 22.575 9.88314 22.4834 9.6998 22.3C9.51647 22.1167 9.4248 21.8834 9.4248 21.6C9.4248 21.3167 9.51647 21.0834 9.6998 20.9L14.5998 16L9.6998 11.1C9.51647 10.9167 9.4248 10.6834 9.4248 10.4C9.4248 10.1167 9.51647 9.88338 9.6998 9.70005C9.88314 9.51672 10.1165 9.42505 10.3998 9.42505C10.6831 9.42505 10.9165 9.51672 11.0998 9.70005L15.9998 14.6L20.8998 9.70005C21.0831 9.51672 21.3165 9.42505 21.5998 9.42505C21.8831 9.42505 22.1165 9.51672 22.2998 9.70005C22.4831 9.88338 22.5748 10.1167 22.5748 10.4C22.5748 10.6834 22.4831 10.9167 22.2998 11.1L17.3998 16L22.2998 20.9C22.4831 21.0834 22.5748 21.3167 22.5748 21.6C22.5748 21.8834 22.4831 22.1167 22.2998 22.3C22.1165 22.4834 21.8831 22.575 21.5998 22.575C21.3165 22.575 21.0831 22.4834 20.8998 22.3L15.9998 17.4Z"/>
        </g>
    </svg>`;
}


/**
 * This function generates a contact profile HTML template.
 * @param {Object} contact 
 * @param {string} contactColor
 * @returns {string} contact profile HTML template
 */
function contactProfileTemplate(contact, contactColor, index) {
    return /* html */ `
    <div class="contact-profile-header">
        <div class="contact-initial-avatar-large ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
            <div class="contact-name-and-buttons-container">
                <h3>${contact.firstName} ${contact.lastName}</h3>
                <div class="contact-buttons">
                    <div class="contact-button" onclick="editContact('${contact.eMail}', ${index})">
                        ${editButtonSvg()}
                        <span>Edit</span>
                    </div>
                    <div class="contact-button" onclick="deleteContact('${contact.eMail}')">
                        ${deleteButtonSvg()}
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
    <div class="contact-information-heading">Contact information</div>
    <div class="contact-information-facts-container">
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Email</div>
            <a class="contact-link" href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Phone</div>
            <div>${contact.phone}</div>
        </div>
    </div>
    `;
}


function contactEditForm(contact, index) {
    return /* html */ `${closeIconSvg()}
    <div class="edit-add-contact-pop-up-container">
        <div class="edit-add-contact-pop-up-left-side">
            <img src="assets/img/light-logo.svg" alt="">
            <h2>Edit&nbspcontact</h2>
        </div>
        <form class="edit-add-contact-pop-up-right-side" onsubmit="saveEditedContact(${index}); return false">
        <div class="edit-add-contact-pop-up-content">
            ${initialAvatarVeryLargeTemplate(contact)}
            <div class="contact-inputs">
                <div class="input-box">
                    <input id="contact-name-input" class="input input-padding-size5 login-input" type="text" value="${contact.firstName} ${contact.lastName}" placeholder="Name" required>
                    <img class="input-icon" src="../assets/img/person.svg" alt="person icon">
                </div>
                <div class="input-box">
                    <input id="contact-email-input" class="input input-padding-size5 login-input" type="email" value="${contact.eMail}" placeholder="Email" required>
                    <img class="input-icon" src="../assets/img/mail.svg" alt="e-mail icon">
                </div>
                <div class="input-box">
                    <input id="contact-phone-input" class="input input-padding-size5 login-input" type="text" value="${contact.phone}" placeholder="Phone" required>
                    <img class="input-icon" src="../assets/img/phone.svg" alt="phone icon">
                </div>
            </div>
            </div>
            <div class="contact-pop-up-buttons-container">
                <button class="button light-button button-padding-size3" type="button" onclick="deleteContact('${contact.eMail}')">Delete</button>
                <button class="button dark-button button-padding-size2">Save <img src="assets/img/check-create-task.svg" alt="check icon" type="submit"></button>
            </div>
        </form>
    </div>`;
}


function addContactForm(contact, index) {
    return /* html */ `<div class="edit-add-contact-pop-up-container">
        ${closeIconSvg()}
        <div class="edit-add-contact-pop-up-left-side">
            <img src="assets/img/light-logo.svg" alt="">
            <h2>Add&nbspcontact</h2>
            <span class="add-task-slogan">Tasks are better with a team!</span>
            <div class="contacts-header-separator-vertical pop-up-separator"></div>
        </div>
        <form class="edit-add-contact-form edit-add-contact-pop-up-right-side" onsubmit="addContact(); return false">
        <div class="edit-add-contact-pop-up-content">
            <div class="initial-avatar initial-avatar-very-large background-color-gray">
                <img src="../assets/img/person-large.svg" alt="person">
            </div>
            <div class="contact-inputs">
                <div class="input-box">
                    <input id="contact-name-input" class="input input-padding-size5 login-input" type="text" placeholder="Name" required>
                    <img class="input-icon" src="../assets/img/person.svg" alt="person icon">
                </div>
                <div class="input-box">
                    <input id="contact-email-input" class="input input-padding-size5 login-input" type="email" placeholder="Email" required>
                    <img class="input-icon" src="../assets/img/mail.svg" alt="e-mail icon">
                </div>
                <div class="input-box">
                    <input id="contact-phone-input" class="input input-padding-size5 login-input" type="text" placeholder="Phone" required>
                    <img class="input-icon" src="../assets/img/phone.svg" alt="phone icon">
                </div>
            </div>
            </div>
            <div class="contact-pop-up-buttons-container">
                <button id="cancel-button" class="button light-button button-padding-size2" type="button">Cancel ${cancelIconSVG()}</button>
                <button class="button dark-button button-padding-size2">Create contact <img src="assets/img/check-create-task.svg" alt="check icon" type="submit"></button>
            </div>
        </form>
    </div>`;
}


function contactsMoreMenu(index, email) {
    return /* html */ `
    <div id="contacts-more-menu">
        <button onclick="animateMoreMenuOut(); editContact('${email}', ${index});">${editButtonSvg()} Edit</button>
        <button onclick="animateMoreMenuOut(); deleteContact('${email}')">${deleteButtonSvg()} Delete</button>
    </div>
    `;
}