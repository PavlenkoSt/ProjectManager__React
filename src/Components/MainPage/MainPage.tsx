import MainPageHeader from "./MainPageHeader/MainPageHeader"
import s from './mainPage.module.css'
import Cards from "./Cards/Cards"

const MainPage = () => {
    return (
        <div className={s.container}>
            <MainPageHeader />
            <Cards />
        </div>
    )
}

export default MainPage