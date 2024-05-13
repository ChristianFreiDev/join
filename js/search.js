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
 * This function filters the user names using a search string.
 * @returns {Array} users whose names match the search string
 */
function filterUserNames() {
    return users.filter(user => {
        let fullUserName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        return fullUserName.includes(searchString);
    });
}


/**
 * This function displays the users that were found as a list of options.
 * @param {Object} task 
 * @param {Array} foundUsers 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task' 
 */
function showFoundUsers(task, foundUsers, idPrefix) {
    let taskAssignedTo = document.getElementById(`${idPrefix}-assigned-to`);
    if (foundUsers.length > 0) {
        taskAssignedTo.innerHTML = renderSelectOptions(task, foundUsers, idPrefix);
    } else {
        taskAssignedTo.innerHTML = '<div class="no-users-message">No users found</div>';
    }
    taskAssignedTo.classList.remove('display-none');
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
    foundUsers = filterUserNames(searchString);
    showFoundUsers();
}