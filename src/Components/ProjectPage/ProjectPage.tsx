import { FC } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import { compose } from "redux"
import { ProjectType } from "../../Redux/projectsReducer"
import { AppStateType } from "../../Redux/reduxStore"
import s from './projectPage.module.css'
import ProjectTasks from "./ProjectTasks/ProjectTasks"
import AddTaskForm from './AddTaskForm/AddTaskForm'

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const ProjectPage: FC<RouteComponentProps & MapStatePropsType> = ({ location, projects }) => {

    const projectLink = location.pathname.match(/.+/)
    const project = projects.filter(project => {
        if(projectLink){
            return project.link === projectLink[0].substr(1)
        }else return false
    })
    
    if(!project.length){
        return <h2 className={s.noPage}>Ошибка! Страница не найдена!</h2>
    }

    const targetProject = project[0]

    return (
        <div className={s.container}>
            <h2 className={s.header}>{ `${targetProject.core} ${targetProject.name}` }</h2>
            <ProjectTasks projectId={targetProject.id}/>
            <AddTaskForm/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(ProjectPage)