function sanitizeNumber(number) {
    if (typeof number === 'number') {
        return number;
    } else {
        return 0;
    }
}

function sanitizeUser(user) {
    return {
        firstName: DOMPurify.sanitize(user.firstName),
        lastName: typeof user.lastName === 'undefined' ? '' : DOMPurify.sanitize(user.lastName),
        id: sanitizeNumber(user.id),
        color: DOMPurify.sanitize(user.color),
        password: DOMPurify.sanitize(user.password),
        eMail: DOMPurify.sanitize(user.eMail),
    };
}

function sanitizeUsers(users) {
    return users.map(user => sanitizeUser(user));
}

function sanitizeCollaborators(collaborators) {
    if (typeof collaborators === 'undefined') {
        return [];
    } else {
        return collaborators.map(collaborator => sanitizeNumber(collaborator));
    }
}

function sanitizeSubTask(subtask) {
    return {
        title: DOMPurify.sanitize(subtask.title),
        done: typeof subtask.done === 'boolean' ? subtask.done : false
    }
}

function sanitizeSubTasks(subtasks) {
    if (typeof subtasks === 'undefined') {
        return [];
    } else {
        return subtasks.map(subtask => sanitizeSubTask(subtask));
    }
}

function sanitizeTask(task) {
    return {
        title: DOMPurify.sanitize(task.title),
        description: DOMPurify.sanitize(task.description),
        id: sanitizeNumber(task.id),
        collaborators: sanitizeCollaborators(task.collaborators),
        dueDate: DOMPurify.sanitize(task.dueDate),
        priority: DOMPurify.sanitize(task.priority),
        category: DOMPurify.sanitize(task.category),
        status: DOMPurify.sanitize(task.status),
        subtasks: sanitizeSubTasks(task.subtasks)
    }
}

function sanitizeTasks(tasks) {
    return tasks.map(task => sanitizeTask(task));
}

function sanitizeContact(contact) {
    return {
        firstName: DOMPurify.sanitize(contact.firstName),
        lastName: DOMPurify.sanitize(contact.lastName),
        id: sanitizeNumber(contact.id),
        color: DOMPurify.sanitize(contact.color),
        eMail: DOMPurify.sanitize(contact.eMail),
        phone: DOMPurify.sanitize(contact.phone),
    }
}

function sanitizeContacts(contacts) {
    return contacts.map(contact => sanitizeContact(contact));
}