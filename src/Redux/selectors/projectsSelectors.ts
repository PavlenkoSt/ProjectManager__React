import { AppStateType } from './../reduxStore'

export const projectsSelector = (state: AppStateType) => state.projectsReducer.projects
export const filterOptionSelector = (state: AppStateType) => state.projectsReducer.filterOption