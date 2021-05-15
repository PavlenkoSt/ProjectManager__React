import { ActionTypes } from "./reduxStore"

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
        { id: 2, core: 'Mobile game', name: 'Scooby-Doo', completed: true, desc: '', link: 'mobile-game-scooby-doo'},
        { id: 3, core: 'SRM', name: 'Friendly Killer', completed: false, desc: '', link: 'srm-friendly-killer'},
        { id: 4, core: 'Course', name: 'Youtube-star', completed: true, desc: '', link: 'course-youtube-star'},
        { id: 5, core: 'Online store', name: 'Black-market', completed: false, desc: '', link: 'online-store-black-market'},
    ]
}

export const projectsActions = {

}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof projectsActions>


const projectsReducer = (state = initialValue, action:ActionType):InitialValueType =>{
    switch(action.type){
        default: return state
    }
}

export default projectsReducer