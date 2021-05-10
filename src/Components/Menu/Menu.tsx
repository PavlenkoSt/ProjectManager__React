import { FC } from 'react'
import s from './menu.module.css'

type MenuPropsType = {
    openMenu: boolean
}

const Menu: FC<MenuPropsType> = ({ openMenu }) => {
    return (
        <div className={`${s.menu} ${openMenu ? s.show : ''}`}>
            this is menu
        </div>
    )
}

export default Menu