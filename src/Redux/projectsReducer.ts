import constructLinkFromProjectName from "../heplers/constructLinkFromProjectName"
import { ActionTypes } from "./reduxStore"

const ADD_NEW_PROJECT = 'ADD_NEW_PROJECT'
const DELETE_PROJECT = 'DELETE_PROJECT'
const CHANGE_FILTER_OPTION = 'CHANGE_FILTER_OPTION'

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
    changeFilterOption : (filterOption: string) => ({ type: CHANGE_FILTER_OPTION, filterOption })
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
        default: return state
    }
}

export default projectsReducer