import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router'
import App from './App'
import LocalStorage, { projectsLS, subsubtasksLS, subtasksLS, tasksLS } from './LocalStorage/LocalStorage'
import { projectsActions, ProjectType } from './Redux/projectsReducer'
import store from './Redux/reduxStore'
import { projectsSelector } from './Redux/selectors/projectsSelectors'
import { subsubtasksSelector, subtasksSelector, tasksSelector } from './Redux/selectors/tasksSelector'
import { tasksActions } from './Redux/tasksReducer'

const AppContainer = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const projects = useSelector(projectsSelector)
    const tasks = useSelector(tasksSelector)
    const subtasks = useSelector(subtasksSelector)
    const subsubtasks = useSelector(subsubtasksSelector)
   
    let links = store.getState().projectsReducer.projects &&
      store.getState().projectsReducer.projects.map((project: ProjectType) => '/' + project.link)

    useEffect(() => {
      links = store.getState().projectsReducer.projects && 
        store.getState().projectsReducer.projects.map((project: ProjectType) => '/' + project.link)
    }, [history.location.pathname])
  
    useEffect(() => {
      const projects = LocalStorage.get(projectsLS)
      if(projects && projects.length){
        dispatch(projectsActions.setProjectsFromLS(projects))
      }
  
      const tasks = LocalStorage.get(tasksLS)
      if(tasks && tasks.length){
        dispatch(tasksActions.setTasksFromLS(tasks, 0))
      }
  
      const subtasks = LocalStorage.get(subtasksLS)
      if(subtasks && subtasks.length){
        dispatch(tasksActions.setTasksFromLS(subtasks, 1))
      }
  
      const subsubtasks = LocalStorage.get(subsubtasksLS)
      if(subsubtasks && subsubtasks.length){
        dispatch(tasksActions.setTasksFromLS(subsubtasks, 2))
      }
    }, [])
  
    useEffect(() => {
      LocalStorage.set(projectsLS, projects)
    }, [projects])
  
    useEffect(() => {
      LocalStorage.set(tasksLS, tasks)
    }, [tasks])
  
    useEffect(() => {
      LocalStorage.set(subtasksLS, subtasks)
    }, [subtasks])
  
    useEffect(() => {
      LocalStorage.set(subsubtasksLS, subsubtasks)
    }, [subsubtasks])

    return <App links={links} />
}

export default AppContainer
