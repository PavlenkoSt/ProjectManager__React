import { FC } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { projectsActions, ProjectType } from '../../Redux/projectsReducer'
import { AppStateType } from '../../Redux/reduxStore'
import AllProjFilter from './AllProjFilter/AllProjFilter'
import s from './allProjPage.module.css'
import AllProjTable from './AllProjTable/AllProjTable'

type MapStatePropsType = {
    projects: Array<ProjectType>
    filterOption: string
}

type MapDispatchPropsType = {
    deleteProject: (id: number) => void
    changeFilterOption: (filterOption: string) => void
}

const AllProjPage: FC<MapStatePropsType & MapDispatchPropsType> = ({ projects, filterOption, deleteProject, changeFilterOption }) => {

    const targetProjects = projects.filter(project => {
        if(filterOption === 'all'){
            return project
        }else if(filterOption === 'completed'){
            return project.completed
        }else{
            return !project.completed
        }
    })

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

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects,
    filterOption: state.projectsReducer.filterOption
})

const mapDispatchToProps = {
    deleteProject: projectsActions.deleteProject,
    changeFilterOption: projectsActions.changeFilterOption
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjPage)