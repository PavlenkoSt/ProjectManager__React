import changeCompletedTaskStatus from "../heplers/changeCompletedTaskStatus"
import removeSubtaskNum from "../heplers/removeSubtaskNum"
import removeTaskAndAllSubtasks from "../heplers/removeTaskAndAllSubtasks"
import { ActionTypes } from "./reduxStore"

export const DELETE_TASK = 'DELETE_TASK'
export const CHANGE_COMPLETED_STATUS = 'CHANGE_COMPLETED_STATUS'
export const SET_COMPLETED_STATUS = 'SET_COMPLETED_STATUS'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'
export const CHANGE_TASK_ORDER = 'CHANGE_TASK_ORDER'
export const SET_TASKS_FROM_LS = 'SET_TASKS_FROM_LS'

export type TaskType = {
    id: number
    forProject?: number
    text: string
    order: number
    completed: boolean
    subtasksId: Array<number>
}

export type SubtaskType = {
    id: number
    text: string
    completed: boolean
    subsubtasksId: Array<number>
}

export type SubsubtaskType = {
    id: number
    text: string
    completed: boolean
}

const initialValue = {
    tasks: [] as Array<TaskType>,
    subtasks: [] as Array<SubtaskType>,
    subsubtasks: []  as Array<SubsubtaskType>,
}

export const tasksActions = {
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null = null) => ({ type: DELETE_TASK, id, level, subtasksId}),
    changeCompletedStatus: (id: number, level: number) => ({ type: CHANGE_COMPLETED_STATUS, id, level }),
    setCompletedStatus: (id: number, status: boolean, level: number) => ({ type: SET_COMPLETED_STATUS, id, status, level }),
    addNewTask: (task: string, level: number, idTask: number | null, projectId?: number) => ({ type: ADD_NEW_TASK, task, level, idTask, projectId }),
    changeTaskOrder: (id: number, order: number) => ({ type: CHANGE_TASK_ORDER, id, order }),
    setTasksFromLS: ( tasks: Array<any>, level: number ) => ({ type: SET_TASKS_FROM_LS, tasks, level })
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
                    const orders = state.tasks
                        .filter(task => task.forProject === action.projectId)
                        .map(task => task.order)
                    const currentOrder = orders.length && orders[0] !== null ? Math.max(...orders) + 1 : 0
                    return {
                        ...state,
                        tasks: [...state.tasks, {
                            id: Date.now(),
                            forProject: action.projectId,
                            text: action.task,
                            completed: false,
                            order: currentOrder,
                            subtasksId: []
                        }]
                    }
                }
                default: return state
            }
        }
        case CHANGE_TASK_ORDER: {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task.id === action.id){
                        task.order = action.order
                    }
                    return task
                })
            }
        }
        case SET_TASKS_FROM_LS: {
            switch(action.level){
                case 0: {
                    return {
                        ...state,
                        tasks: action.tasks
                    }
                }
                case 1: {
                    return {
                        ...state,
                        subtasks: action.tasks
                    }
                }
                case 2: {
                    return {
                        ...state,
                        subsubtasks: action.tasks
                    }
                }
                default: return state
            }
        }
        default: return state
    }
}

export default tasksReducer