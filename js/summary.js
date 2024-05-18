let currentUserIndex = 0;
let animationOver = false;
let taskIndex = 0;


/**
 * This function initializes the summary page by implementing header and nav.
 * Also by showing the right values of user tasks.
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
 * This function changes the greeting settings for small and wide screens.
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
 * This function fills the summary with the actual values.
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
 * This function outputs the amount of tasks with status "To do".
 */
function renderToDoButton() {
    document.getElementById('summary-to-do-amount').innerHTML = getAmountOfTasksWithStatus('To do');
}


/**
 * This function outputs the amount of tasks with status "Done".
 */
function renderDoneButton() {
    document.getElementById('summary-done-amount').innerHTML = getAmountOfTasksWithStatus('Done');
}


/**
 * This function renders the button in the middle.
 */
function renderPriorityAndDueDateButton() {
    if (tasks.length > 0) {
        let foundTasks = findTasksWithHighestPriority();
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


function findTasksWithHighestPriority() {
    let tasksWithHighestPriority = findTasks('Urgent');
    if (tasksWithHighestPriority.length === 0) {
        tasksWithHighestPriority = findTasks('Medium');
    }
    if (tasksWithHighestPriority.length === 0) {
        tasksWithHighestPriority = findTasks('Low');
    }
    return tasksWithHighestPriority;
}


/**
 * This function searches for all tasks with the highest priority.
 * 
 * @returns {Array} the tasks with highest priority as an array.
 */
function findTasks(priority) {
    let results = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === priority && tasks[i].status !== 'Done') {
            results.push(tasks[i]);
        }
    }
    return results;
}


/**
 * This function searches for the highest priority in the found tasks.
 * 
 * @param {Array} foundTasks 
 * @returns {string} highest priority that was found.
 */
function findhighestPriority(foundTasks) {
    if (foundTasks.length > 0) {
        return foundTasks[0].priority;
    } else {
        return 'main';
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
 * This function sets the icon styles to "Urgent".
 * 
 * @param {Element} icon 
 */
function setIconStylesToUrgent(icon) {
    icon.src = './assets/img/summary-priority-up-down.svg';
    icon.style.transform = 'unset';
    icon.classList.add('summary-priority-icon-urgent');
    icon.style.display = 'flex';
}


/**
 * This function sets the icon styles to "Medium".
 * 
 * @param {Element} icon 
 */
function setIconStylesToMedium(icon) {
    icon.src = './assets/img/priority-icon-medium-white.svg';
    icon.style.transform = 'unset';
    icon.classList.add('summary-priority-icon-medium');
    icon.style.display = 'flex';
}


/**
 * This function sets the icon styles to "Low".
 * 
 * @param {Element} icon 
 */
function setIconStylesToLow(icon) {
    icon.src = './assets/img/summary-priority-up-down.svg';
    icon.style.transform = 'rotateZ(180deg)';
    icon.classList.add('summary-priority-icon-low');
    icon.style.display = 'flex';
}


/**
 * This function sets the icon styles to the default value.
 * 
 * @param {Element} icon 
 */
function setIconStylesToDefault(icon) {
    icon.style.display = 'none';
}


/**
 * This function searches for all tasks with the same priority in the tasks array.
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
 * This function searches for the next due date in the tasks array.
 * 
 * @returns {number} value of next due date.
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
 *  This function outputs the amount of tasks with the highest priority.
 * 
 * @param {Array} foundTasks 
 */
function renderPriorityAmount(foundTasks = []) {
    document.getElementById('summary-priority-amount').innerHTML = foundTasks.length;
}


/**
 * This function outputs the value of the highest priority.
 * 
 * @param {string} priority 
 */
function renderPriorityValue(priority) {
    document.getElementById('summary-priority-value').innerHTML = priority;
}


/**
 * This function searches for the upcoming due date and outputs it.
 */
function rednerUpcomingDeadline() {
    if (tasks) {
        let date = findNextDuedate();
        if (date === Infinity) {
            document.getElementById('summary-due-date').innerHTML = 'Nothing to do.';
            document.getElementById('summary-due-date-text').innerHTML = '';
        } else {
            document.getElementById('summary-due-date').innerHTML = formatDate(date);
            document.getElementById('summary-due-date-text').innerHTML = 'Upcoming Deadline';
        }
    }
}


/**
 * This function formats the date.
 * 
 * @param {number} date 
 * @returns {string} next due date.
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
 * This function outputs the amount of all tasks on the board.
 */
function renderTaskButton() {
    document.getElementById('summary-tasks-amount').innerHTML = tasks.length;
}


/**
 * This function outputs the amount of tasks with status "In progress".
 */
function renderProgressButton() {
    document.getElementById('summary-in-progress-amount').innerHTML = getAmountOfTasksWithStatus('In progress');
}


/**
 * This function outputs the amount of tasks with status "Await feedback".
 */
function renderFeedbackButton() {
    document.getElementById('summary-await-feedback-amount').innerHTML = getAmountOfTasksWithStatus('Await feedback');
}


/**
 *  This function iterates through the tasks array and increases a counter when a task with the specified status is found.
 * @returns the amount of current tasks with the specified status.
 */
function getAmountOfTasksWithStatus(status) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === status) {
            count++;
        }
    }
    return count;
}