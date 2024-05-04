const BASE_URL = "https://testprojekt-2599f-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * This function stores an object to the firebase storage.
 * 
 * @param {string} path 
 * @param {object} data 
 * @returns respons as Json.
 */
async function setItem(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}


/**
 * This function loads data from the firebase storage.
 * 
 * @param {string} path 
 * @returns loaded data as Json.
 */
async function getItem(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJSON = await response.json();
    return responseToJSON;
}

/**
 * This function loads the users- array.
 */
async function loadUsers() {
    try {
        users = await getItem("/users")
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the users- array.
 */
async function storeUsers() {
    try {
        console.log('storing users');
        await setItem('/users', users);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function loads the tasks- array.
 */
async function loadTasks() {
    try {
        tasks = await getItem('/tasks');
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the tasks- array.
 */
async function storeTasks() {
    try {
        console.log('storing tasks');
        await setItem('/tasks', tasks);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function loads the contacts- array.
 */
async function loadContacts() {
    try {
        contacts = await getItem('/contacts');
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the contacts- array.
 */
async function storeContacts() {
    try {
        console.log('storing contacts');
        await setItem('/contacts', contacts);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function resets the remote Storage.
 */
async function resetUsersTasksContacts() {
    try {
        await setItem('/users', offlineUsers);
        await setItem('/tasks', offlineTasks);
        await setItem('/contacts', offlineContacts);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function resets the tasks-, users-, and contacts- array.
 */
async function useOfflineData() {
    tasks = offlineTasks;
    users = offlineUsers;
    contacts = offlineContacts;
}


/**
 * This function saves a variable to the local storage.
 * 
 * @param {string} key 
 * @param {number, string or boolean} variable 
 */
function saveVariableInLocalStorage(key, variable) {
    localStorage.setItem(key, variable)
}


/**
 * This function loads a variable from the local storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadVariableFromLocalStorage(key) {
    return localStorage.getItem(key)
}


/**
 * This function saves an array to the local storage.
 * 
 * @param {string} key 
 * @param {array} array 
 */
function saveArrayInLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


/**
 * This function loads an array fron the local storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadArrayFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}