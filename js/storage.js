const STORAGE_TOKEN = '61W6LW4NFASNAZJK88YL44Q46FPJI5Q1QP8VE2QX';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeUsers() {
    try {
        console.log('storing users');
        await setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeTasks() {
    try {
        console.log('storing tasks');
        await setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (error) {
        console.error('Loading error:', error);
    }
}


async function storeContacts() {
    try {
        console.log('storing contacts');
        await setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
        console.error('Storage error:', error);
    }
}


async function resetUsersTasksContacts() {
    try {
        await setItem('users', JSON.stringify(offlineUsers));
        await setItem('tasks', JSON.stringify(offlineTasks));
        await setItem('contacts', JSON.stringify(offlineContacts));
    } catch (error) {
        console.error('Storage error:', error);
    }
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