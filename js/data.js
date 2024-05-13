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
        color: 'user-color2',
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
        title: 'Contact Form & Imprint',
        description: 'Create a contact form and imprint page.',
        id: 0,
        collaborators: [1, 2], // user id
        dueDate: '2024-05-06',
        priority: 'Urgent',
        category: 'User Story',
        status: 'To do',
        subtasks: [
            {
                title: 'Create contact form',
                done: false
            },
            {
                title: 'Create imprint page.',
                done: false
            }
        ]
    },
    {
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        id: 1,
        collaborators: [1, 3, 4], // user id
        dueDate: '2024-05-06',
        priority: 'Medium',
        category: 'User Story',
        status: 'In progress',
        subtasks: [
            {
                title: 'Create start page',
                done: true
            },
            {
                title: 'Add recommendation.',
                done: false
            }
        ]
    },
    {
        title: 'HTML Base Templates Creation',
        description: 'Create reusable HTML base templates for Header and footer.',
        id: 2,
        collaborators: [2, 3], // user id
        dueDate: '2024-05-05',
        priority: 'Low',
        category: 'Technical Task',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'Daily Kochwelt Recipe',
        description: 'Implement daily recipe and portion calculator. Able to calculate are only positive values',
        id: 3,
        collaborators: [1, 2, 3, 4], // user id
        dueDate: '2024-05-03',
        priority: 'Medium',
        category: 'User Story',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'CSS Architecture Planning',
        description: 'Define CSS naming conventions and structure.',
        id: 4,
        collaborators: [1, 2], // user id
        dueDate: '2024-05-01',
        priority: 'Urgent',
        category: 'Technical Task',
        status: 'Done',
        subtasks: [
            {
                title: 'Define CSS naming conventions',
                done: true
            },
            {
                title: 'Define CSS structure.',
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
        color: 'user-color6',
        eMail: 'alexm23452@gmail.com',
        phone: '0160 246466363'
    },
    {
        firstName: 'Anne',
        lastName: 'Wendt',
        color: 'user-color9',
        eMail: 'awendt95@gmail.com',
        phone: '0170 234664577'
    },
    {
        firstName: 'Benjamin',
        lastName: 'Bart',
        color: 'user-color4',
        eMail: 'bbbart@web.de',
        phone: '0153 3466363646'
    },
    {
        firstName: 'Berthold',
        lastName: 'Sand',
        color: 'user-color12',
        eMail: 'bertsand@googlemail.com',
        phone: '0150 24624628'
    },
    {
        firstName: 'Max',
        lastName: 'Zeller',
        color: 'user-color2',
        eMail: 'max-zeller35@gmail.com',
        phone: '0148 23552873'
    },
    {
        firstName: 'Johann',
        lastName: 'Schmitt',
        color: 'user-color2',
        eMail: 'johannschmitt@yahoo.com',
        phone: '0163 65876585'
    },
    {
        firstName: 'Maria',
        lastName: 'Heck',
        color: 'user-color8',
        eMail: 'maria-heck@web.de',
        phone: '0154 312748983'
    },
    {
        firstName: 'Martin',
        lastName: 'Huber',
        color: 'user-color6',
        eMail: 'mhub74@gmx.net',
        phone: '0159 2132352537'
    },
    {
        firstName: 'Ella',
        lastName: 'Schäfer',
        color: 'user-color7',
        eMail: 'ellas99@gmail.com',
        phone: '0157 123643648'
    },
    {
        firstName: 'Peter',
        lastName: 'Krüger',
        color: 'user-color13',
        eMail: 'pkrueg@gmx.net',
        phone: '0171 2345234767'
    }
];