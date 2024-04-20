users = [
    {
        firstName: 'Guest',
        lastName: '',
        id: 0,
        password: 'test123',
        contacts: [2, 3], // user id
        eMail: 'bernd-muster@example.de',
        phone: '01451234567',
        tasks: [
            {
                title: 'Contact Form & Imprint',
                description: 'Create a contact form and imprint page.',
                collaborators: [3, 4, 5], // user id
                dueDate: 'May 06, 2024',
                priority: 'Urgent',
                category: 'User Story',
                status: 'To do',
                subtasks: [
                    {
                        title: 'Create contact form',
                        description: 'Create contact form. Add "return flase;" after the onsubmit function and style the form.',
                        done: false
                    },
                    {
                        title: 'Create imprint page.',
                        description: 'Search for a imprint generator and style the imprint page',
                        done: false
                    }
                ]
            },
            {
                title: 'Kochwelt Page & Recipe Recommender',
                description: 'Build start page with recipe recommendation',
                collaborators: [3, 4, 5], // user id
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
                collaborators: [3, 4, 5], // user id
                dueDate: 'May 05, 2024',
                priority: 'Low',
                category: 'Technical Task',
                status: 'Await feedback',
                subtasks: []
            },
            {
                title: 'Daily Kochwelt Recipe',
                description: 'Implement daily recipe and portion calculator. Able to calculate are only positive values',
                collaborators: [3, 4, 5], // user id
                dueDate: 'May 03, 2024',
                priority: 'Medium',
                category: 'User Story',
                status: 'Await feedback',
                subtasks: []
            },
            {
                title: 'CSS Architecture Planning',
                description: 'Define CSS naming conventions and structure.',
                collaborators: [3, 4, 5], // user id
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
    }
];