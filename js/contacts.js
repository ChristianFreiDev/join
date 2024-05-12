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
 * @param {Object} contact 
 * @returns {string} desired contact color
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
 * This function finds the user with the matching e-mail address.
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
 * This function removes a contact from the tasks assigned to it.
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


function editContact(contactEMail, index) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let openEditAddContactPopup = document.getElementById('edit-add-contact-pop-up');
    openEditAddContactPopup.setAttribute('onclick', 'doNotClose(event)');
    openEditAddContactPopup.innerHTML = contactEditForm(contact, index);
    centerPopup('edit-add-contact-pop-up');
}


function openAddContactPopup(contactEMail, index) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let openEditAddContactPopup = document.getElementById('edit-add-contact-pop-up');
    openEditAddContactPopup.setAttribute('onclick', 'doNotClose(event)');
    openEditAddContactPopup.innerHTML = addContactForm(contact, index);
    centerPopup('edit-add-contact-pop-up');
}


/**
 * This function deletes a contact.
 * @param {string} contactEMail e-mail adress of the contact
 */
async function deleteContact(contactEMail) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let contactIndex = contacts.indexOf(contact);
    if (contactIndex > -1) {
        contacts.splice(contactIndex, 1);
    }
    removeUserFromAssignedTasks(contactEMail);
    await Promise.all([storeTasks(), storeContacts()]);
    renderContacts();
    let contactProfile = document.getElementById('contact-profile');
    contactProfile.innerHTML = '';
    removePopup('edit-add-contact-pop-up');
    isContactOpen = false;
    showAppropriateElements();
}


/**
 * This function hides the left side of the contacts page and shows the right side.
 */
function hideLeftSideAndShowRightSide() {
    let contactsLeftSide = document.querySelector('.contacts-left-side');
    contactsLeftSide.style.display = 'none';
    let contactsRightSide = document.querySelector('.contacts-right-side');
    contactsRightSide.style.display = 'block';
}


/**
 * This function hides the right side of the contacts page and shows the left side.
 */
function hideRightSideAndShowLeftSide() {
    showLeftSide();
    let contactsRightSide = document.querySelector('.contacts-right-side');
    contactsRightSide.style.display = 'none';
}


/**
 * This function shows the left side of the contacts page.
 */
function showLeftSide() {
    let contactsLeftSide = document.querySelector('.contacts-left-side');
    contactsLeftSide.style.display = 'block';
}


/**
 * This function shows the right side of the contacts page.
 */
function showRightSide() {
    let contactsRigthSide = document.querySelector('.contacts-right-side');
    contactsRigthSide.style.display = 'block';
}


/**
 * This function shows both sides of the contacts page.
 */
function showBothSides() {
    showLeftSide();
    showRightSide();
}


/**
 * This function hides or shows the link for returning to the contacts page.
 * @param {string} displayProperty 
 */
function hideOrShowBackLink(displayProperty) {
    let backLink = document.getElementById('back-link');
    backLink.style.display = displayProperty;
}


/**
 * This function changes the display property of the "more" button.
 */
function changeDisplayOfContactsMoreButton(displayProperty) {
    let button = document.querySelector('.contacts-more-button');
    button.style.display = displayProperty;
}


/**
 * This function changes the display property of the button for adding a contact on mobile devices.
 */
function changeDisplayOfAddContactButtonMobile(displayProperty) {
    let button = document.querySelector('.add-contact-button-mobile');
    button.style.display = displayProperty;
}


/**
 * This function opens a contact from the list.
 * @param {number} index contact index
 */
function openContact(index) {
    let contact = contacts[index];
    let contactProfile = document.getElementById('contact-profile');
    let contactColor = getContactColor(contact.eMail);
    contactProfile.innerHTML = contactProfileTemplate(contact, contactColor, index);
    setActiveContact(index);
    if (isWidthSmallerThanXPixels(1280)) {
        hideLeftSideAndShowRightSide();
    }
    isContactOpen = true;
    showAppropriateElements();
}


function setActiveContact(index) {
    let contacts = document.querySelectorAll('.contact-in-list-active');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('contact-in-list-active');
    }
    let contact = document.getElementById(`contact-in-list${index}`);
    contact.classList.add('contact-in-list-active');
}


function saveEditedContact(index) {
    let contactNameInput = document.getElementById('contact-name-input');
    let contactEmailInput = document.getElementById('contact-email-input');
    let contactPhoneInput = document.getElementById('contact-phone-input');
    let name = contactNameInput.value;
    let email = contactEmailInput.value;
    let phone = contactPhoneInput.value;
    let color = getUserColor();
    let editedContact = createContactObject(name, email, phone, color);
    let foundContact = contacts[index];
    if (foundContact) {
        foundContact.firstName = getUserName('first', name);
        foundContact.lastName = getUserName('last', name);
        foundContact.eMail = email;
        foundContact.phone = phone;
    } else {
        contacts.push(editedContact);
    }
    storeContacts();
    renderContacts();
    openContact(index);
    removePopup('edit-add-contact-pop-up');
}


function addContact() {
    let contactNameInput = document.getElementById('contact-name-input');
    let contactEmailInput = document.getElementById('contact-email-input');
    let contactPhoneInput = document.getElementById('contact-phone-input');
    let name = contactNameInput.value;
    let email = contactEmailInput.value;
    let phone = contactPhoneInput.value;
    let color = getUserColor();
    let newContact = createContactObject(name, email, phone, color);
    contacts.push(newContact);
    storeContacts();
    renderContacts();
    let contactIndex = contacts.indexOf(newContact);
    openContact(contactIndex);
    removePopup('edit-add-contact-pop-up');
    animateSuccessMessage();
}


function animateSuccessMessage() {
    document.querySelector('.contactsSuccessMessage').classList.add('contactsSuccessMessageMoveIn');
    setTimeout(removeAnimationSuccessMessage, 1300);
}

function removeAnimationSuccessMessage() {
    document.querySelector('.contactsSuccessMessage').classList.add('contactsSuccessMessageMoveOut');
    document.querySelector('.contactsSuccessMessage').classList.remove('contactsSuccessMessageMoveIn');
    setTimeout(endAnimationSuccessMessage, 800);
}

function endAnimationSuccessMessage() {
    document.querySelector('.contactsSuccessMessage').classList.remove('contactsSuccessMessageMoveOut');

}


/**
 * This function shows the appropriate elements depending on the width of the screen and whether a contact has been opened or not.
 */
function showAppropriateElements() {
    if (isContactOpen) {
        if (isWidthSmallerThanXPixels(1280)) {
            hideLeftSideAndShowRightSide();
            changeDisplayOfContactsMoreButton('flex');
            hideOrShowBackLink('flex');
        } else {
            showLeftSide();
            changeDisplayOfAddContactButtonMobile('none');
            changeDisplayOfContactsMoreButton('none');
            hideOrShowBackLink('none');
        }
    } else {
        if (isWidthSmallerThanXPixels(1280)) {
            changeDisplayOfAddContactButtonMobile('flex');
            changeDisplayOfContactsMoreButton('none');
            hideRightSideAndShowLeftSide();
        } else {
            showBothSides();
            changeDisplayOfAddContactButtonMobile('none');
            changeDisplayOfContactsMoreButton('none');
        }
    }
}


/**
 * This event listener displays the appropriate content for the contacts page depending on whether the device has a small screen or a larger screen.
 */
window.addEventListener('resize', showAppropriateElements);