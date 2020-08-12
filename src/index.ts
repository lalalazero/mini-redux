


export function combineReducers(reducers: any){
    const reducerKeys = Object.keys(reducers)
    return function combination(state: any = {}, action: any){
        const nextState: any = {}
        for(let i = 0; i < reducerKeys.length; i++){
            const key = reducerKeys[i]
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
        }
        return nextState
    }

}


export const createStore = function(reducer: Function, initState?: any){
    let state: any = initState
    let listeners: Function[] = []

    function subscribe(listener: Function){
        listeners.push(listener)
    }

    function notify(){
        for(let i = 0; i < listeners.length; i++){
            listeners[i]()
        }
    }

    function dispatch(action: any){
        state = reducer(state, action) 
        notify()
    }

    function getState(){
        return state   
    }

    const initAction = {
        type: Symbol('')
    }

    dispatch(initAction)

    return {
        combineReducers,
        subscribe,
        dispatch,
        getState
    }
}

