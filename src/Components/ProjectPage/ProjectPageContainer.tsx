import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { ProjectType } from '../../Redux/projectsReducer'
import { AppStateType } from '../../Redux/reduxStore'
import s from './projectPage.module.css'
import ProjectPage from './ProjectPage'

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const ProjectPageContainer: FC< MapStatePropsType & RouteComponentProps> = ({ projects, location }) => {

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

    return <ProjectPage targetProject={targetProject} />
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(ProjectPageContainer)
