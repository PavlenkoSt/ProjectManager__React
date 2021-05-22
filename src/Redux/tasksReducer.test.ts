import tasksReducer, {tasksActions} from './tasksReducer'

const state = {
    tasks: [
        { id: 1, froProject: 1, text: 'someText', order: 1, completed: false, subtasksId: [] },
        { id: 2, froProject: 1, text: 'someText', order: 2, completed: false, subtasksId: [1, 2] }
    ],
    subtasks: [
        { id: 1, text: 'someText', completed: false, subsubtasksId: [] },
        { id: 2, text: 'someText', completed: false, subsubtasksId: [1, 2] }
    ],
    subsubtasks: [
        { id: 1, text: 'someText', completed: false },
        { id: 2, text: 'someText', completed: false }
    ]
}

it('tasks length should be decrement', () => {
    const action = tasksActions.deleteTask(1, 0);
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks.length).toBe(1)
})

it('subtasks length should be decrement', () => {
    const action = tasksActions.deleteTask(1, 1)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.subtasks.length).toBe(1)
})

it('subsubtasks length should be decrement', () => {
    const action = tasksActions.deleteTask(1, 2)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.subsubtasks.length).toBe(1)
})

it('completed status of target task should be shanged', () => {
    const action = tasksActions.changeCompletedStatus(1, 0)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks[0].completed).toBe(true)
})

it('completed status of target task should be setted', () => {
    const action = tasksActions.setCompletedStatus(2, true, 0)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks[1].completed).toBe(true)
})

it('tasks length should be increment', () => {
    const action = tasksActions.addNewTask('some task', -1, null, 1)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks.length).toBe(3)
})

it('tasks order should be changed', () => {
    const action = tasksActions.changeTaskOrder(1, 3, 0)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks[0].order).toBe(3)
})

it('tasks should be setted', () => {
    const action = tasksActions.setTasksFromLS([
            {id: 1, froProject: 1, text: 'someNewTask', order: 1, completed: false, subtasksId: []}
        ], 0)
    const modernizedStateTasks = tasksReducer(state, action)
    expect(modernizedStateTasks.tasks.length).toBe(1)
    expect(modernizedStateTasks.tasks[0].text).toBe('someNewTask')
})