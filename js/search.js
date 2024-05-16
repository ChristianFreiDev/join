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
 * This function filters the contact names using a search string.
 * @returns {Array} contacts whose names match the search string.
 */
function filterContactNames(searchString) {
    return contacts.filter(contact => {
        let fullContactName = `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}`;
        return fullContactName.includes(searchString);
    });
}


/**
 * This function displays the contacts that were found as a list of options.
 * @param {Object} task 
 * @param {Array} foundContacts 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function showFoundContacts(task, foundContacts, idPrefix) {
    let taskAssignedTo = document.getElementById(`${idPrefix}-assigned-to`);
    if (foundContacts.length > 0) {
        taskAssignedTo.innerHTML = renderSelectOptions(task, foundContacts, idPrefix);
    } else {
        taskAssignedTo.innerHTML = '<div class="no-users-message">No contacts found</div>';
    }
    taskAssignedTo.classList.remove('display-none');
}


/**
 * This function searches for contacts matching the search criteria.
 * @param {number} taskId 
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'.
 */
function searchContacts(taskId, idPrefix) {
    let task;
    if (taskId === undefined) {
        task = temporaryTask;
    } else {
        task = tasks.find(task => task.id === taskId);
    }
    let searchInput = document.getElementById(`${idPrefix}-drop-down-input`);
    let searchString = searchInput.value.toLowerCase();
    foundContacts = filterContactNames(searchString);
    showFoundContacts(task, foundContacts, idPrefix);
}