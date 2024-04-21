users = [
    {
        firstName: 'Guest',
        lastName: '',
        id: 0,
        color: 'user-color0',
        password: 'test123',
        contacts: [2, 3], // user id
        eMail: 'bernd-muster@example.de',
        phone: '01451234567'
    },
    {
        firstName: 'Max',
        lastName: 'Mustermann',
        id: 1,
        color: 'user-color1',
        password: 'test123',
        contacts: [2, 3], // user id
        eMail: 'max-mustermann@example.de',
        phone: '43636574357'
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        id: 2,
        color: 'user-color2',
        password: 'test123',
        contacts: [1, 3], // user id
        eMail: 'john-doe@example.de',
        phone: '87658765'
    },
    {
        firstName: 'Maria',
        lastName: 'Musterfrau',
        id: 3,
        color: 'user-color2',
        password: 'test123',
        contacts: [1, 0], // user id
        eMail: 'maria-musterfrau@example.de',
        phone: '769786987698'
    }
];

let tasks = [
    // {
    //     title: 'Contact Form & Imprint',
    //     description: 'Create a contact form and imprint page.',
    //     collaborators: [1, 2], // user id
    //     dueDate: 'May 06, 2024',
    //     priority: 'Urgent',
    //     category: 'User Story',
    //     status: 'To do',
    //     subtasks: [
    //         {
    //             title: 'Create contact form',
    //             description: 'Create contact form. Add "return flase;" after the onsubmit function and style the form.',
    //             done: false
    //         },
    //         {
    //             title: 'Create imprint page.',
    //             description: 'Search for a imprint generator and style the imprint page',
    //             done: false
    //         }
    //     ]
    // },
    {
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        collaborators: [1, 3], // user id
        dueDate: 'May 06, 2024',
        priority: 'Medium',
        category: 'User Story',
        status: 'In progress',
        subtasks: [
            {
                title: 'Create start page',
                description: 'Create start page and implement the style.css and script.js',
                done: true
            },
            {
                title: 'Add recommendation.',
                description: 'Add recommendation and create the recipe.',
                done: false
            }
        ]
    },
    {
        title: 'HTML Base Templates Creation',
        description: 'Create reusable HTML base templates for Header and footer.',
        collaborators: [2, 3], // user id
        dueDate: 'May 05, 2024',
        priority: 'Low',
        category: 'Technical Task',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'Daily Kochwelt Recipe',
        description: 'Implement daily recipe and portion calculator. Able to calculate are only positive values',
        collaborators: [1, 2, 3], // user id
        dueDate: 'May 03, 2024',
        priority: 'Medium',
        category: 'User Story',
        status: 'Await feedback',
        subtasks: []
    },
    {
        title: 'CSS Architecture Planning',
        description: 'Define CSS naming conventions and structure.',
        collaborators: [1, 2, 0], // user id
        dueDate: 'May 01, 2024',
        priority: 'Urgent',
        category: 'Technical Task',
        status: 'Done',
        subtasks: [
            {
                title: 'Define CSS naming conventions',
                description: 'Define CSS naming conventions. Google for best practise',
                done: true
            },
            {
                title: 'Define CSS structure.',
                description: 'Define CSS structure. Also use google for best practise',
                done: true
            }
        ]
    },
]