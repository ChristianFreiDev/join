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
 * @param {DOM-Element} nav 
 * @returns boolean
 */
function navIsClosed(nav) {
    return nav.classList.contains('display-none')
}


/**
 * This function shows the drop down menu, by removing the class "display-none"
 * @param {DOM-Element} nav 
 */
function openNav(nav) {
    nav.classList.remove('display-none')
}


/**
 * This function hides the drop down menu, by adding the class "display-none"
 * @param {DOM-Element} nav 
 */
function closeNav(nav) {
    nav.classList.add('display-none')
}