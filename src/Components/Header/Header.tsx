import { useState } from 'react'
import Menu from '../Menu/Menu'
import Burger from './Burger/Burger'
import s from './header.module.css'

const Header = () => {

    const [ openMenu, setOpenMenu ] = useState(false)

    return (
        <header className={`${s.header} ${openMenu ? s.wide : ''}`}>    
            <Burger openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Menu openMenu={openMenu}/>
        </header>
    )
}

export default Header