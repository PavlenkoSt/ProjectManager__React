import { Dispatch, FC, SetStateAction } from 'react'
import Burger from './Burger/Burger'
import s from './header.module.css'
import Home from './Home/Home'
import Menu from './Menu/Menu'

type HeaderPropsType = {
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderPropsType> = ({ openMenu, setOpenMenu }) => {
    return (
        <header className={`${s.header} ${openMenu ? s.wide : ''}`}>    
            <Burger openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Menu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Home/>
        </header>
    )
}

export default Header