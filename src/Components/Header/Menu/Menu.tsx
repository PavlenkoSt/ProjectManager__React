import { Dispatch, FC, SetStateAction } from 'react'
import Projects from './Projects/Projects'
import s from './menu.module.css'
import { NavLink } from 'react-router-dom'

type MenuPropsType = {
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Menu: FC<MenuPropsType> = ({ openMenu, setOpenMenu }) => {
    return (
        <div className={`${s.menu} ${openMenu ? s.show : ''}`}>
            <Projects openMenu={openMenu} activeMode={true}/>
            <Projects openMenu={openMenu} activeMode={false}/>
            <NavLink onClick={() => setOpenMenu(false)} className={s.addNewProj} to='/add-new-project'>Добавить новый проект</NavLink>
        </div>
    )
}

export default Menu