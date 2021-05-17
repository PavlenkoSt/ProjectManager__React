import s from './allProjPage.module.css'
import AllProjTable from './AllProjTable/AllProjTable'

const AllProjPage = () => {
    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Все проекты</h2>
            </div>
            <AllProjTable/>
        </div>
    )
}


export default AllProjPage