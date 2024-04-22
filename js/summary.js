async function initSummary() {
    await init();
    showSummaryValues();
}


function showSummaryValues() {
    document.getElementById('summary-to-do-amount').innerHTML = showToDosAmount();
    document.getElementById('summary-done-amount').innerHTML = showDonesAmount();
    
    document.getElementById('summary-tasks-amount').innerHTML = showTasksAmount();
    document.getElementById('summary-in-progress-amount').innerHTML = showInProgressAmount();
    document.getElementById('summary-await-feedback-amount').innerHTML = showAwaitFeedbackAmount();
}


function showToDosAmount() {
    let toDoCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'To do') {
            toDoCount++;
        }
    }
    return toDoCount;
}


function showDonesAmount() {
    let doneCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Done') {
            doneCount++;
        }
    }
    return doneCount;
}


function showTasksAmount() {
    return tasks.length;
}


function showInProgressAmount() {
    let inProgressCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'In progress') {
            inProgressCount++;
        }
    }
    return inProgressCount;
}


function showAwaitFeedbackAmount() {
    let awaitFeedbackCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Await feedback') {
            awaitFeedbackCount++;
        }
    }
    return awaitFeedbackCount;
}