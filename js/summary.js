/**
 * This function initialize the summary page by implementing header and nav.
 * Also by showing the right values of users tasks.
 */

async function initSummary() {
    await init();
    showSummaryValues();
}


/**
 * This function fill the summary with the actual values.
 */

function showSummaryValues() {
    renderToDoButton();
    renderDoneButton();
    renderPriorityAndDueDateButton();
    renderTaskButton();
    renderProgressButton();
    renderFeedbackButton();
}


function renderToDoButton() {
    document.getElementById('summary-to-do-amount').innerHTML = getToDosAmount();
}


function renderDoneButton() {
    document.getElementById('summary-done-amount').innerHTML = getDonesAmount();
}


function renderPriorityAndDueDateButton() {
    choosePriorityIconAndGetAmount();
}


function choosePriorityIconAndGetAmount() {
    let priorityCounter = 0;
    let priorityCounterUrgent = 0;
    let priorityCounterMedium = 0;
    let priorityCounterLow = 0;
    let urgentFound = false;
    let mediumFound = false;
    let lowFound = false;
    if (tasks.length > 0) {
        let foundTasks = findTasks();




        // if (foundPriority('Urgent')) {
        //     getTasks('Urgent');
        // } else if (foundPriority('Medium')) {
        //     getTasks('Medium');

        // } else if (foundPriority('Low')) {
        //     getTasks('Low');

        // }
        // for (let i = 0; i < tasks.length; i++) {
        //     if (tasks[i].status != 'Done') {
        //         if (tasks[i].priority === 'Urgent') {
        //             priorityCounterUrgent++;
        //             urgentFound = true;
        //         } else if (!urgentFound && tasks[i].priority === 'Medium') {
        //             priorityCounterMedium++;
        //             mediumFound = true;
        //         } else if (!urgentFound && !mediumFound && tasks[i].priority === 'Low') {
        //             priorityCounterLow++;
        //             lowFound = true;
        //         }
        //     }
        // }
        // if (urgentFound && !mediumFound && !lowFound) {
        //     return
        // } else if (mediumFound && !lowFound) {

        // } else if (lowFound) {

        // }
    } else {

    }



}

function renderPriorityIcon(prio) {
    let icon = document.getElementById('summary-priority-icon');
    switch (prio) {
        case 'Urgent':
            icon.src = './assets/img/summary-priority-up-down.svg';
            icon.style.transform = 'unset';
            icon.style.width = '35px';
            icon.style.height = '26px';
            break;
        case 'Medium':
            icon.src = './assets/img/prio-medium-white.svg';
            icon.style.transform = 'unset';
            icon.style.width = '21px';
            icon.style.height = '8px';
            break;
        case 'Low':
            icon.src = './assets/img/summary-priority-up-down.svg';
            icon.style.transform = 'rotateZ(180deg)';
            icon.style.width = '35px';
            icon.style.height = '26px';
            break;

        default:
            break;
    }
}


function foundPriority(prio) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === prio && tasks[i].status != 'Done') {
            return true;
        }
    }
    return false;
}


function renderTaskButton() {
    document.getElementById('summary-tasks-amount').innerHTML = tasks.length;
}


function renderProgressButton() {
    document.getElementById('summary-in-progress-amount').innerHTML = getInProgressAmount();
}


function renderFeedbackButton() {
    document.getElementById('summary-await-feedback-amount').innerHTML = getAwaitFeedbackAmount();
}


/**
 *  This function iterates through the array tasks and increases its counter when a task is found including status "To do".
 * @returns the amount of actual tasks with status "To do".
 */

function getToDosAmount() {
    let toDoCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'To do') {
            toDoCount++;
        }
    }
    return toDoCount;
}


/**
 *  This function iterates through the array tasks and increases its counter when a task is found including status "Done".
 * @returns the amount of actual tasks with status "Done".
 */

function getDonesAmount() {
    let doneCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Done') {
            doneCount++;
        }
    }
    return doneCount;
}


/**
 *  This function iterates through the array tasks and increases its counter when a task is found including status "In progress".
 * @returns the amount of actual tasks with status "In progress".
 */

function getInProgressAmount() {
    let inProgressCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'In progress') {
            inProgressCount++;
        }
    }
    return inProgressCount;
}


/**
 *  This function iterates through the array tasks and increases its counter when a task is found including status "Await feedback".
 * @returns the amount of actual tasks with status "Await feedback".
 */

function getAwaitFeedbackAmount() {
    let awaitFeedbackCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Await feedback') {
            awaitFeedbackCount++;
        }
    }
    return awaitFeedbackCount;
}