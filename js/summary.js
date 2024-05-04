/**
 * This function initialize the summary page by implementing header and nav.
 * Also by showing the right values of users tasks.
 */
async function initSummary() {
    await loadUsers();
    greetUser();
    await init();
    await loadTasks();
    showSummaryValues();
}


async function greetUser() {
    document.getElementById('summary-greeding-name').innerHTML = await getUserName();
    if (window.screen.width <= 1400) {
        
    }

    /**
     * Check windowsize. Ab 1400px muss die Einblendung erfolgen
     * Darüber soll der Name geändert werden und bei Gast soll beiden Enblendungen das Komma entfernt werden und der Name.
     */
}


let currentUserIndex = 0;
async function getUserName() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === loadVariableFromLocalStorage('currentJoinUserId')) {
            currentUserIndex = i;
        }
    }
    return `${users[currentUserIndex].firstName} ${users[currentUserIndex].lastName}`;
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
        renderPriorityIcon(foundTasks[0].priority);
        renderPriorityAmount(foundTasks);
        renderPriorityValue(foundTasks);
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
    let results = foundPriority('Urgent');
    if (results.length > 0) {
        return results;
    } else {
        results = foundPriority('Medium')
        if (results.length > 0) {
            return results;
        } else {
            results = foundPriority('Low');
            if (results.length > 0) {
                return results;
            } else {
                return [];
            }
        }
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
    icon.src = './assets/img/prio-medium-white.svg';
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
function foundPriority(prio) {
    let results = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === prio && tasks[i].status != 'Done') {
            results.push(tasks[i]);
        }
    }
    return results;
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
 * @param {Array} foundTasks 
 */
function renderPriorityValue(foundTasks = [{ priority: '' }]) {
    document.getElementById('summary-priority-value').innerHTML = foundTasks[0].priority;
}


/**
 * This function searchs for the upcoming due date and outputs it.
 * 
 * @param {Array} foundTasks 
 */
function rednerUpcomingDeadline(foundTasks) {
    if (foundTasks) {
        let date = Infinity;
        let taskIndex = 0;
        for (let i = 0; i < foundTasks.length; i++) {
            let taskDate = new Date(foundTasks[i].dueDate);
            if (taskDate < date) {
                date = taskDate;
                taskIndex = i;
            }
        }
        document.getElementById('summary-due-date').innerHTML = new Date(foundTasks[taskIndex].dueDate).toLocaleString("en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
        document.getElementById('summary-due-date-text').innerHTML = 'Upcoming Deadline';
    } else {
        document.getElementById('summary-due-date').innerHTML = 'No date has been specified for this task.';
        document.getElementById('summary-due-date-text').innerHTML = '';
    }
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