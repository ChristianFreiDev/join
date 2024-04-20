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