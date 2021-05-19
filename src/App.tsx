import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage'
import AllProjPageContainer from './Components/AllProjPage/AllProjPageContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import MainPage from './Components/MainPage/MainPage'
import ProjectPageContainer from './Components/ProjectPage/ProjectPageContainer'
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  )
}

export default App
