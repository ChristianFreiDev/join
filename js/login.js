function initIndex() {
    document.getElementById('login-overlay').classList.add('animate-overlay');
    document.getElementById('login-logo').classList.add('animate-logo');
}


// async function init(){
//     loadUsers();
// }

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


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

function login() {

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
function changePasswordVisibility(idIcon, idInput) {
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
    input.focus(this.value);
}