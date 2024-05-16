let isContactOpen;

/**
 * This function initializes the contacts page by calling init() and rendering all contacts.
 */
async function initContacts() {
    checkForLogin();
    await init();
    await Promise.all([loadUsers(), loadTasks(), loadContacts()]);
    renderContacts();
}


/**
 * This function searches for a user with the same e-mail address as the contact and returns the user's color if there is a match or returns the contact's color if there is none.
 * @param {Object} contactEMail e-mail address of a contact .
 * @returns {string} desired contact color.
 */
function getContactColor(contactEMail) {
    let foundUser = users.find(user => user.eMail === contactEMail);
    if (foundUser) {
        return foundUser.color;
    } else {
        let contact = contacts.find(contact => contact.eMail === contactEMail);
        return contact.color;
    }
}


/**
 * This function renders the first letter of the first name of a contact if the letter has not been rendered yet.
 * @param {Object} contact 
 * @param {Array} renderedLetters letters that have already been rendered.
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
 * This function renders the contact list.
 */
function renderContacts() {
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    let renderedLetters = [];
    contacts = contacts.sort((a, b) => sortByFirstName(a, b));
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        renderLetterIfItHasNotBeenRendered(contact, renderedLetters);
        let contactColor = getContactColor(contact.eMail);
        let suffix = getUserNameSuffix(contact);
        contactList.innerHTML += contactInListTemplate(contact, contactColor, i, suffix);
    }
}


/**
 * This function removes a contact from the tasks assigned to it.
 * @param {number} contactId id of the contact.
 */
function removeUserFromAssignedTasks(contactId) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let collaborators = task.collaborators;
        let collaboratorIndex = collaborators.indexOf(contactId);
        if (collaboratorIndex > -1) {
            collaborators.splice(collaboratorIndex, 1);
        }
    }
}


/**
 * This functions finds a contact using an id and if there is such a contact, it removes the contact from the contacts array.
 * @param {number} contactId 
 */
function findAndSpliceContact(contactId) {
    let contact = contacts.find(contact => contact.id === contactId);
    let contactIndex = contacts.indexOf(contact);
    if (contactIndex > -1) {
        contacts.splice(contactIndex, 1);
    }
}


/**
 * This function deletes a contact.
 * @param {Event} event
 * @param {number} contactId id of the contact.
 */
async function deleteContact(event, contactId) {
    disableButton(event.target.id);
    findAndSpliceContact(contactId);
    removeUserFromAssignedTasks(contactId);
    await Promise.all([storeTasks(), storeContacts()]);
    renderContacts();
    let contactProfile = document.getElementById('contact-profile');
    contactProfile.innerHTML = '';
    removePopup('edit-add-contact-pop-up');
    isContactOpen = false;
    showAppropriateElements();
}


/**
 * This function opens a contact from the list.
 * @param {number} index contact index.
 */
function openContact(index) {
    let contact = contacts[index];
    let contactProfile = document.getElementById('contact-profile');
    let contactColor = getContactColor(contact.eMail);
    contactProfile.innerHTML = contactProfileTemplate(contact, contactColor, index);
    setActiveContact(index);
    if (isWidthSmallerThanXPixels(1280)) {
        changeDisplayProperty('.contacts-left-side', 'none');
        changeDisplayProperty('.contacts-right-side', 'block');
    }
    isContactOpen = true;
    showAppropriateElements();
    document.getElementById('contacts-more-button').setAttribute('onclick', `openMoreMenu(${index}, '${contact.id}')`);
}


/**
 * This function changes the style of a contact when it is active and removes the active style from all other contacts.
 * @param {number} index index of a contact in the contacts array.
 */
function setActiveContact(index) {
    let contacts = document.querySelectorAll('.contact-in-list-active');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('contact-in-list-active');
    }
    let contact = document.getElementById(`contact-in-list${index}`);
    contact.classList.add('contact-in-list-active');
}


/**
 * This function gets the input values for creating a contact and creates a contact object and
 * @returns {Object} the new contact.
 */
