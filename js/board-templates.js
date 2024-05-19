/**
 * This function returns an HTML template showing the progress of a task or an empty string if there are no subtasks.
 * @param {Object} task 
 * @param {number} doneSubtasks number of completed subtasks.
 * @returns 
 */
function generateTaskProgressContainerTemplate(task, doneSubtasks) {
    if (task.subtasks.length > 0) {
        return /* html */ `
            <div class="task-progress-container">
                <progress class="task-progress" max="100" value="${doneSubtasks/task.subtasks.length * 100}"></progress>
                <span>${doneSubtasks}/${task.subtasks.length} subtasks</span>
                <span class="subtask-tooltip">${doneSubtasks} of ${task.subtasks.length} subtasks completed</span>
            </div>
        `;
    } else {
        return '';
    }
}


/**
 * This function returns an HTML template of a task.
 * @param {Object} task
 * @param {number} doneSubtasks number of completed subtasks.
 * @returns {string} task HTML template.
 */
function taskTemplate(task, doneSubtasks) {
    return /* html */ `
        <div class="task" draggable="true" ondragstart="startDraggingTask(event, ${task.id})" ondragend="endDraggingTask(event)" onclick="openTask(${task.id})">
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
        </div>
        `;
}


/**
 * This function returns an HTML template of a task opened in a pop-up.
 * @param {Object} task 
 * @returns {string} task pop-up HTML template.
 */
function openTaskPopupTemplate(task) {
    return /* html */ `
    <div class="open-task-pop-up-header">
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
            <div id="open-task-subtasks">${generateSubtasks(task, task.subtasks, 'board-subtasks')}</div>
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
    </div>
    `;
}


/**
 * This function returns an HTML template of a task being edited in a pop-up.
 * @param {Object} task 
 * @returns {string} HTML template of task for editing.
 */
function editTaskTemplate(task, className) {
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
                            <ul id="edit-task-subtasks-list" class="${className}">
                                ${generateSubtasksTemporary(task.subtasks, 'edit-task')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button class="button dark-button button-padding-size3 edit-task-ok-button" id="edit-task-ok-button" onclick="validateEditInputs(['edit-task-title-input', 'edit-task-due-date'])">OK</button>
        </form>
        `;
}


/**
 * This function returns a task category with an appropriate class (different color depending on the category)
 * for the pop-up for opening tasks.
 * @param {Object} task 
 * @returns {string} HTML template of task category for pop-up.
 */
function openTaskPopupCategoryTemplate(task) {
    return /* html */ `<div class="task-category task-category-large ${task.category === 'Technical Task' ? 'technical-task' : 'user-story'}">${task.category}</div>`;
}


/**
 * This function returns an HTMl template of a task priority including the corresponding icon
 * for the pop-up for opening tasks.
 * @param {Object} task 
 * @returns {string} HTML template of task priority for pop-up.
 */
function openTaskPopupPriorityTemplate(task) {
    return /* html */ `<div>${task.priority}</div>
        <img src="${'../assets/img/' + task.priority.toLowerCase() + '-board-priority-icon.svg'}" class="priority-icon">`;
}