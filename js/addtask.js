let priority = "none"
let allTasks = []
let task = {
    title: undefined,
    description: undefined,
    id: undefined,
    collaborators: [], // user id
    dueDate: undefined,
    priority: 'none',
    category: undefined,
    status: undefined,
    subtasks: []
}


async function initAddTask() {
    await init();
    await Promise.all([loadTasks(), loadUsers()]);
    renderAssignedToList();
}

//----------------------- Prio Buttons---------------------------------//

/** 
 * This object is used to avoid repetitions at the prio buttons
 */

const buttonActions = {
    'urgent': {
        'clicked': function() {
            document.getElementById('prio-urgent').classList.add('urgent-button-clicked');
            document.getElementById('prio-arrow-up').src = '/assets/img/prio-up-white.svg';
        },
        'unclicked': function() {
            document.getElementById('prio-urgent').classList.remove('urgent-button-clicked');
            document.getElementById('prio-arrow-up').src = '/assets/img/prio-up.svg';
        }
    },
    'medium': {
        'clicked': function() {
            document.getElementById('prio-medium').classList.add('medium-button-clicked');
            document.getElementById('prio-medium-equals').src = '/assets/img/prio-medium-white.svg';
        },
        'unclicked': function() {
            document.getElementById('prio-medium').classList.remove('medium-button-clicked');
            document.getElementById('prio-medium-equals').src = '/assets/img/prio-medium-orange.svg';
        }
    },
    'low': {
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
 * @param {string} newPriority - this is the name of the priority. (urgent, medium or low)
 */
function clickButton(newPriority) {
    if(priority == newPriority) {
        buttonActions[newPriority].unclicked();
        priority = "none";
    } else {
        if(priority != "none") {
            buttonActions[priority].unclicked();
        }
        buttonActions[newPriority].clicked();
        priority = newPriority;
    }
}


/**
 * This function adds a task to the server
 */
function addTask(){
    title = document.getElementById('input-title');
    description = document.getElementById('input-description');
    date = document.getElementById('input-due-date');
    category = document.getElementById('input-category');

    let task = {
        title: title.value,
        description: description.value,
        dueDate: date.value,
        category: category.value,
    };
    task.push(task)  
    setItem('tasks', task)
    resetForm();
}


/**
 * This function resets all values of the form.
 */
function resetForm(){
    title.value = '';
    description.value = '';
    date.value = '';
    category.value ='';
}

/**
 * This function renders users to the input "assigned to"
 */
function renderAssignedToList() {
    let assignedTo = document.getElementById('edit-task-assigned-to');
    assignedTo.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        assignedTo.innerHTML += generateAssignedToList(user);
    }
}
