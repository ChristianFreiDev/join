const STORAGE_TOKEN = '61W6LW4NFASNAZJK88YL44Q46FPJI5Q1QP8VE2QX';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let responseTasks = [];


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

async function loadUsers() {
    users = [];
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadTasks() {
    try {
        responseTasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
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