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
    projects: [
        { id: 1, core: 'Project-manager', name: 'LazyKoala', completed: false, desc: '', link: 'project-manager-lazykoala'},
        { id: 2, core: 'Mobile game', name: 'Scooby-Doo', completed: true, desc: 'Super-puper-duper mobile game. This game will occupate the million people heart ariund the World!', link: 'mobile-game-scooby-doo'},
        { id: 3, core: 'SRM', name: 'Friendly Killer', completed: false, desc: '', link: 'srm-friendly-killer'},
        { id: 4, core: 'Course', name: 'Youtube-star', completed: true, desc: '', link: 'course-youtube-star'},
        { id: 5, core: 'Online store', name: 'Black-market', completed: false, desc: '', link: 'online-store-black-market'},
    ] as Array<ProjectType>,
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