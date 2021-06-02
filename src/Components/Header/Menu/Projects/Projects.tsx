import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { projectsSelector } from "../../../../Redux/selectors/projectsSelectors"
import ProjectItem from "./ProjectItem/ProjectItem"
import s from './projects.module.scss'

type ProjectPropsType = {
    activeMode: boolean
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Projects: FC<ProjectPropsType> = ({ activeMode, openMenu, setOpenMenu }) => {
    const [ showList, setShowList ] = useState(false)
    const projects = useSelector(projectsSelector)

    useEffect(() => {
        if(openMenu === false){
            setShowList(false)
        }
    }, [openMenu])

    const setShowListHandler = () => {
        if(projectsItems.length){
            setShowList(!showList)
        }else{
            setShowList(false)
        }
    }

    const projectsItems = projects
        .filter(project => project.completed === !activeMode )
        .map(project => <ProjectItem key={project.id} setOpenMenu={setOpenMenu} name={project.name} link={project.link} />)

    return (
        <div className={`${s.container} ${showList ? s.active : ''}`}>
            <h2 className={s.header} onClick={() => setShowList(!showList)}> {activeMode ? 'Активные проекты' : 'Завершенные проекты'} <span>({projectsItems.length})</span> </h2>
            <ul className={s.list}>
                { projectsItems }
            </ul>
        </div>
    )
}

export default Projects