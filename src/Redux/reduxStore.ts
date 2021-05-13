import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import projectsReducer from './projectsReducer'
import createSagaMiddleware from 'redux-saga'
import tasksReducer from './tasksReducer'

const rootReducer = combineReducers({
    projectsReducer,
    tasksReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type ProreptiesType<T> = T extends { [key: string]: infer U} ? U : never
export type ActionTypes<T extends {[key: string] : (...args: any) => any}> = ReturnType<ProreptiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sageMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sageMiddleware)))


export default store