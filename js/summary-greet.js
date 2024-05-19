/**
 * This function greets the user considering the scroll width.
 */
function initGreeting() {
    if (document.body.scrollWidth <= 1400 && loadVariableFromLocalStorage('fromIndex') == 'true') {
        document.getElementById('summary-overlay').style.zIndex = '4';
    } else if (document.body.scrollWidth <= 1400 && loadVariableFromLocalStorage('fromIndex') == 'false') {
        document.getElementById('summary-greeting-box').classList.add('display-none');
        document.getElementById('summary-overlay').style.zIndex = '-1';
    } else if (document.body.scrollWidth > 1400) {
        document.getElementById('summary-overlay').classList.add('display-none');
    }
}


/**
 * This function greets the user considering the time of day and scroll width.
 */
async function greetUser() {
    checkDayTimeAndChangeGreeting();
    document.getElementById('summary-greeting-name').innerHTML = await getUserName();
    if (loadVariableFromLocalStorage('currentJoinUserId') == 0) {
        document.getElementById('summary-greeting-punctuation-mark').classList.add('display-none');
    }
    if (document.body.scrollWidth <= 1400) {
        setGreetingToSmallScreen();
        setTimeout(hideOverlay, 3000);
    }
    animationOver = true;
}


/**
 * This function sets the greeting settings to small screen.
 */
function setGreetingToSmallScreen() {
    if (loadVariableFromLocalStorage('fromIndex') == 'true') {
        document.querySelector('body').style.overflow = 'hidden';
        document.getElementById('summary-greeting-box').classList.add('greeting-overlay');
        setTimeout(animateOverlay, 1000);
    } else {
        document.getElementById('summary-greeting-box').classList.add('display-none');
        document.getElementById('summary-greeting-box').classList.remove('greeting-overlay');
    }
}


/**
 * This function checks the time of day and changes the greeting.
 */
function checkDayTimeAndChangeGreeting() {
    let daytimeString = checkDayTime();
    changeGreeting(daytimeString);
}


/**
 * This function gets the time of day in hours and
 * 
 * @returns {string} formatted to include in html.
 */
function checkDayTime() {
    let daytimeString = '';
    let date = new Date();
    let dayTime = date.getHours();
    daytimeString = choosedaytimeString(dayTime);
    return daytimeString + `<span id="summary-greeting-punctuation-mark">,</span>`;
}


/**
 * This function checks the time of day in hours and
 * 
 * @param {number} dayTime 
 * @returns {string} the greeting.
 */
function choosedaytimeString(dayTime) {
    if (dayTime >= 3 && dayTime < 12) {
        return 'morning';
    }
    if (dayTime >= 12 && dayTime < 18) {
        return 'afternoon';
    }
    if (dayTime >= 18 || dayTime < 3) {
        return 'evening';
    }
}


/**
 * This function includes the greeting in the html document.
 * 
 * @param {string} daytimeString 
 */
function changeGreeting(daytimeString) {
    document.getElementById('summary-greeting').innerHTML = `Good ${daytimeString}`;
}


/**
 * This function animates the summary overlay.
 */
function animateOverlay() {
    document.getElementById('summary-overlay').classList.add('animate-overlay');
    document.getElementById('summary-greeting-box').classList.add('animate-overlay');
    setTimeout(removeAnimation, 3000)
}


/**
 * This function removes the animation classes for the summary overlay.
 */
function removeAnimation() {
    document.getElementById('summary-overlay').classList.remove('animate-overlay');
    document.getElementById('summary-greeting-box').classList.remove('animate-overlay');
    document.querySelector('body').style.overflow = 'unset';
}


/**
 * This function hides the summary overlay.
 */
function hideOverlay() {
    document.getElementById('summary-overlay').style.zIndex = '-1';
    document.getElementById('summary-greeting-box').style.zIndex = '-1';
}


/**
 * This function gets the user name of the user that has been logged in.
 * 
 * @returns {string} full name of current user.
 */
async function getUserName() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == loadVariableFromLocalStorage('currentJoinUserId')) {
            currentUserIndex = i;
            if (i == 0) {
                return '';
            }
        }
    }
    return `${users[currentUserIndex].firstName} ${users[currentUserIndex].lastName}`;
}