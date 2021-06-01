import { AppStateType } from './../reduxStore'

export const tasksSelector = (state: AppStateType) => state.tasksReducer.tasks
export const subtasksSelector = (state: AppStateType) => state.tasksReducer.subtasks
export const subsubtasksSelector = (state: AppStateType) => state.tasksReducer.subsubtasks