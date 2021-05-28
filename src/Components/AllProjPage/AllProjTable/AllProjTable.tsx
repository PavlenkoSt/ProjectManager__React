import { FC } from "react"
import { ProjectType } from "../../../Redux/projectsReducer"
import AllProjItem from "./AllProjItem/AllProjItem"
import s from './allProjTable.module.css'

type AllProjTablePropsType = {
    targetProjects: Array<ProjectType>
    deleteProject: (id: number) => void
}

const AllProjTable: FC<AllProjTablePropsType> = ({ targetProjects, deleteProject }) => {

    const projectToTable = targetProjects
        .map(project => <AllProjItem 
            key={project.id} 
            core={project.core}
            name={project.name} 
            desc={project.desc}
            completed={project.completed}
            id={project.id}
            link={project.link}
            deleteProject={deleteProject}
        />)

    return (
        <table className={s.table}>
            <thead>
                <tr>
                    <td>Суть</td>
                    <td>Название</td>
                    <td>Описание</td>
                    <td>Прогресс</td>
                    <td>Завершено</td>
                    <td>Удалить</td>
                </tr>
            </thead>
            <tbody>
                { projectToTable }
            </tbody>
        </table>
    )
}

export default AllProjTable