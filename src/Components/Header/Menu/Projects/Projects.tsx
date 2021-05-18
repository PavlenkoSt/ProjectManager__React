import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import s from './projects.module.css'
import ProjectItem from "./ProjectItem/ProjectItem"
import { ProjectType } from "../../../../Redux/projectsReducer"
import { AppStateType } from "../../../../Redux/reduxStore"

type ProjectPropsType = {
    activeMode: boolean
    openMenu: boolean
}

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const Projects: FC<ProjectPropsType & MapStatePropsType> = ({ activeMode, projects, openMenu }) => {

    const [ showList, setShowList ] = useState(false)

    useEffect(() => {
        if(openMenu === false){
            setShowList(false)
        }
    }, [openMenu])

    const projectsItems = projects
        .filter(project => project.completed === !activeMode )
        .map(project => <ProjectItem key={project.id} name={project.name} link={project.link} />)

    return (
        <div className={`${s.container} ${showList ? s.active : ''}`}>
            <h2 className={s.header} onClick={() => setShowList(!showList)}> {activeMode ? 'Активные проекты' : 'Завершенные проекты'} <span>({projectsItems.length})</span> </h2>
            <ul className={s.list}>
                { projectsItems }
            </ul>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})

export default connect(mapStateToProps)(Projects)