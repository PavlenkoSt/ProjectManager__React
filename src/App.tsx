import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage'
import AllProjPageContainer from './Components/AllProjPage/AllProjPageContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import MainPage from './Components/MainPage/MainPage'
import ProjectPageContainer from './Components/ProjectPage/ProjectPageContainer'

type AppPropsType = {
  links: Array<any>
}

const App: FC<AppPropsType> = ({ links }) => {
  return (
    <div>
      <HeaderContainer/>
      <Switch>
        {/* @ts-ignore */}
        <Route path={links} component={ProjectPageContainer} />
        <Route path='/all-projects' component={AllProjPageContainer} />
        <Route path='/add-new-project' component={AddNewProjectPage} />
        <Route path='/' exact component={MainPage} />
      </Switch>
    </div>
  )
}

export default App
