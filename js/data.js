user = [
    {
        firstName: 'Bernd',
        lastName: 'Muster',
        id: 1,
        password: 'test123',
        contacts: [2, 3], // user id
        eMail: 'bernd-muster@example.de',
        phone: '01451234567',
        tasks: [
            {
                title: 'Task 1',
                description: 'In this task is the folowing to do:',
                collaborators: [3, 4, 5], // user id
                dueDate: 'Date',
                priority: 'Urgent',
                category: 'Technical task',
                status: 'In progress',
                subtasks: [
                    {
                        title: 'Subtask1',
                        description: 'To do in Subtask 1',
                        done: true
                    },
                    {
                        title: 'Subtask2',
                        description: 'To do in Subtask 2',
                        done: false
                    }
                ]
            }
        ]
    }
];