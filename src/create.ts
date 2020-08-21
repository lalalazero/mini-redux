export function combineReducers(reducers: any) {
    const reducerKeys = Object.keys(reducers)
    return function combination(state: any = {}, action: any) {
        const nextState: any = {}
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i]
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
        }
        return nextState
    }
}

export function applyMiddlewares(middlewares: Function[]) {
    return function rewriteStore(oldCreateStore: Function){
        return function newCreateStore(reducer: Function, initState: any) {
            let store = oldCreateStore(reducer, initState)
            let { dispatch, getState }= store
            middlewares = middlewares.map(middleware => middleware({ getState, dispatch }))
            middlewares.reverse().map(middleware => {
                dispatch = middleware(dispatch)
            })
            store.dispatch = function(action: any){
                dispatch(action)
            }
            return store
        }
    }
}

export const createStore = function (reducer: Function, initState: any, rewriteStore?: Function) {
    if (rewriteStore && typeof rewriteStore === 'function') {
        return rewriteStore(createStore)(reducer, initState)
    }
    let state: any = initState
    let listeners: Function[] = []
    function subscribe(listener: Function) {
        listeners.push(listener)
        return function unsubscribe() {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    function notify() {
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]()
        }
    }
    function dispatch(action: any) {
        if (reducer) {
            state = reducer(state, action)
        }
        notify()
    }
    function getState() {
        return state
    }
    const initAction = {
        type: Symbol('')
    }
    // 初始化所有 state
    dispatch(initAction)
    return {
        combineReducers,
        subscribe,
        dispatch,
        getState,
    }
}
