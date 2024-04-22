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
    document.getElementById('summary-to-do-amount').innerHTML = showToDosAmount();
    document.getElementById('summary-done-amount').innerHTML = showDonesAmount();

    document.getElementById('summary-tasks-amount').innerHTML = tasks.length;
    document.getElementById('summary-in-progress-amount').innerHTML = showInProgressAmount();
    document.getElementById('summary-await-feedback-amount').innerHTML = showAwaitFeedbackAmount();
}


/**
 *  This function iterates through the array tasks and increases its counter when a task is found including status "To do".
 * @returns the amount of actual tasks with status "To do".
 */

function showToDosAmount() {
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

function showDonesAmount() {
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

function showInProgressAmount() {
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

function showAwaitFeedbackAmount() {
    let awaitFeedbackCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Await feedback') {
            awaitFeedbackCount++;
        }
    }
    return awaitFeedbackCount;
}