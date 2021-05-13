import { ActionTypes } from "./reduxStore"

const REMOVE_TASK = 'REMOVE_TASK'

export type TaskType = {
    id: number
    forProject?: number
    text: string
    completed: boolean
    subtasksId: any
}

const initialValue = {
    tasks: [
        {id: 1, forProject: 1, text: 'Сделать хедер', completed: false, subtasksId: [1, 2, 3]},
        {id: 2, forProject: 1, text: 'Сделать футер', completed: true, subtasksId: []}
    ],
    subtasks: [
        {id: 1, text: 'Написать html-разметку', completed: false, subtasksId: [1, 2]},
        {id: 2, text: 'Написать стили', completed: false, subtasksId: []},
        {id: 3, text: 'Сделать бургер-меню', completed: false, subtasksId: []},
    ],
    subsubtasks: [
        {id: 1, text: 'Не забыть тег хедер', completed: true },
        {id: 2, text: 'Прижать к верху страницы', completed: false },
    ]
}

export const projectsActions = {
    removeTask: (id: number) => ({ type: REMOVE_TASK, id })
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof projectsActions>


const tasksReducer = (state = initialValue, action:ActionType):InitialValueType =>{
    switch(action.type){
        default: return state
    }
}

export default tasksReducer