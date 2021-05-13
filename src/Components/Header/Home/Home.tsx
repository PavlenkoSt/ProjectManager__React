import { NavLink } from 'react-router-dom'
import s from './home.module.css'


const Home = () => {
    return (
        <div className={s.home}>
            <NavLink className={s.link} to='/'>
                <div className={s.img}></div>
            </NavLink>
        </div>
    )
}

export default Home