import { Dispatch, FC, SetStateAction } from "react"
import s from './projects.module.css'

type ProjectPropsType = {
    activeMode: boolean
    projectsItems: Array<JSX.Element>
    setShowList: Dispatch<SetStateAction<boolean>>
    showList: boolean
}

const Projects: FC<ProjectPropsType> = ({ activeMode, projectsItems, setShowList, showList }) => {
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