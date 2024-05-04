const BASE_URL = "https://testprojekt-2599f-default-rtdb.europe-west1.firebasedatabase.app/";


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


async function getItem(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJSON = await response.json();
    return responseToJSON;
}


async function loadUsers() {
    try {
        users = await getItem("/users")
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeUsers() {
    try {
        console.log('storing users');
        await setItem('/users', users);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function loadTasks() {
    try {
        tasks = await getItem('/tasks');
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeTasks() {
    try {
        console.log('storing tasks');
        await setItem('/tasks', tasks);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function loadContacts() {
    try {
        contacts = await getItem('/contacts');
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeContacts() {
    try {
        console.log('storing contacts');
        await setItem('/contacts', contacts);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function resetUsersTasksContacts() {
    try {
        await setItem('/users', offlineUsers);
        await setItem('/tasks', offlineTasks);
        await setItem('/contacts', offlineContacts);
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function useOfflineData() {
    tasks = offlineTasks;
    users = offlineUsers;
    contacts = offlineContacts;
}


function saveVariableInLocalStorage(key, variable) {
    localStorage.setItem(key, variable)
}


function loadVariableFromLocalStorage(key) {
    return localStorage.getItem(key)
}


function saveArrayInLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


function loadArrayFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}