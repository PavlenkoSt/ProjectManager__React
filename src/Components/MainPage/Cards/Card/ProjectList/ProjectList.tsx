import { FC } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import last10Items from '../../../../../heplers/last10Items'
import { ProjectType } from '../../../../../Redux/projectsReducer'
import { AppStateType } from '../../../../../Redux/reduxStore'
import s from './projectList.module.css'

type ProjectListPropsType = {
    allMode: boolean
}

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const ProjectList: FC<ProjectListPropsType & MapStatePropsType> = ({ allMode, projects }) => {

    const projectList = allMode ? projects : projects.filter(project => project.completed === false)
    const last10 = last10Items(projectList)
    const projectItems = last10.map(project => (
        <li key={project.id}>
            <NavLink to={project.link}>{project.name}</NavLink>
            <div className={s.progress} title='Статус по задачам'>
                <div className={s.status}>{project.completed ? '100%' : '50%'}</div>
                <div style={project.completed ? {width: '100%'} : {}} className={s.line}></div>
            </div>
        </li>
    ))

    if(!projectItems.length){
        return <p className={s.noProj}>{allMode ? 'Проектов пока нет!' : 'Активных проектов пока нет!'}</p>
    }

    return (
        <ul className={s.list}>
            {projectItems}
        </ul>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default connect(mapStateToProps)(ProjectList)