let priority = "none"
let allTasks = []

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
    allTasks.push(task)  
    setItem('tasks', allTasks)
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

function renderAssignedToList(){
    let assignedToList = document.getElementById('assigned-to-list');
    assignedToList = '';
    contacts = contacts.sort((a, b) => sortContactsByFirstName(a, b));
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let contactColor = getContactColor(contact);
        assignedToList.innerHTML += generateAssignedList(contact, contactColor);
    }
}   