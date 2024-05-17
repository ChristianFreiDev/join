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
 * This function gets the id of the remembered user from local storage.
 * 
 * @returns the remembered user id.
 */
function rememberedUser() {
    return loadVariableFromLocalStorage('rememberUserId');
}


/**
 * This function gets the id of the current user from local storage.
 * 
 * @returns the current user id.
 */
function getCurrentJoinUserId() {
    return loadVariableFromLocalStorage('currentJoinUserId');
}


/**
 * This function gets the user e-mail address that matches that of the user with the id from the parameter.
 * @param {number} id 
 * @returns {string} user e-mail address or empty string
 */
function getUserEmailFromId(id) {
    let foundUser = users.find(user => user.id == id);
    if (foundUser) {
        return foundUser.eMail;
    } else {
        return '';
    }
}


/**
 * This function gets the e-mail adress of the user that is currently logged in.
 * @returns {string} user e-mail address or empty string
 */
function getCurrentUserEmail() {
    let currentJoinUserId = getCurrentJoinUserId();
    if (currentJoinUserId) {
        return getUserEmailFromId(currentJoinUserId);
    } else {
        return '';
    }
}


/**
 * This function determines if ' (You)' should be appended to the user name.
 * This should be the case if the user is the user that is currently logged in.
 * @returns {string} ' (You)' or an empty string
 */
function getUserNameSuffix(user) {
    let rememberedUserEmail = getCurrentUserEmail();
    let suffix;
    if (rememberedUserEmail === user.eMail) {
        suffix = ' (You)';
    } else {
        suffix = '';
    }
    return suffix;
}


/**
 * This function grabs the initials of a user.
 * @param {Object} userOrContact 
 * @returns {string} initial string
 */
function getInitials(userOrContact) {
    let initials = userOrContact.firstName.charAt(0) + userOrContact.lastName.charAt(0);
    return initials;
}


/**
 * This function returns a random user color.
 * @returns {string} random user color, values ranging from user-color0 to user-color14
 */
function getUserColor() {
    let colorNumber = Math.floor(Math.random() * 15);
    return `user-color${colorNumber}`;
}


function getUserName(type, name) {
    name = name.trim();
    let whitespaces = [];
    let firstName = '';
    let firstNames = [];
    let lastName = '';
    let whitspaceCounter = 0;
    do {
        if (whitespaces.length === 0) {
            whitespaces.push(name.indexOf(' '));
        } else if (name[whitespaces[whitespaces.length - 1] + whitspaceCounter] != ' ') {
            whitespaces.push(name.indexOf(' ', whitespaces[whitespaces.length - 1] + 1 + whitspaceCounter));
            whitspaceCounter = 0;
        } else {
            whitspaceCounter++;
        }
    }
    while (whitespaces[whitespaces.length - 1] != -1);
    if (whitespaces.length <= 1) {
        if (type === 'first') {
            return formatStringAsName(name);
        } else if (type === 'last') {
            return ''
        }
    } else if (whitespaces.length === 2) {
        if (type === 'first') {
            return formatStringAsName(name.slice(0, whitespaces[0]));
        } else if (type === 'last') {
            return formatStringAsName(name.slice(whitespaces[0] + 1, name.length));
        }
    } else {
        for (let i = 0; i < whitespaces.length; i++) {
            if (i === 0) {
                firstNames.push(formatStringAsName(name.slice(0, whitespaces[0])));
            } else if (i < whitespaces.length - 2) {
                firstNames.push(formatStringAsName(name.slice(whitespaces[i - 1] + 1, whitespaces[i] + 1)));
            } else if (i == whitespaces.length - 2) {
                firstNames.push(formatStringAsName(name.slice(whitespaces[i - 1] + 1, whitespaces[i])));
            } else {
                lastName += formatStringAsName(name.slice(whitespaces[i - 1] + 1, name.length));
            }
        }
        firstName = firstNames.toString().replace(',', ' ');
        if (type === 'first') {
            return firstName;
        } else if (type === 'last') {
            return lastName;
        }
    }
}


function formatStringAsName(name) {
    return name.trim().charAt(0).toLocaleUpperCase() + name.trim().slice(1, name.length).toLocaleLowerCase();
}



function checkForLogin(protected = true) {
    if ((loadVariableFromLocalStorage('currentJoinUserId') < 0 || !loadVariableFromLocalStorage('currentJoinUserId')) && protected) {
        window.open('./index.html', '_self');
    } else if ((loadVariableFromLocalStorage('currentJoinUserId') < 0 || !loadVariableFromLocalStorage('currentJoinUserId')) && !protected) {
        document.querySelector('.nav-button-list').classList.add('display-none');
        document.getElementById('mobile-menu').classList.add('display-none');
        document.querySelector('.header-img-box').classList.add('display-none');
    }
}


function hideMenu() {
    if ((loadVariableFromLocalStorage('currentJoinUserId') < 0 || !loadVariableFromLocalStorage('currentJoinUserId')) && protected) {
        document.querySelector('nav-button-list').classList.add('display-none');
        document.querySelector('mobil-nav-button-list').classList.add('display-none');
    }
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


/**
 * This function creates a contact object.
 * 
 * @param {string} name
 * @param {string} email 
 * @param {string} phone 
 * @returns {object} created based on user data.
 */
function createContactObject(name, email, phone, color) {
    let firstName = getUserName('first', name);
    let lastName = getUserName('last', name);
    let id = getHighestId(contacts) + 1;
    return {
        firstName: firstName,
        lastName: lastName,
        id: id,
        color: color,
        eMail: email,
        phone: phone
    };
}


/**
 * This event listener serves to remove a pop-up when the Escape key is pressed.
 */
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        removePopups();
    }
})


async function initNotProtectedPage() {
    await init();
    checkForLogin(false);
}

function logout() {
    saveVariableInLocalStorage('rememberUserId', false);
    window.open('./index.html', '_self');
}