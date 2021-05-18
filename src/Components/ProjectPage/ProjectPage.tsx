import s from './projectPage.module.css'
import ProjectTasks from "./ProjectTasks/ProjectTasks"
import AddTaskForm from './AddTaskForm/AddTaskForm'
import { FC } from 'react'
import { ProjectType } from '../../Redux/projectsReducer'

type ProjectPagePropsType = {
    targetProject: ProjectType
}

const ProjectPage: FC<ProjectPagePropsType> = ({ targetProject }) => {
    return (
        <div className={s.container}>
            <h2 className={s.header}>{ `${targetProject.core} "${targetProject.name}"` }</h2>
            { targetProject.desc && <div className={s.desc}>{targetProject.desc}</div> }
            <ProjectTasks projectId={targetProject.id}/>
            <AddTaskForm projectId={targetProject.id} />
        </div>
    )
}

export default ProjectPage