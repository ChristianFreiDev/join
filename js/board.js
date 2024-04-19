function taskTemplate(task, doneSubtasks) {
    return /* html */ `
        <div class="task">
            <div class="task-category">${task.category}</div>
            <div class="task-title-and-description-container">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div>
                <progress class="task-progress" max="100" value="${doneSubtasks/task.subtasks.length}"></progress>
                <span>${doneSubtasks}/${task.subtasks.length}</span>
            </div>
            <div class="profile-icons-and-priority-container">
                <div class="profile-icons"></div>
                <img src="'../assets/img/' + ${task.priority.toLower()} + 'icon.svg" class="priority-icon">
            </div>
        </div>
    `;
}