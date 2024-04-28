/**
 * This function initializes the contacts page by calling init() and rendering all contacts
 */
async function initContacts() {
    await init();
    renderContacts();
}


/**
 * This function generates an HTML template for the letter that is used as a heading for contacts with first names beginning with the same letter
 * @param {string} letter 
 * @returns {string} contact letter HTML template
 */
function contactLetterTemplate(letter) {
    return /* html */ `<div class="contact-letter">${letter}</div>
                        <div class="contacts-separator-container">
                            <hr>
                        </div>`;
}


/**
 * This function generates an HTML template for the contact in the contacts list
 * @param {Object} contact 
 * @param {string} userColor 
 * @returns 
 */
function contactInListTemplate(contact, contactColor, contactIndex) {
    return /* html */ `<div class="contact-in-list cursor-pointer" onclick="openContact(${contactIndex})">
        <div class="contact-initial-avatar-small ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
        <div class="contact-in-list-info">
            <div>${contact.firstName} ${contact.lastName}</div>
            <a href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
    </div>`;
}


/**
 * This function returns a random user color
 * @returns {string} random user color, values ranging from user-color0 to user-color14
 */
function generateRandomUserColor() {
    return `user-color${Math.floor(Math.random() * (14 - 0) + 0)}`;
}


/**
 * This function is used to sort the contacts by first name
 * @param {Object} a first contact for comparison
 * @param {Object} b second contact for comparison
 * @returns {number} number that the sort function expects
 */
function sortContactsByFirstName(a, b) {
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
 * This function searches for a user with the same e-mail address as the contact and returns the user's color if there is a match or returns the contact's color if there is none
 * @param {Object} contact 
 * @returns {string} desired contact color
 */
function getContactColor(contact) {
    let foundUser = users.find(user => user.eMail === contact.eMail);
    if (foundUser) {
        return foundUser.color;
    } else {
        return contact.color;
    }
}


/**
 * This function renders the first letter of the first name of a contact if the letter has not been rendered yet
 * @param {Object} contact 
 * @param {Array} renderedLetters letters that have already been rendered
 */
function renderLetterIfItHasNotBeenRendered(contact, renderedLetters) {
    let contactList = document.getElementById('contact-list');
    let letter = contact.firstName.charAt(0);
    if (renderedLetters.find(renderedLetter => renderedLetter === letter) === undefined) {
        contactList.innerHTML += contactLetterTemplate(letter);
        renderedLetters.push(letter);
    }
}


/**
 * This function renders the contact list
 */
function renderContacts() {
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    let renderedLetters = [];
    contacts = contacts.sort((a, b) => sortContactsByFirstName(a, b));
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        renderLetterIfItHasNotBeenRendered(contact, renderedLetters);
        let contactColor = getContactColor(contact);
        contactList.innerHTML += contactInListTemplate(contact, contactColor, i);
    }
}


/**
 * This function finds the user with the matching e-mail address
 * @param {string} eMail e-mail address
 * @returns {number} id of the user with the e-mail adress
 */
function getUserIdFromEMail(eMail) {
    let user = users.find(user => user.eMail === eMail);
    if (user) {
        return user.id;
    }
}


/**
 * This function removes a contact from the tasks assigned to it
 * @param {string} contactEMail e-mail adress of the contact
 */
function removeUserFromAssignedTasks(contactEMail) {
    let userId = getUserIdFromEMail(contactEMail);
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let collaborators = task.collaborators;
        let collaboratorIndex = collaborators.indexOf(userId);
        if (collaboratorIndex > -1) {
            collaborators.splice(collaboratorIndex, 1);
        }
    }
}


/**
 * This function deletes a contact
 * @param {string} contactEMail e-mail adress of the contact
 */
function deleteContact(contactEMail) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let contactIndex = contacts.indexOf(contact);
    if (contactIndex > -1) {
        contacts.splice(contactIndex, 1);
    }
    removeUserFromAssignedTasks(contactEMail);
    renderContacts();
    let contactProfile = document.getElementById('contact-profile');
    contactProfile.innerHTML = '';
}


/**
 * This function generates a contact profile HTML template
 * @param {Object} contact 
 * @param {string} contactColor
 * @returns {string} contact profile HTML template
 */
function contactProfileTemplate(contact, contactColor) {
    return /* html */ `
    <div class="contact-profile-header">
        <div class="contact-initial-avatar-large ${contactColor}">${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}</div>
            <div class="contact-name-and-buttons-container">
                <h3>${contact.firstName} ${contact.lastName}</h3>
                <div class="contact-buttons">
                    <div class="contact-button">
                        <img src="assets/img/contact-edit-button-icon.svg" alt="contact edit button icon">
                        <span>Edit</span>
                    </div>
                    <div class="contact-button cursor-pointer" onclick="deleteContact('${contact.eMail}')">
                        <img src="assets/img/contact-delete-button-icon.svg" alt="contact delete button icon">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
    <div class="contact-information-heading">Contact information</div>
    <div class="contact-information-facts-container">
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Email</div>
            <a href="mailto:${contact.eMail}">${contact.eMail}</a>
        </div>
        <div class="contact-information-fact">
            <div class="contact-information-fact-heading">Phone</div>
            <div>${contact.phone}</div>
        </div>
    </div>
    `;
}


/**
 * This function opens a contact from the list
 * @param {number} index 
 */
function openContact(index) {
    let contact = contacts[index];
    let contactProfile = document.getElementById('contact-profile');
    let contactColor = getContactColor(contact);
    contactProfile.innerHTML = contactProfileTemplate(contact, contactColor);
}