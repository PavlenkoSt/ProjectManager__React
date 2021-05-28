import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import App from './App'
import LocalStorage, { projectsLS, subsubtasksLS, subtasksLS, tasksLS } from './LocalStorage/LocalStorage'
import { projectsActions, ProjectType } from './Redux/projectsReducer'
import store, { AppStateType } from './Redux/reduxStore'
import { tasksActions, TaskType } from './Redux/tasksReducer'

type MapStatePropsType = {
    projects: Array<ProjectType>
    tasks: Array<TaskType>
    subtasks: Array<any>
    subsubtasks: Array<any>
  }
  
  type MapDispatchPropsType = {
    setProjectsFromLS: (projects: Array<ProjectType>) => void
    setTasksFromLS: (tasks: Array<any>, level: number) => void
  }

const AppContainer: FC<MapStatePropsType & MapDispatchPropsType & RouteComponentProps> = ({ location, projects, setProjectsFromLS, tasks, subtasks, subsubtasks, setTasksFromLS }) => {

    let links = store.getState().projectsReducer.projects && store.getState().projectsReducer.projects.map((project: any) => '/' + project.link)

    useEffect(() => {
      links = store.getState().projectsReducer.projects && store.getState().projectsReducer.projects.map((project: any) => '/' + project.link)
    }, [location.pathname])
  
    useEffect(() => {
      const projects = LocalStorage.get(projectsLS)
      if(projects && projects.length){
        setProjectsFromLS(projects)
      }
  
      const tasks = LocalStorage.get(tasksLS)
      if(tasks && tasks.length){
        setTasksFromLS(tasks, 0)
      }
  
      const subtasks = LocalStorage.get(subtasksLS)
      if(subtasks && subtasks.length){
        setTasksFromLS(subtasks, 1)
      }
  
      const subsubtasks = LocalStorage.get(subsubtasksLS)
      if(subsubtasks && subsubtasks.length){
        setTasksFromLS(subsubtasks, 2)
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

    {/* @ts-ignore */}
    return <App links={links} />
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects,
    tasks: state.tasksReducer.tasks,
    subtasks: state.tasksReducer.subtasks,
    subsubtasks: state.tasksReducer.subsubtasks,
})
  
const mapDispatchToProps = {
    setProjectsFromLS: projectsActions.setProjectsFromLS,
    setTasksFromLS: tasksActions.setTasksFromLS
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(AppContainer)
