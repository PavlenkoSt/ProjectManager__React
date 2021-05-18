import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ProjectType } from '../../Redux/projectsReducer'
import AllProjFilter from './AllProjFilter/AllProjFilter'
import s from './allProjPage.module.css'
import AllProjTable from './AllProjTable/AllProjTable'

type AllProjPagePropsType = {
    filterOption: string
    deleteProject: (id: number) => void
    changeFilterOption: (filterOption: string) => void
    targetProjects: Array<ProjectType>
}

const AllProjPage: FC<AllProjPagePropsType> = ({ targetProjects, filterOption, deleteProject, changeFilterOption }) => {

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Все проекты</h2>
            </div>
            { targetProjects.length ? (
                <>
                    <AllProjFilter filterOption={filterOption} changeFilterOption={changeFilterOption}/>
                    <AllProjTable targetProjects={targetProjects} deleteProject={deleteProject}/>
                    <div className={s.linkArea}>
                        <NavLink to='/add-new-project'>Добавить новый проект</NavLink>
                    </div>
                </>
            ) : (
                <p className={s.noProj}>Проектов пока нет. <NavLink to='/add-new-project'>Добавьте первый.</NavLink></p>
            ) }
        </div>
    )
}


export default AllProjPage