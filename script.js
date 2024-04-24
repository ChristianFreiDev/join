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
}


/**
 * This function changes the fav icon between light- and dark mode, but only work on firefox.
 */
// let lightSchemeIcon = document.getElementById('light-scheme-icon');
// let darkSchemeIcon = document.getElementById('dark-scheme-icon');
// const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// let faviconElement = document.querySelector("link[rel='shortcut icon']");

// darkModeMediaQuery.addEventListener('change', (e) => {
//   const darkModeOn = e.matches;
//   if (darkModeOn) {
//     lightSchemeIcon.remove();
//     document.head.append(darkSchemeIcon);
//   } else {
//     document.head.append(lightSchemeIcon);
//     darkSchemeIcon.remove();
//   }
//   console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
// });

// darkModeMediaQuery.addEventListener('change', (e) => {
//     const darkModeOn = e.matches;
//     if (darkModeOn) {
//       changeFavicon(darkSchemeIcon.href);
//     } else {
//       changeFavicon(lightSchemeIcon.href);
//     }
//     console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
//   });

// function changeFavicon(href) {
//     // Remove existing favicon
//     if (faviconElement) {
//       faviconElement.remove();
//     }
//     // Create new favicon link element
//     const newFaviconElement = document.createElement('link');
//     newFaviconElement.rel = 'shortcut icon';
//     newFaviconElement.href = href;
//     newFaviconElement.type = 'image/x-icon';
//     document.head.appendChild(newFaviconElement);
//     faviconElement = newFaviconElement; // Update reference to the new favicon element
//   }



// let lightSchemeIcon = document.getElementById('light-scheme-icon');
// let darkSchemeIcon = document.getElementById('dark-scheme-icon');
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let faviconElement = document.getElementById('favicon-icon');

darkModeMediaQuery.addEventListener('change', (e) => {
  const darkModeOn = e.matches;
  if (window.matchMedia && darkModeOn) {
    changeFavicon('./assets/img/light-logo.svg');
  } else {
    changeFavicon('./assets/img/dark-logo.svg');
  }
  console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
});

function changeFavicon(href) {
  faviconElement.setAttribute('href', href);
}

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