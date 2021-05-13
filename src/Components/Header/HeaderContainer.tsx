import { FC, useEffect, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import Header from "./Header"

const HeaderContainer: FC<RouteComponentProps> = ({ location }) => {
    const [ openMenu, setOpenMenu ] = useState(false)

    useEffect(() => {
        setOpenMenu(false)
    }, [location.pathname])

    return <Header openMenu={openMenu} setOpenMenu={setOpenMenu}/>
}

export default withRouter(HeaderContainer)