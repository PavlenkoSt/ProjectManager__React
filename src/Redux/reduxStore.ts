import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type ProreptiesType<T> = T extends { [key: string]: infer U} ? U : never
export type ActionTypes<T extends {[key: string] : (...args: any) => any}> = ReturnType<ProreptiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


export default store