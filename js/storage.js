const BASE_URL = "https://join-91cdc-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * This function stores an object in the Firebase database.
 * 
 * @param {string} path 
 * @param {object} data 
 * @returns response as JSON.
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
 * This function loads data from the Firebase database.
 * 
 * @param {string} path 
 * @returns loaded data as JSON.
 */
async function getItem(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJSON = await response.json();
    return responseToJSON;
}


/**
 * This function loads the users array.
 */
async function loadUsers() {
    try {
        users = await getItem("/users");
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (!users[i].lastName) {
                    users[i].lastName = '';
                }
            }
        } else {
            users = [];
        }
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the users array.
 */
async function storeUsers() {
    try {
        await setItem('/users', users);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function loads the tasks array.
 * If a task does not have a subtasks or collaborators array, an empty array is added for each of them.
 */
async function loadTasks() {
    try {
        tasks = await getItem('/tasks');
        if (tasks) {
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                if (!task.subtasks) {
                    task.subtasks = [];
                }
                if (!task.collaborators) {
                    task.collaborators = [];
                }
            }
        } else {
            tasks = [];
        }
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the tasks array.
 */
async function storeTasks() {
    try {
        await setItem('/tasks', tasks);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function loads the contacts array.
 */
async function loadContacts() {
    try {
        contacts = await getItem('/contacts');
        if (!contacts) {
            contacts = [];
        }
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * This function stores the contacts array.
 */
async function storeContacts() {
    try {
        await setItem('/contacts', contacts);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


/**
 * This function resets the remote storage.
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
 * This function resets the tasks, users, and contacts arrays.
 */
async function useOfflineData() {
    tasks = [...offlineTasks];
    users = [...offlineUsers];
    contacts = [...offlineContacts];
}


/**
 * This function saves a variable to local storage.
 * 
 * @param {string} key 
 * @param {number, string or boolean} variable 
 */
function saveVariableInLocalStorage(key, variable) {
    localStorage.setItem(key, variable)
}


/**
 * This function loads a variable from local storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadVariableFromLocalStorage(key) {
    return localStorage.getItem(key)
}


/**
 * This function saves an array to local storage.
 * 
 * @param {string} key 
 * @param {array} array 
 */
function saveArrayInLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


/**
 * This function loads an array from local storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadArrayFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}