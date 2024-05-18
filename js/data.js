let users = [];

let offlineUsers = [
    {
        firstName: 'Guest',
        lastName: '',
        id: 0,
        color: 'user-color0',
        password: 'test123',
        eMail: 'bernd-muster@example.de'
    },
    {
        firstName: 'Max',
        lastName: 'Zeller',
        id: 1,
        color: 'user-color1',
        password: 'test123',
        eMail: 'max-zeller35@gmail.com'
    },
    {
        firstName: 'Johann',
        lastName: 'Schmitt',
        id: 2,
        color: 'user-color2',
        password: 'test123',
        eMail: 'johannschmitt@yahoo.com'
    },
    {
        firstName: 'Maria',
        lastName: 'Heck',
        id: 3,
        color: 'user-color8',
        password: 'test123',
        eMail: 'maria-heck@web.de'
    },
    {
        firstName: 'Anne',
        lastName: 'Wendt',
        id: 4,
        color: 'user-color9',
        password: 'test123',
        eMail: 'awendt95@gmail.com'
    },
    {
        firstName: 'Alexander',
        lastName: 'Müller',
        id: 5,
        color: 'user-color6',
        password: 'test123',
        eMail: 'alexm23452@gmail.com'
    },
    {
        firstName: 'Benjamin',
        lastName: 'Bart',
        id: 6,
        color: 'user-color4',
        password: 'test123',
        eMail: 'bbbart@web.de'
    },
    {
        firstName: 'Berthold',
        lastName: 'Sand',
        id: 7,
        color: 'user-color12',
        password: 'test123',
        eMail: 'bertsand@googlemail.com'
    },
    {
        firstName: 'Martin',
        lastName: 'Huber',
        id: 8,
        color: 'user-color6',
        password: 'test123',
        eMail: 'mhub74@gmx.net'
    },
    {
        firstName: 'Ella',
        lastName: 'Schäfer',
        id: 9,
        color: 'user-color7',
        password: 'test123',
        eMail: 'ellas99@gmail.com'
    },
    {
        firstName: 'Peter',
        lastName: 'Krüger',
        id: 10,
        color: 'user-color13',
        password: 'test123',
        eMail: 'pkrueg@gmx.net'
    }
];

let tasks = [];

let offlineTasks = [
    {
        title: 'Implement Drag & Drop Feature',
        description: 'It must be possible to drag a task from one column (or row) to another. The user will be given feedback by slightly rotating the task once the user clicks on the task to drag it and by highlighting the area in which the task can be dropped.',
        id: 0,
        collaborators: [1, 2],
        dueDate: '2024-05-20',
        priority: 'Urgent',
        category: 'User Story',
        status: 'To do',
        subtasks: [
            {
                title: 'Enable drag & drop.',
                done: true
            },
            {
                title: 'Implement task rotation feature.',
                done: true
            }
        ]
    },
    {
        title: 'Create Contacts Page',
        description: 'Build a contacts page where users can add contacts, edit them, or delete them.',
        id: 1,
        collaborators: [1, 3, 4],
        dueDate: '2024-05-26',
        priority: 'Medium',
        category: 'User Story',
        status: 'In progress',
        subtasks: [
            {
                title: 'Create contacts page.',
                done: true
            },
            {
                title: 'Implement editing feature.',
                done: false
            },
            {
                title: 'Implement deletion.',
                done: false
            }
        ]
    },
    {
        title: 'Create Database Connection',
        description: 'Enable storing data in/retrieving data from a remote database.',
        id: 2,
        collaborators: [2, 3],
        dueDate: '2024-05-27',
        priority: 'Low',
        category: 'Technical Task',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'Remember Me',
        description: 'Users want to be remembered so that they do not have to log in every time they visit the website.',
        id: 3,
        collaborators: [1, 2, 3, 4],
        dueDate: '2024-05-27',
        priority: 'Medium',
        category: 'User Story',
        status: 'Await feedback',
        subtasks: [            {
            title: 'Add checkbox.',
            done: true
        },
        {
            title: 'Store required user data.',
            done: false
        },
        {
            title: 'Delete user data when user logs out.',
            done: true
        }]
    },
    {
        title: 'Adding Tasks',
        description: 'Users want to add tasks to the board.',
        id: 4,
        collaborators: [1, 2],
        dueDate: '2024-05-28',
        priority: 'Urgent',
        category: 'User Story',
        status: 'Done',
        subtasks: [
            {
                title: 'Create form for adding tasks.',
                done: true
            },
            {
                title: 'Validate inputs.',
                done: true
            }
        ]
    },
];

let contacts =  [];

let offlineContacts =  [
    {
        firstName: 'Alexander',
        lastName: 'Müller',
        id: 5,
        color: 'user-color6',
        eMail: 'alexm23452@gmail.com',
        phone: '0160 246466363'
    },
    {
        firstName: 'Anne',
        lastName: 'Wendt',
        id: 4,
        color: 'user-color9',
        eMail: 'awendt95@gmail.com',
        phone: '0170 234664577'
    },
    {
        firstName: 'Benjamin',
        lastName: 'Bart',
        id: 6,
        color: 'user-color4',
        eMail: 'bbbart@web.de',
        phone: '0153 3466363646'
    },
    {
        firstName: 'Berthold',
        lastName: 'Sand',
        id: 7,
        color: 'user-color12',
        eMail: 'bertsand@googlemail.com',
        phone: '0150 24624628'
    },
    {
        firstName: 'Max',
        lastName: 'Zeller',
        id: 1,
        color: 'user-color2',
        eMail: 'max-zeller35@gmail.com',
        phone: '0148 23552873'
    },
    {
        firstName: 'Johann',
        lastName: 'Schmitt',
        id: 2,
        color: 'user-color2',
        eMail: 'johannschmitt@yahoo.com',
        phone: '0163 65876585'
    },
    {
        firstName: 'Maria',
        lastName: 'Heck',
        id: 3,
        color: 'user-color8',
        eMail: 'maria-heck@web.de',
        phone: '0154 312748983'
    },
    {
        firstName: 'Martin',
        lastName: 'Huber',
        id: 8,
        color: 'user-color6',
        eMail: 'mhub74@gmx.net',
        phone: '0159 2132352537'
    },
    {
        firstName: 'Ella',
        lastName: 'Schäfer',
        id: 9,
        color: 'user-color7',
        eMail: 'ellas99@gmail.com',
        phone: '0157 123643648'
    },
    {
        firstName: 'Peter',
        lastName: 'Krüger',
        id: 10,
        color: 'user-color13',
        eMail: 'pkrueg@gmx.net',
        phone: '0171 2345234767'
    }
];