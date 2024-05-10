let loggedIn = false;


async function initIndex() {
    document.getElementById('login-overlay').classList.add('animate-overlay');
    document.getElementById('login-logo').classList.add('animate-logo');
    await loadUsers();
    saveVariableInLocalStorage('currentJoinUserId', -1);
    checkForRememberedUser();
    saveVariableInLocalStorage('currentJoinUserFirstCharacterFirstName', 'G');
    saveVariableInLocalStorage('currentJoinUserFirstCharacterLastName', '');
    changePasswordVisibility('login-password-icon', 'login-password-input', true);
    saveVariableInLocalStorage('fromIndex', true);
}


/**
 * This function checks if a user is remembered and if it is true, it fills the login fields with the user's data.
 */
function checkForRememberedUser() {
    if (rememberedUser()) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == rememberedUser()) {
                document.getElementById('login-email-input').value = users[i].eMail;
                document.getElementById('login-password-input').value = users[i].password;
                document.getElementById('login-checkbox').checked = true;
            }
        }
    }
}


/**
 * This function gets the id of the remembered user from local storage.
 * 
 * @returns the remembered user id.
 */
function rememberedUser() {
    return loadVariableFromLocalStorage('rememberUserId');
}

// async function init(){
//     loadUsers();
// }



async function register() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}



function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}


/**
 *  This function opens the sign-up menu and hides the login menu by adding and removing the class "display-none".
 */
function openSignUpMenu(email = false) {
    document.getElementById('login-feld').classList.add('display-none');
    document.getElementById('login-signup-box-footer').classList.add('display-none');
    document.getElementById('login-signup-box-header').classList.add('display-none');
    document.getElementById('signup-feld').classList.remove('display-none');
    if (email) {
        document.getElementById('signup-email-input').value = `${email}`;
    }
}


/**
 *  This function opens the login menu and hides the sign-up menu by adding and removing the class "display-none".
 */
function openLogInMenu() {
    document.getElementById('login-feld').classList.remove('display-none');
    document.getElementById('login-signup-box-footer').classList.remove('display-none');
    document.getElementById('login-signup-box-header').classList.remove('display-none');
    document.getElementById('signup-feld').classList.add('display-none');
}


/**
 * This function logs in the user or a guest and gives the user feedback if the user's data was wrong.
 * 
 * @param {Boolean} guest 
 */
function login(guest = false) {
    if (guest) {
        setRememberMeValues(guest, 0);
        saveVariableInLocalStorage('currentJoinUserId', 0);
        goToSummary();
    } else {
        checkUserValues();
        if (loggedIn) {
            goToSummary();
        }
    }
}


function checkEmail(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].eMail === email) {
            return false;
        }
    }
    return true
}

function checkPassword(password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].password === password) {
            return false;
        }
    }
    return true
}


/**
 * This function checks the input values and saves a user's data to local storage if the user has been logged in successfully and wants to be remembered.
 */
function checkUserValues() {
    let email = document.getElementById('login-email-input').value;
    let password = document.getElementById('login-password-input').value;
    for (let i = 0; i < users.length; i++) {
        if (userLoggedInSuccessfully(email, password, i)) {
            loggedIn = true;
            /**
             * Auf den geschützten Seiten currentJoinUserId muss >= 0 sein, sonst weiterleiten auf index.html.
             */
            setRememberMeValues(false, i);
        }
    }
    if (!loggedIn) {
        catchLoginFailure(email, password);
    }
}


function catchLoginFailure(email, password) {
    let emailIsWrong = checkEmail(email);
    let passwordIsWrong = checkPassword(password);
    if (emailIsWrong) {
        document.querySelector('#login-email-input ~ p').classList.remove('display-none');
        document.querySelector('#login-password-input ~ p').classList.add('display-none');
        document.getElementById('login-failure-button').setAttribute('onclick', `openSignUpMenu("${email}")`);
    } else {
        document.querySelector('#login-email-input ~ p').classList.add('display-none');
        if (passwordIsWrong) {
            document.querySelector('#login-password-input ~ p').classList.remove('display-none');
        }
    }

}


/**
 * This function saves the appropriate values in local storage if a user wants to be remembered.
 * 
 * @param {boolean} guest 
 * @param {number} i 
 */
function setRememberMeValues(guest = false, i) {
    saveVariableInLocalStorage('currentJoinUserId', users[i].id);
    saveVariableInLocalStorage('currentJoinUserFirstCharacterFirstName', getInitials('firstName', i));
    saveVariableInLocalStorage('currentJoinUserFirstCharacterLastName', getInitials('lastName', i));
    if (rememberUser() && !guest) {
        saveVariableInLocalStorage('rememberUserId', users[i].id);
    } else if (!rememberUser()) {
        saveVariableInLocalStorage('rememberUserId', false);
    }
}


/**
 * This function searches for the first character in a string if the string exists.
 * 
 * @param {string} name 
 * @param {number} i 
 * @returns the first character in upper case of the string or an empty string.
 */
function getInitials(name, i) {
    if (users[i][`${name}`]) {
        return users[i][`${name}`][0].toLocaleUpperCase();
    } else {
        return '';
    }
}


/**
 * This function checks if the "Remember me" checkbox is checked.
 * 
 * @returns {boolean} true if "Remember me" is checked.
 */
function rememberUser() {
    return document.getElementById('login-checkbox').checked;
}


