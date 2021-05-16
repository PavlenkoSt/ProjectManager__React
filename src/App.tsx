import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage';
import HeaderContainer from './Components/Header/HeaderContainer';
import MainPage from './Components/MainPage/MainPage';
import ProjectPage from './Components/ProjectPage/ProjectPage';
import store from './Redux/reduxStore';

const App = () => {

  const links = store.getState().projectsReducer.projects.map(project => '/' + project.link)

  return (
    <div>
      <HeaderContainer/>
      <Switch>
        {/* @ts-ignore */}
        <Route path={links} component={ProjectPage} />
        <Route path='/add-new-project' component={AddNewProjectPage} />
        <Route path='/' exact component={MainPage} />
      </Switch>
    </div>
  )
}

const RouterApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  )
}

export default RouterApp;
