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
}


/**
 * This function check, if a user is remembered and wehn its true, fill the login felds with the useres data.
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
 * This funktion
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
 *  This function opens the sign up menu and hides the log in menu, by adding and removing the class "display-none"
 */
function openSignUpMenu() {
    document.getElementById('login-feld').classList.add('display-none');
    document.getElementById('login-signup-box-footer').classList.add('display-none');
    document.getElementById('login-signup-box-header').classList.add('display-none');
    document.getElementById('signup-feld').classList.remove('display-none');
}


/**
 *  This function opens the log in menu and hides the sign up menu, by adding and removing the class "display-none"
 */
function openLogInMenu() {
    document.getElementById('login-feld').classList.remove('display-none');
    document.getElementById('login-signup-box-footer').classList.remove('display-none');
    document.getElementById('login-signup-box-header').classList.remove('display-none');
    document.getElementById('signup-feld').classList.add('display-none');
}


/**
 * This function is logging the user or a guest in and give the user feedback, if its data were wrong.
 * 
 * @param {Boolean} guest 
 */
function login(guest = false) {
    if (guest) {
        saveVariableInLocalStorage('currentJoinUserId', 0);
        goToSummary();
    } else {
        let email = document.getElementById('login-email-input').value;
        let password = document.getElementById('login-password-input').value;
        for (let i = 0; i < users.length; i++) {
            if (userLoggedInSuccessfully(email, password, i)) {
                loggedIn = true;
                saveVariableInLocalStorage('currentJoinUserId', users[i].id);
                saveVariableInLocalStorage('currentJoinUserFirstCharacterFirstName', getInitials('firstName', i));
                saveVariableInLocalStorage('currentJoinUserFirstCharacterLastName', getInitials('lastName', i));
                if (rememberUser()) {
                    saveVariableInLocalStorage('rememberUserId', users[i].id);
                } else {
                    saveVariableInLocalStorage('rememberUserId', users[i].false);
                }
            }
        }
        if (loggedIn) {
            goToSummary();
        } else {
            /** 
             * Zeige einen Fehler an.
             * Lasse "I forgot my password" erscheinen.
            */
        }
    }
}


function getInitials(name, i) {
    if (users[i][`${name}`]) {
        return users[i][`${name}`][0].toLocaleUpperCase();
    } else {
        return '';
    }
}


/**
 * This funktion checks, if the checkbox "Remember me" is checked.
 * 
 * @returns a boolean.
 */
function rememberUser() {
    return document.getElementById('login-checkbox').checked;
}


/**
 * This function checks the inputed User data.
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {Number} i 
 * @returns a boolean.
 */
function userLoggedInSuccessfully(email, password, i) {
    return users[i].password === password && users[i].eMail === email
}


/**
 * This function links to the summary.html
 */
function goToSummary() {
    window.open('./summary.html', '_self');
}

function signup() {

}


/**
 * This function change the icon in the input feld, by doing the first input.
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
 * This function reset the input icon, when it´s empty and focused out.
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
 * This function change the password visibility, when the input feld is not empty and set focus back on the input feld after last sign.
 * 
 * @param {string} idIcon 
 * @param {string} idInput 
 */
function changePasswordVisibility(idIcon, idInput, init = false) {
    let passwordInputIcon = document.getElementById(idIcon);
    let input = document.getElementById(idInput);
    if (input.value.length > 0) {
        if (passwordInputIcon.src.endsWith('visibility-off.svg')) {
            passwordInputIcon.src = `./../assets/img/visibility-on.svg`;
            input.type = 'text'
            passwordInputIcon.style.cursor = 'pointer';
        } else {
            passwordInputIcon.src = `./../assets/img/visibility-off.svg`;
            input.type = 'password'
            passwordInputIcon.style.cursor = 'pointer';
        }
    }
    if (!init) {
        input.focus(this.value);
    }
}