/**
 * This function checks the user data input.
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {Number} i 
 * @returns {boolean} true if the user has been logged in successfully.
 */
function userLoggedInSuccessfully(email, password, i) {
    return users[i].password === password && users[i].eMail === email;
}


/**
 * This function links to summary.html.
 */
function goToSummary() {
    window.open('./summary.html', '_self');
}


function signup() {
    document.getElementById('signup-button').disabled = true;
    checkSignupValues();
    document.getElementById('signup-button').disabled = false;
}


async function checkSignupValues() {
    let name = document.getElementById('signup-name-input').value;
    let email = document.getElementById('signup-email-input').value;
    let password = document.getElementById('signup-password-input').value;
    let passwordConfirm = document.getElementById('signup-password-confirm-input').value;
    if (password === passwordConfirm) {
        let emailAlreadyExists = false;
        // formatUserName(name);
        await loadUsers();
        let userObject = createUserObject(name, email, password);
        for (let i = 0; i < users.length; i++) {
            if (users[i].eMail === email.toLocaleLowerCase()) {
                document.querySelector('#signup-email-input ~ p').classList.remove('display-none');
                document.querySelector('#signup-password-confirm-input ~ p').classList.add('display-none');
                emailAlreadyExists = true;
            }
        }
        if (!emailAlreadyExists) {
            users.push(userObject);
            await storeUsers();
        }
    } else {
        document.querySelector('#signup-password-confirm-input ~ p').classList.remove('display-none');
    }
}

function createUserObject(name, email, password) {
    let firstName = getUserName('first', name);
    let lastName = getUserName('last', name);
    let id = getHighestId();
    let color = getUsercolor();
    let userPassword = `${password}`;
    let eMail = `${email}`;
    return {
        firstName: firstName,
        lastName: lastName,
        id: id,
        color: color,
        password: userPassword,
        eMail: eMail
    };
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
        firstName = firstNames.toString().replace(',',' ');
        if (type === 'first') {
            return firstName;
        } else if (type === 'last') {           
            return lastName;
        }
    }
    // let firstName = getFirstName(name);
    // let lastName = getLastname(name);
}


function formatStringAsName(name) {
    return name.trim().charAt(0).toLocaleUpperCase() + name.trim().slice(1, name.length).toLocaleLowerCase();
}


function getHighestId() {
    return users[users.length - 1].id + 1;
}


/**
 * This function changes the icon in the input field when the user enters data for the first time.
 * 
 * @param {string} idIcon
 */
function changePasswordIcon(idIcon) {
    let passwordInputIcon = document.getElementById(idIcon);
    if (passwordInputIcon.src.endsWith('lock.svg')) {
        passwordInputIcon.src = `./../assets/img/visibility-off.svg`;
        passwordInputIcon.style.cursor = 'pointer';
    }
}


/**
 * This function resets the input icon when the input is empty and not in focus.
 * 
 * @param {string} idIcon 
 * @param {string} idInput 
 */
function resetPasswordIcon(idIcon, idInput) {
    let input = document.getElementById(idInput);
    let inputValue = input.value;
    if (inputValue.length == 0) {
        let passwordInputIcon = document.getElementById(idIcon);
        passwordInputIcon.src = `./../assets/img/lock.svg`;
        passwordInputIcon.style.cursor = 'default';
        input.type = 'password'
    }
}


/**
 * This function changes the password visibility when the input field is not empty and places the cursor at the end of the input string.
 * 
 * @param {string} idIcon 
 * @param {string} idInput
 * @param {boolean} init
 */
function changePasswordVisibility(idIcon, idInput, init = false) {
    let passwordInputIcon = document.getElementById(idIcon);
    let input = document.getElementById(idInput);
    if (imputIsFilled(input)) {
        if (visibilityOffIconIsShown(passwordInputIcon)) {
            setPropertiesForVisibilityOn(passwordInputIcon, input);
        } else {
            setPropertiesForVisibilityOff(passwordInputIcon, input);
        }
    }
    if (!init) {
        input.focus(this.value);
    }
}

/**
 * This function changes input icon, input type and cursor style to visibility on.
 * 
 * @param {Element} passwordInputIcon 
 * @param {Element} input 
 */
function setPropertiesForVisibilityOn(passwordInputIcon, input) {
    passwordInputIcon.src = `./../assets/img/visibility-on.svg`;
    input.type = 'text'
    passwordInputIcon.style.cursor = 'pointer';
}


/**
 * This function changes input icon, input type and cursor style to visibility off.
 * 
 * @param {Element} passwordInputIcon 
 * @param {Element} input 
 */
function setPropertiesForVisibilityOff(passwordInputIcon, input) {
    passwordInputIcon.src = `./../assets/img/visibility-off.svg`;
    input.type = 'password'
    passwordInputIcon.style.cursor = 'pointer';
}


/**
 * This function checks if the input icon is the visibility-off icon.
 * 
 * @param {Element} passwordInputIcon 
 * @returns {boolean} true if the input icon is the visibility-off icon.
 */
function visibilityOffIconIsShown(passwordInputIcon) {
    return passwordInputIcon.src.endsWith('visibility-off.svg');
}


/**
 * This function checks if the input value is bigger than zero.
 * 
 * @param {Element} input 
 * @returns {boolean} true if the value is bigger than zero.
 */
function imputIsFilled(input) {
    return input.value.length > 0;
}