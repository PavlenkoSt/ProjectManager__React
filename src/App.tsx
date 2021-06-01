import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage'
import Header from './Components/Header/Header'
import MainPage from './Components/MainPage/MainPage'
import ProjectPage from './Components/ProjectPage/ProjectPage'
import AllProjPage from './Components/AllProjPage/AllProjPage'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

type AppPropsType = {
  links: Array<string>
}

const App: FC<AppPropsType> = ({ links }) => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path={links} component={ProjectPage} />
        <Route path='/all-projects' component={AllProjPage} />
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
