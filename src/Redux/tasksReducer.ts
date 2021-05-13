import { ActionTypes } from "./reduxStore"

export type TaskType = {
    id: number
    forProject?: number
    text: string
    completed: boolean
    subtasks: any
}

const initialValue = {
    tasks: [
        {id: 1, forProject: 1, text: 'Сделать хедер', completed: false, subtasks: [
            {id: 1, text: 'Написать html-разметку', completed: false, subtasks: [
                {id: 1, text: 'Не забыть тег хедер', completed: true },
                {id: 2, text: 'Прижать к верху страницы', completed: false },
            ]},
            {id: 2, text: 'Написать стили', completed: false, subtasks: []},
            {id: 3, text: 'Сделать бургер-меню', completed: false, subtasks: []},
        ]},
        {id: 2, forProject: 1, text: 'Сделать футер', completed: true, subtasks: []}

    ]
}

export const projectsActions = {

}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof projectsActions>


const tasksReducer = (state = initialValue, action:ActionType):InitialValueType =>{
    switch(action.type){
        default: return state
    }
}

export default tasksReducer