import React, { FC } from 'react'
import { connect } from 'react-redux'
import { projectsActions, ProjectType } from '../../Redux/projectsReducer'
import { AppStateType } from '../../Redux/reduxStore'
import AllProjPage from './AllProjPage'

type AllProjPageContainerPropsType = {

}

type MapStatePropsType = {
    projects: Array<ProjectType>
    filterOption: string
}

type MapDispatchPropsType = {
    deleteProject: (id: number) => void
    changeFilterOption: (filterOption: string) => void
}

const AllProjPageContainer: FC<AllProjPageContainerPropsType & MapStatePropsType & MapDispatchPropsType> = ({ projects, filterOption, deleteProject, changeFilterOption }) => {

    const targetProjects = projects.filter(project => {
        if(filterOption === 'all'){
            return project
        }else if(filterOption === 'completed'){
            return project.completed
        }else{
            return !project.completed
        }
    })

    return <AllProjPage 
        targetProjects={targetProjects}
        filterOption={filterOption}
        deleteProject={deleteProject}
        changeFilterOption={changeFilterOption}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects,
    filterOption: state.projectsReducer.filterOption
})

const mapDispatchToProps = {
    deleteProject: projectsActions.deleteProject,
    changeFilterOption: projectsActions.changeFilterOption
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjPageContainer)
