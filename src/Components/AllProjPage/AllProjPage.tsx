import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { filterOptionSelector, projectsSelector } from '../../Redux/selectors/projectsSelectors'
import AllProjFilter from './AllProjFilter/AllProjFilter'
import s from './allProjPage.module.scss'
import AllProjTable from './AllProjTable/AllProjTable'

const AllProjPage = () => {

    const projects = useSelector(projectsSelector)
    const filterOption = useSelector(filterOptionSelector)

    const targetProjects = projects.filter(project => {
        if(filterOption === 'all'){
            return project
        }else if(filterOption === 'completed'){
            return project.completed
        }else{
            return !project.completed
        }
    })

    const noProj = !projects.length
        ? <p className={s.noProj}>Проектов пока нет. <NavLink to='/add-new-project'>Добавьте первый.</NavLink></p> 
        : <p className={s.noProj}>Проектов по даному фильтру нет. Попробуйте другой.</p>

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Все проекты</h2>
            </div>
            <AllProjFilter/>
            { targetProjects.length ? (
                <>
                    <AllProjTable targetProjects={targetProjects} />
                    <div className={s.linkArea}>
                        <NavLink to='/add-new-project'>Добавить новый проект</NavLink>
                    </div>
                </>
            ) : noProj }
        </div>
    )
}

export default AllProjPage