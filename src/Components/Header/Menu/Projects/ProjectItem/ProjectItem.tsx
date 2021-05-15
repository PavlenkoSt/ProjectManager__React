import { FC } from "react"
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import s from './projectItem.module.css'

type ProjectItemPropsType = {
    name: string
    link: string
}

const ProjectItem: FC<ProjectItemPropsType & RouteComponentProps> = ({ name, link, location }) => {

    const activeLink = location.pathname.match(link)

    return (
        <li>
            <NavLink className={(activeLink && activeLink[0]) === link ? `${s.link} ${s.active}` : `${s.link}`} to={link}>{name}</NavLink>
        </li>
    )
}

export default withRouter(ProjectItem)