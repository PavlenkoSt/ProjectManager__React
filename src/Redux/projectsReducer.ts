import constructLinkFromProjectName from "../heplers/constructLinkFromProjectName"
import { ActionTypes } from "./reduxStore"

export const ADD_NEW_PROJECT = 'ADD_NEW_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const CHANGE_FILTER_OPTION = 'CHANGE_FILTER_OPTION'
export const SET_PROJECTS_FROM_LS = 'SET_PROJECTS_FROM_LS'

export type ProjectType = {
    id: number
    core: string
    name: string
    completed: boolean
    desc: string
    link: string
}

const initialValue = {
    projects: [] as Array<ProjectType>,
    filterOption: 'all'
}

export const projectsActions = {
    addNewProject: (name: string, core: string, desc: string) => ({ type: ADD_NEW_PROJECT, name, core, desc }),
    deleteProject: (id: number) => ({ type: DELETE_PROJECT, id }),
    changeFilterOption : (filterOption: string) => ({ type: CHANGE_FILTER_OPTION, filterOption }),
    setProjectsFromLS: (projects: Array<ProjectType>) => ({ type: SET_PROJECTS_FROM_LS, projects })
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof projectsActions>

const projectsReducer = (state = initialValue, action: any): InitialValueType =>{
    switch(action.type){
        case ADD_NEW_PROJECT: {
            const newProj = {
                id: Date.now(), 
                core: action.core, 
                name: action.name, 
                completed: false, 
                desc: action.desc, 
                link: `${constructLinkFromProjectName(action.core)}-${constructLinkFromProjectName(action.name)}`
            }
            return {
                ...state,
                projects: [...state.projects, newProj ]
            }
        }
        case DELETE_PROJECT: {
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.id)
            }
        }
        case CHANGE_FILTER_OPTION: {
            return {
                ...state,
                filterOption: action.filterOption
            }
        }
        case SET_PROJECTS_FROM_LS: {
            return {
                ...state,
                projects: action.projects
            }
        }
        default: return state
    }
}

export default projectsReducer