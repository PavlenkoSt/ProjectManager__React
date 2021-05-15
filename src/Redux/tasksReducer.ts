import changeCompletedTaskStatus from "../heplers/changeCompletedTaskStatus"
import removeSubtaskNum from "../heplers/removeSubtaskNum"
import removeTaskAndAllSubtasks from "../heplers/removeTaskAndAllSubtasks"
import { ActionTypes } from "./reduxStore"

const DELETE_TASK = 'DELETE_TASK'
const CHANGE_COMPLETED_STATUS = 'CHANGE_COMPLETED_STATUS'
const SET_COMPLETED_STATUS = 'SET_COMPLETED_STATUS'
const ADD_NEW_TASK = 'ADD_NEW_TASK'

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
        {id: 1, text: 'Написать html-разметку', completed: false, subsubtasksId: [1, 2]},
        {id: 2, text: 'Написать стили', completed: false, subsubtasksId: []},
        {id: 3, text: 'Сделать бургер-меню', completed: false, subsubtasksId: []},
    ],
    subsubtasks: [
        {id: 1, text: 'Не забыть тег хедер', completed: true },
        {id: 2, text: 'Прижать к верху страницы', completed: false },
    ]
}

export const tasksActions = {
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null = null) => (
        { type: DELETE_TASK, id, level, subtasksId}
    ),
    changeCompletedStatus: (id: number, level: number) => ({ type: CHANGE_COMPLETED_STATUS, id, level }),
    setCompletedStatus: (id: number, status: boolean, level: number) => ({ type: SET_COMPLETED_STATUS, id, status, level }),
    addNewTask: (task: string, level: number, idTask: number | null, projectId?: number) => ({ type: ADD_NEW_TASK, task, level, idTask, projectId })
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof tasksActions>

const tasksReducer = (state = initialValue, action: any): InitialValueType =>{
    switch(action.type){
        case DELETE_TASK: {
            switch(action.level){
                case 0: {
                    const tasksWithoutRemovedElements = removeTaskAndAllSubtasks(state.tasks, action.id, state.subtasks, state.subsubtasks)
                    return {
                        ...state,
                        tasks: tasksWithoutRemovedElements.newTasks,
                        subtasks: tasksWithoutRemovedElements.newSubtasks,
                        subsubtasks: tasksWithoutRemovedElements.newSubSubTasks
                    }
                }
                case 1: {
                    const tasksWithoutRemovedElements = removeTaskAndAllSubtasks(state.subtasks, action.id, state.subsubtasks)
                    return {
                        ...state,
                        tasks: removeSubtaskNum(state.tasks, action.id),
                        subtasks: tasksWithoutRemovedElements.newTasks,
                        subsubtasks: tasksWithoutRemovedElements.newSubtasks
                    }
                }
                case 2: {
                    return {
                        ...state,
                        subtasks: removeSubtaskNum(state.subtasks, action.id),
                        subsubtasks: state.subsubtasks.filter(subsubtask => subsubtask.id !== action.id)
                    }
                }
                default: return state
            }
        }
        case CHANGE_COMPLETED_STATUS: {
            switch(action.level){
                case 0: {
                    return {
                        ...state,
                        tasks: changeCompletedTaskStatus(state.tasks, action.id)
                    }
                }
                case 1: {
                    return {
                        ...state,
                        subtasks: changeCompletedTaskStatus(state.subtasks, action.id)
                    }
                }
                case 2: {
                    return {
                        ...state,
                        subsubtasks: changeCompletedTaskStatus(state.subsubtasks, action.id)
                    }
                }
                default: return state
            }
        }
        case SET_COMPLETED_STATUS: {
            switch(action.level){
                case 0: {
                    return {
                        ...state,
                        tasks: state.tasks.map(task => {
                            if(task.id === action.id){
                                task.completed = action.status
                            }
                            return task
                        })
                    }
                }
                case 1: {
                    return {
                        ...state,
                        subtasks: state.subtasks.map(subtask => {
                            if(subtask.id === action.id){
                                subtask.completed = action.status
                            }
                            return subtask
                        })
                    }
                }
                default: return state
            }
        }
        case ADD_NEW_TASK: {
            switch(action.level){
                case 0: {
                    const id = Date.now()
                    return {
                        ...state,
                        tasks: state.tasks.map(task => {
                            if(task.id === action.idTask){
                                task.subtasksId.push(id)
                            }
                            return task
                        }),
                        subtasks: [ ...state.subtasks, {
                            id,
                            text: action.task,
                            completed: false,
                            subsubtasksId: []
                        }]
                    }
                }
                case 1: {
                    const id = Date.now()
                    return {
                        ...state,
                        subtasks: state.subtasks.map(subtask => {
                            if(subtask.id === action.idTask){
                                subtask.subsubtasksId.push(id)
                            }
                            return subtask
                        }),
                        subsubtasks: [ ...state.subsubtasks, {
                            id,
                            text: action.task,
                            completed: false
                        }]
                    }
                }
                case -1: {
                    return {
                        ...state,
                        tasks: [...state.tasks, {
                            id: Date.now(),
                            forProject: action.projectId,
                            text: action.task,
                            completed: false,
                            subtasksId: []
                        }]
                    }
                }
                default: return state
            }
        }
        default: return state
    }
}

export default tasksReducer