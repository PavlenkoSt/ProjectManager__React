import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import './App.css'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage'
import AllProjPageContainer from './Components/AllProjPage/AllProjPageContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import MainPage from './Components/MainPage/MainPage'
import ProjectPageContainer from './Components/ProjectPage/ProjectPageContainer'
import store from './Redux/reduxStore'

const App: FC<RouteComponentProps> = ({ location }) => {
  
  let links = store.getState().projectsReducer.projects && store.getState().projectsReducer.projects.map((project: any) => '/' + project.link)

  useEffect(() => {
    links = store.getState().projectsReducer.projects && store.getState().projectsReducer.projects.map((project: any) => '/' + project.link)
  }, [location.pathname])

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

const AppWithRouter = withRouter(App)

const RouterApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </HashRouter>
  )
}

export default RouterApp;
