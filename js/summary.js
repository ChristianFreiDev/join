let currentUserIndex = 0;
let animationOver = false;
let taskIndex = 0;


/**
 * This function initialize the summary page by implementing header and nav.
 * Also by showing the right values of users tasks.
 */
async function initSummary() {
    checkForLogin();
    initGreeting();
    await loadUsers();
    greetUser();
    await init();
    await loadTasks();
    showSummaryValues();
    saveVariableInLocalStorage('fromIndex', false);
}


/**
 * This function changes the greeting settings for small and whide screens.
 */
function checkWindowWidth() {
    if (document.body.scrollWidth < 1400 && animationOver) {
        document.getElementById('summary-greeting-box').classList.add('display-none');
    } else if (document.body.scrollWidth >= 1400 && animationOver) {
        document.getElementById('summary-greeting-box').classList.remove('display-none');
        document.getElementById('summary-overlay').classList.add('display-none');
        document.getElementById('summary-greeting-box').classList.remove('animate-overlay');
        document.getElementById('summary-greeting-box').classList.remove('greeting-overlay');
        document.getElementById('summary-greeting-box').style.zIndex = '0';
    }
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


/**
 * This function outputs the amount of task with status "To do".
 */
function renderToDoButton() {
    document.getElementById('summary-to-do-amount').innerHTML = getToDosAmount();
}


/**
 * This function outputs the amount of task with status "Done".
 */
function renderDoneButton() {
    document.getElementById('summary-done-amount').innerHTML = getDonesAmount();
}


/**
 * This function renders the mid button.
 */
function renderPriorityAndDueDateButton() {
    if (tasks.length > 0) {
        let foundTasks = findTasks();
        renderPriorityIcon(findhighestPriority(foundTasks));
        renderPriorityAmount(foundTasks);
        renderPriorityValue(findhighestPriority(foundTasks));
        rednerUpcomingDeadline(foundTasks);
    } else {
        renderPriorityIcon();
        renderPriorityAmount();
        renderPriorityValue();
        rednerUpcomingDeadline();
    }
}


/**
 * This function searchs for all tasks with the highest priority.
 * 
 * @returns the tasks with highest priority as an array.
 */
function findTasks() {
    let results = [];
    let nextDuedate = new Date(findNextDuedate()).getTime();
    for (let i = 0; i < tasks.length; i++) {
        let date = new Date(tasks[i].dueDate).getTime();
        if ((date <= nextDuedate) && tasks[i].dueDate && tasks[i].status !== 'Done') {
            results.push(tasks[i]);
        }
    }
    return results;
}


/**
 * This function searches in the found tasks for the highest priority.
 * 
 * @param {Array} foundTasks 
 * @returns {string} highest Priority that was found.
 */
function findhighestPriority(foundTasks) {
    let results = findPriority("Urgent", foundTasks);
    if (results.length === 0) {
        results = findPriority("Medium", foundTasks);
        if (results.length === 0) {
            return 'Low';
        } else {
            return 'Medium';
        }
    } else {
        return 'Urgent';
    }
}


/**
 * This function sets the styles for the priority icon.
 * 
 * @param {string} prio 
 */
function renderPriorityIcon(prio = 'main') {
    let icon = document.getElementById('summary-priority-icon');
    document.getElementById('summary-priority-icon-box').style.backgroundColor = `var(--color-${prio.toLocaleLowerCase()})`;
    switch (prio) {
        case 'Urgent':
            setIconStylesToUrgent(icon);
            break;
        case 'Medium':
            setIconStylesToMedium(icon);
            break;
        case 'Low':
            setIconStylesToLow(icon);
            break;
        default:
            setIconStylesToDefault(icon);
            break;
    }
}


/**
 * This function set the icon styles to "Urgent".
 * 
 * @param {Element} icon 
 */
function setIconStylesToUrgent(icon) {
    icon.src = './assets/img/summary-priority-up-down.svg';
    icon.style.transform = 'unset';
    icon.style.width = '35px';
    icon.style.height = '26px';
    icon.style.display = 'flex';
}


/**
 * This function set the icon styles to "Medium".
 * 
 * @param {Element} icon 
 */
function setIconStylesToMedium(icon) {
    icon.src = './assets/img/priority-icon-medium-white.svg';
    icon.style.transform = 'unset';
    icon.style.width = '30px';
    icon.style.height = '16px';
    icon.style.display = 'flex';
}


/**
 * This function set the icon styles to "Low".
 * 
 * @param {Element} icon 
 */
function setIconStylesToLow(icon) {
    icon.src = './assets/img/summary-priority-up-down.svg';
    icon.style.transform = 'rotateZ(180deg)';
    icon.style.width = '35px';
    icon.style.height = '26px';
    icon.style.display = 'flex';
}


/**
 * This function set the icon styles to "Low".
 * 
 * @param {Element} icon 
 */
function setIconStylesToDefault(icon) {
    icon.style.display = 'none';
}


/**
 * This function searchs in the aray tasks for all tasks with the same priority.
 * 
 * @param {string} prio 
 * @returns the tasks with the same priority as an array.
 */
function findPriority(prio, foundTasks) {
    let results = [];
    for (let i = 0; i < foundTasks.length; i++) {
        if (foundTasks[i].priority === prio) {
            results.push(tasks[i]);
        }
    }
    return results;
}


/**
 * This function searches in the tasks array for the next duedate.
 * 
 * @returns {number} value of next duedate.
 */
function findNextDuedate() {
    let date = Infinity;
    for (let i = 0; i < tasks.length; i++) {
        let taskDate = new Date(tasks[i].dueDate);
        if (taskDate < date && tasks[i].status !== 'Done') {
            date = taskDate;
            taskIndex = i;
        }
    }
    return date;
}


/**
 *  This function outputs the amount of Tasks with the highest priority.
 * 
 * @param {Array} foundTasks 
 */
function renderPriorityAmount(foundTasks = []) {
    document.getElementById('summary-priority-amount').innerHTML = foundTasks.length;
}


/**
 * This function outputs the value of the highest priority.
 * 
 * @param {string} prioritiy 
 */
function renderPriorityValue(priority) {
    document.getElementById('summary-priority-value').innerHTML = priority;
}


/**
 * This function searchs for the upcoming due date and outputs it.
 * 
 * @param {Array} foundTasks 
 */
function rednerUpcomingDeadline(foundTasks) {
    if (foundTasks) {
        let date = findNextDuedate();
        document.getElementById('summary-due-date').innerHTML = formatDate(date);
        document.getElementById('summary-due-date-text').innerHTML = 'Upcoming Deadline';
    } else {
        document.getElementById('summary-due-date').innerHTML = 'No date has been specified for this task.';
        document.getElementById('summary-due-date-text').innerHTML = '';
    }
}


/**
 * This function formats the date.
 * 
 * @param {number} date 
 * @returns {string} of next duedate.
 */
function formatDate(date) {
    return date.toLocaleString("en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}


/**
 * This function outputs the amount of all tasks on Board.
 */
function renderTaskButton() {
    document.getElementById('summary-tasks-amount').innerHTML = tasks.length;
}


/**
 * This function outputs the amount of tasks with status "In progress".
 */
function renderProgressButton() {
    document.getElementById('summary-in-progress-amount').innerHTML = getInProgressAmount();
}


/**
 * This function outputs the amount of tasks with status "Await feedback".
 */
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