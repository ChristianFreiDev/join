/**
 * This function signs up a user.
 */
async function signup() {
    document.getElementById('signup-button').disabled = true;
    await checkSignupValues();
    document.getElementById('signup-button').disabled = false;
}


/**
 * This function checks the entered values for sign-up and gives the user feedback.
 */
async function checkSignupValues() {
    let name = document.getElementById('signup-name-input').value;
    let email = document.getElementById('signup-email-input').value;
    let password = document.getElementById('signup-password-input').value;
    let passwordConfirm = document.getElementById('signup-password-confirm-input').value;
    if (password === passwordConfirm) {
        await loadUsers();
        await validateUser(name, email, password);
    } else {
        document.querySelector('#signup-password-confirm-input ~ p').classList.remove('display-none');
    }
}


/**
 * This function checks if the entered e-mail address already exists and registers the user if that is not the case.
 * If the e-mail address already exists, the function gives the user feedback.
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
async function validateUser(name, email, password) {
    let emailAlreadyExists = checkEmailForSignup(email);
    let color = getUserColor();
    let userObject = createUserObject(name, email, password, color);
    if (!emailAlreadyExists) {
        await resetUsersTasksContacts();
        useOfflineData();
        await signupUser(userObject);
        let phone = '';
        let newContact = createContactObject(name, email, phone, color);
        await loadContacts();
        contacts.push(newContact);
        storeContacts();
    }
}


/**
 * This function pushes the incoming object into the users array,
 * stores the users array and gives the user feedback that the user has signed up successfully.
 * 
 * @param {object} userObject 
 */
async function signupUser(userObject) {
    users.push(userObject);
    await storeUsers();
    showSuccessMessage();
    setTimeout(hideSuccessMessage, 1000);
}


/**
 * This function checks if the e-mail address already exists in the users array.
 * 
 * @param {string} email 
 * @returns {boolean} true if an e-mail address was found.
 */
function checkEmailForSignup(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].eMail === email.toLocaleLowerCase()) {
            document.querySelector('#signup-email-input ~ p').classList.remove('display-none');
            document.querySelector('#signup-password-confirm-input ~ p').classList.add('display-none');
            return true;
        }
    }
    return false;
}


/**
 * This function animates the success message for sign-up.
 */
function showSuccessMessage() {
    document.querySelector('body').style.position = 'relative';
    let overlay = document.getElementById('login-overlay');
    let message = document.querySelector('.signupSuccessMessage');
    overlay.classList.remove('animate-overlay');
    overlay.classList.add('signup-overlay');
    message.classList.add('signupSuccessMessageCenter');
}


/**
 * This function hides the success message for sign-up.
 */
function hideSuccessMessage() {
    let overlay = document.getElementById('login-overlay');
    let message = document.querySelector('.signupSuccessMessage');
    overlay.classList.remove('signup-overlay');
    message.classList.remove('signupSuccessMessageCenter');
    clearSignupField();
    openLogInMenu();
}


/**
 * This function creates a user object.
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {Object} created based on user data.
 */
function createUserObject(name, email, password, color) {
    let firstName = getUserName('first', name);
    let lastName = getUserName('last', name);
    let id = getHighestId(users) + 1;
    return {
        firstName: firstName,
        lastName: lastName,
        id: id,
        color: color,
        password: `${password}`,
        eMail: `${email}`
    };
}


/**
 *  This function opens the login menu and hides the sign-up menu by adding and removing the class "display-none".
 */
function openLogInMenu() {
    document.getElementById('login-field').classList.remove('display-none');
    document.getElementById('login-signup-box-footer').classList.remove('display-none');
    document.getElementById('login-signup-box-header').classList.remove('display-none');
    clearSignupField();
    closeSignupFailureMessages();
    document.getElementById('signup-feld').classList.add('display-none');
}


/**
 * This function clears the inputs in the sign-up fields.
 */
function clearSignupField() {
    document.getElementById('signup-name-input').value = '';
    document.getElementById('signup-email-input').value = '';
    document.getElementById('signup-password-input').value = '';
    document.getElementById('signup-password-confirm-input').value = '';
}


 /**
  * This function hides the failure messages in the sign-up field by adding the class "display-none".
  */
function closeSignupFailureMessages() {
    document.querySelector('#signup-email-input ~ p').classList.add('display-none');
    document.querySelector('#signup-password-confirm-input ~ p').classList.add('display-none');
}