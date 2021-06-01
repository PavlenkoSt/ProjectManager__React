import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import AppContainer from './AppContainer'
import store from './Redux/reduxStore'

const AppRouter = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default AppRouter
