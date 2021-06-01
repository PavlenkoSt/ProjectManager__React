import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AddNewProjectPage from './Components/AddNewProjectPage/AddNewProjectPage'
import Header from './Components/Header/Header'
import MainPage from './Components/MainPage/MainPage'
import ProjectPageContainer from './Components/ProjectPage/ProjectPageContainer'
import 'react-toastify/dist/ReactToastify.css'
import AllProjPage from './Components/AllProjPage/AllProjPage'

type AppPropsType = {
  links: Array<string>
}

const App: FC<AppPropsType> = ({ links }) => {
  return (
    <div>
      <Header/>
      <Switch>
        {/* @ts-ignore */}
        <Route path={links} component={ProjectPageContainer} />
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
