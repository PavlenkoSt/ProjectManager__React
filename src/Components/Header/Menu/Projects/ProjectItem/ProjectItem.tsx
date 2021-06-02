import { Dispatch, FC, SetStateAction } from "react"
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import s from './projectItem.module.scss'

type ProjectItemPropsType = {
    name: string
    link: string
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const ProjectItem: FC<ProjectItemPropsType & RouteComponentProps> = ({ name, link, setOpenMenu, location }) => {

    const activeLink = location.pathname.match(link)

    return (
        <li>
            <NavLink 
                onClick={() => setOpenMenu(false)}
                className={(activeLink && activeLink[0]) === link ? `${s.link} ${s.active}` : `${s.link}`} 
                to={link}
            >{name}</NavLink>
        </li>
    )
}

export default withRouter(ProjectItem)