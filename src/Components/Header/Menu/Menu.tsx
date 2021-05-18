import { Dispatch, FC, SetStateAction } from 'react'
import s from './menu.module.css'
import { NavLink } from 'react-router-dom'
import ProjectsContainer from './Projects/ProjectsContainer'

type MenuPropsType = {
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Menu: FC<MenuPropsType> = ({ openMenu, setOpenMenu }) => {
    return (
        <div className={`${s.menu} ${openMenu ? s.show : ''}`}>
            <ProjectsContainer openMenu={openMenu} setOpenMenu={setOpenMenu} activeMode={true}/>
            <ProjectsContainer openMenu={openMenu} setOpenMenu={setOpenMenu} activeMode={false}/>
            <NavLink onClick={() => setOpenMenu(false)} className={s.addNewProj} to='/add-new-project'>Добавить новый проект</NavLink>
        </div>
    )
}

export default Menu