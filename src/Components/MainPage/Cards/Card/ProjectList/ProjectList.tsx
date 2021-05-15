import { FC } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import getProcentCompletedProj from '../../../../../heplers/getProcentCompletedProj'
import getSubTasksFromTasks from '../../../../../heplers/getSubTasksFromTasks'
import last10Items from '../../../../../heplers/last10Items'
import { ProjectType } from '../../../../../Redux/projectsReducer'
import { AppStateType } from '../../../../../Redux/reduxStore'
import { TaskType } from '../../../../../Redux/tasksReducer'
import s from './projectList.module.css'

type ProjectListPropsType = {
    allMode: boolean
}

type MapStatePropsType = {
    projects: Array<ProjectType>
    tasks: Array<TaskType>
    subtasks: Array<any>
    subsubtasks: Array<any>
}

const ProjectList: FC<ProjectListPropsType & MapStatePropsType> = ({ allMode, projects, tasks, subtasks, subsubtasks }) => {

    const projectList = allMode ? projects : projects.filter(project => project.completed === false)
    const last10 = last10Items(projectList)
    const projectItems = last10.map(project => {

        const targetTasks = tasks.filter(task => task.forProject === project.id)
        const targetSubtasks = getSubTasksFromTasks(targetTasks, subtasks)
        const targetSubSubtasks = getSubTasksFromTasks(targetSubtasks, subsubtasks)
        
        const procent = getProcentCompletedProj({
            tasks: targetTasks,
            subtasks: targetSubtasks,
            subsubtasks: targetSubSubtasks
        }, project.id)

        return (
            <li key={project.id}>
                <NavLink to={project.link}>{project.name}</NavLink>
                <div className={s.progress} title='Статус по задачам'>
                    <div className={s.status}>{project.completed ? '100%' : procent + '%'}</div>
                    <div style={project.completed ? {width: '100%'} : {width: procent + '%'}} className={s.line}></div>
                </div>
            </li>
        )}
    )

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
    projects: state.projectsReducer.projects,
    tasks: state.tasksReducer.tasks,
    subtasks: state.tasksReducer.subtasks,
    subsubtasks: state.tasksReducer.subsubtasks
})

export default connect(mapStateToProps)(ProjectList)