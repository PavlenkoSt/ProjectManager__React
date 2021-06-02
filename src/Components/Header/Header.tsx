import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Burger from './Burger/Burger'
import s from './header.module.scss'
import Home from './Home/Home'
import Menu from './Menu/Menu'

const Header = () => {
    const history = useHistory()
    const [ openMenu, setOpenMenu ] = useState(false)

    useEffect(() => {
        setOpenMenu(false)
    }, [history.location.pathname])

    return (
        <header className={`${s.header} ${openMenu ? s.wide : ''}`}>    
            <Burger openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Menu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Home/>
        </header>
    )
}

export default Header