function createNewContact() {
    let name = document.getElementById('contact-name-input').value;
    let email = document.getElementById('contact-email-input').value;
    let phone = document.getElementById('contact-phone-input').value;
    let color = getUserColor();
    let newContact = createContactObject(name, email, phone, color);
    return newContact;
}


/**
 * This function performs actions for saving a contact after it has been edited.
 * @param {*} index index of a contact in the contacts array.
 */
function saveEditedContactHelper(index) {
    let name = document.getElementById('contact-name-input').value;
    let email = document.getElementById('contact-email-input').value;
    let phone = document.getElementById('contact-phone-input').value;
    let foundContact = contacts[index];
    if (foundContact) {
        foundContact.firstName = getUserName('first', name);
        foundContact.lastName = getUserName('last', name);
        foundContact.eMail = email;
        foundContact.phone = phone;
    } else {
        let editedContact = createContactObject(name, email, phone, color);
        contacts.push(editedContact);
    }
}


/**
 * This function saves a contact after it has been edited.
 * @param {number} index index of a contact in the contacts array.
 */
function saveEditedContact(index) {
    disableButton('save-contact-button');
    saveEditedContactHelper(index);
    storeContacts();
    renderContacts();
    openContact(index);
    removePopup('edit-add-contact-pop-up');
}


/**
 * This function adds a contact to the list of contacts.
 */
function addContact() {
    disableButton('create-contact-button');
    let newContact = createNewContact();
    contacts.push(newContact);
    storeContacts();
    renderContacts();
    let contactIndex = contacts.indexOf(newContact);
    openContact(contactIndex);
    removePopup('edit-add-contact-pop-up');
    animateSuccessMessage();
}


/**
 * This function shows the appropriate elements when a contact has been opened and the screen is small.
 */
function onContactIsOpenOnSmallScreen() {
    changeDisplayProperty('.contacts-left-side', 'none');
    changeDisplayProperty('.contacts-right-side', 'block');
    changeDisplayProperty('.contacts-more-button', 'flex');
    changeDisplayProperty('#back-link', 'flex');
}


/**
 * This function shows the appropriate elements when a contact has been opened and the screen is large.
 */
function onContactIsOpenOnLargeScreen() {
    changeDisplayProperty('.contacts-left-side', 'block');
    changeDisplayProperty('.add-contact-button-mobile', 'none');
    changeDisplayProperty('.contacts-more-button', 'none');
    changeDisplayProperty('#back-link', 'none');
}


/**
 * This function shows the appropriate elements when no contact has been opened and the screen is small.
 */
function onContactIsNotOpenOnSmallScreen() {
    changeDisplayProperty('.add-contact-button-mobile', 'flex');
    changeDisplayProperty('.contacts-more-button', 'none');
    changeDisplayProperty('.contacts-right-side', 'none');
    changeDisplayProperty('.contacts-left-side', 'block');
}


/**
 * This function shows the appropriate elements when no contact been opened and the screen is large.
 */
function onContactIsNotOpenOnLargeScreen() {
    changeDisplayProperty('.contacts-left-side', 'block');
    changeDisplayProperty('.contacts-right-side', 'block');
    changeDisplayProperty('.add-contact-button-mobile', 'none');
    changeDisplayProperty('.contacts-more-button', 'none');
}


/**
 * This function shows the appropriate elements depending on the width of the screen and whether a contact has been opened or not.
 */
function showAppropriateElements() {
    if (isContactOpen) {
        if (isWidthSmallerThanXPixels(1280)) {
            onContactIsOpenOnSmallScreen();
        } else {
            onContactIsOpenOnLargeScreen();
        }
    } else {
        if (isWidthSmallerThanXPixels(1280)) {
            onContactIsNotOpenOnSmallScreen();
        } else {
            onContactIsNotOpenOnLargeScreen();
        }
    }
}


/**
 * This event listener displays the appropriate content for the contacts page depending on whether the device has a small screen or a larger screen.
 */
window.addEventListener('resize', showAppropriateElements);