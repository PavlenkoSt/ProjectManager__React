import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ProjectType } from '../../../../Redux/projectsReducer'
import { AppStateType } from '../../../../Redux/reduxStore'
import ProjectItem from './ProjectItem/ProjectItem'
import Projects from './Projects'

type ProjectsContainerPropsType = {
    activeMode: boolean
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const ProjectsContainer: FC<ProjectsContainerPropsType & MapStatePropsType> = ({ activeMode, projects, openMenu, setOpenMenu }) => {

    const [ showList, setShowList ] = useState(false)

    useEffect(() => {
        if(openMenu === false){
            setShowList(false)
        }
    }, [openMenu])

    const projectsItems = projects
        .filter(project => project.completed === !activeMode )
        .map(project => <ProjectItem key={project.id} setOpenMenu={setOpenMenu} name={project.name} link={project.link} />)

    return <Projects 
        activeMode={activeMode} 
        projectsItems={projectsItems}
        setShowList={setShowList}
        showList={showList}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default connect(mapStateToProps)(ProjectsContainer)
