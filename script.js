/**
 * This function includes the HTML templates in the page
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * This function hightlights the active link in the menus
 */
function highlightActiveLink() {
    let activeLinkHref = location.pathname.slice(1);
    let activeLinkElements = document.querySelectorAll(`a[href="${activeLinkHref}"]`);
    for (let i = 0; i < activeLinkElements.length; i++) {
        let element = activeLinkElements[i];
        if (!element.classList.contains('logo-link')) {
            element.classList.add('active');
        }
    }
}


/**
 * This function initializes the page by including the HTML templates and highlighting the active link in the menus
 */
async function init() {
    await includeHTML();
    highlightActiveLink();
    showUserInitials();
}


/**
 * This function is used to sort users or contacts by first name
 * @param {Object} a first contact for comparison
 * @param {Object} b second contact for comparison
 * @returns {number} number that the sort function expects
 */
function sortByFirstName(a, b) {
    firstNameA = a.firstName.toLowerCase();
    firstNameB = b.firstName.toLowerCase();
    if (firstNameA < firstNameB) {
        return -1;
    }
    if (firstNameA > firstNameB) {
        return 1;
    }
    return 0;
}


/**
 * This function returns a random user color.
 * @returns {string} random user color, values ranging from user-color0 to user-color14
 */
function getUsercolor() {
    let colorNumber = Math.floor(Math.random() * 15);
    return `user-color${colorNumber}`;
}



function showUserInitials() {
    document.getElementById('firstname-first-character').innerHTML = loadVariableFromLocalStorage('currentJoinUserFirstCharacterFirstName');
    document.getElementById('lastname-first-character').innerHTML = loadVariableFromLocalStorage('currentJoinUserFirstCharacterLastName');
}


const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let faviconElement = document.getElementById('favicon-icon');


/**
 * This function changes the href attribute of the favicon element
 * @param {string} href 
 */
function changeFavicon(href) {
    faviconElement.setAttribute('href', href);
}


/**
 * This function checks if dark mode is enabled and exchanges the href of the favicon accordingly
 * @param {boolean} isDarkModeOn 
 */
function checkForDarkMode(isDarkModeOn) {
    if (isDarkModeOn) {
        changeFavicon('./assets/img/light-logo.svg');
      } else {
        changeFavicon('./assets/img/dark-logo.svg');
      }
}

// Call checkForDarkMode every time script.js is loaded
checkForDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);


// When the user changes the theme preference setting, call checkForDarkMode again
darkModeMediaQuery.addEventListener('change', (event) => {
    const isDarkModeOn = event.matches;
    checkForDarkMode(isDarkModeOn);
    // console.log(`Dark mode is ${isDarkModeOn ? '🌒 on' : '☀️ off'}.`);
});


// /**
//  * This function opens or closes the drop down menu in the header.
//  */
function showHideDropDownMenu() {
    let nav = document.getElementById('drop-down-menu');
    if (navIsClosed(nav)) {
        openNav(nav);
    } else {
        closeNav(nav);
    }
}


/**
 * This function returns true, when the drop down menu is hidden.
 * @param {Element} nav 
 * @returns boolean
 */
function navIsClosed(nav) {
    return nav.classList.contains('display-none')
}


/**
 * This function shows the drop down menu, by removing the class "display-none"
 * @param {Element} nav 
 */
function openNav(nav) {
    let header = document.querySelector('header');
    headerStyles = window.getComputedStyle(header);
    headerHeight = headerStyles.getPropertyValue('height');
    nav.style.top = `${headerHeight}`;
    nav.classList.remove('display-none')
}


/**
 * This function hides the drop down menu, by adding the class "display-none"
 * @param {Element} nav 
 */
function closeNav(nav) {
    nav.classList.add('display-none')
}

/**
 * This function closes the assigned to drop-down list by clicking the outside the list.
 */

function closeAssignedToList() {
    let assignedTo = document.getElementById('add-task-assigned-to');
    assignedTo.classList.add('display-none');
}

/**
 * This function closes the assigned to drop-down list by clicking the outside the list.
 */

function closeEditAssignedToList() {
    let editAssignedTo = document.getElementById('edit-task-assigned-to');
    editAssignedTo.classList.add('display-none');
}

/**
 * This function is used to prevent the container from being closed
 * @param {*} event 
 */

function doNotClose(event) {
    event.stopPropagation();
}