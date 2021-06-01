import { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import getProcentCompletedProj from '../../../../../heplers/getProcentCompletedProj'
import getSubTasksFromTasks from '../../../../../heplers/getSubTasksFromTasks'
import last10Items from '../../../../../heplers/last10Items'
import { projectsSelector } from '../../../../../Redux/selectors/projectsSelectors'
import { subsubtasksSelector, subtasksSelector, tasksSelector } from '../../../../../Redux/selectors/tasksSelector'
import s from './projectList.module.css'

type ProjectListPropsType = {
    allMode: boolean
}

const ProjectList: FC<ProjectListPropsType> = ({ allMode }) => {

    const projects = useSelector(projectsSelector)
    const tasks = useSelector(tasksSelector)
    const subtasks = useSelector(subtasksSelector)
    const subsubtasks = useSelector(subsubtasksSelector)

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

export default ProjectList