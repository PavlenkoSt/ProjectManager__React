import s from './projectPage.module.css'
import ProjectTasks from "./ProjectTasks/ProjectTasks"
import AddTaskForm from './AddTaskForm/AddTaskForm'
import { useSelector } from 'react-redux'
import { projectsSelector } from '../../Redux/selectors/projectsSelectors'
import { useHistory } from 'react-router'

const ProjectPage = () => {
    const history = useHistory()
    const projects = useSelector(projectsSelector)

    const projectLink = history.location.pathname.match(/.+/)
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
            <h2 className={s.header}>{ `${targetProject.core} "${targetProject.name}"` }</h2>
            { targetProject.desc && <div className={s.desc}>{targetProject.desc}</div> }
            <ProjectTasks projectId={targetProject.id}/>
            <AddTaskForm projectId={targetProject.id} />
        </div>
    )
}

export default ProjectPage