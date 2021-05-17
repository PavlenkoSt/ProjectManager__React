import { FC } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { ProjectType } from "../../../Redux/projectsReducer"
import { AppStateType } from "../../../Redux/reduxStore"
import AllProjItem from "./AllProjItem/AllProjItem"
import s from './allProjTable.module.css'

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const AllProjTable: FC<MapStatePropsType> = ({ projects }) => {

    const projectToTable = projects.map(project => <AllProjItem 
        key={project.id} 
        core={project.core}
        name={project.name} 
        desc={project.desc}
        completed={project.completed}
        id={project.id}
        link={project.link}
    />)

    if(!projectToTable.length){
        return <p className={s.noProj}>Проектов пока нет. <NavLink to='/add-new-project'>Добавьте первый.</NavLink></p>
    }

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

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default connect(mapStateToProps)(AllProjTable)