


function combineReducers(reducers: any){
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


const createStore = function(reducer: Function, initState: any){
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

    return {
        combineReducers,
        subscribe,
        dispatch,
        getState
    }
}

let initState = {
    counter: {
        count: 0
    },
    info: {
        name: '',
        description: ''
    }
}

let reducer = (state: any, action: any) => {
    switch(action.type){
        case 'INCREMENT': {
            return {
                ...state,
                counter: {
                    count: state.counter.count + action.payload
                }
            }
        }
        case 'DECREMENT': {
            return {
                ...state,
                counter: {
                    count: state.counter.count - action.payload
                }
            }
        }
        default: return state
    }
}

let counterReducer = (state: any, action: any) => {
    switch(action.type){
        case 'INCREMENT': {
            return {
                ...state,
                count: state.count + action.payload
            }
        }
        case 'DECREMENT': {
            return {
                ...state,
                count: state.count - action.payload
            }
        }
        default: return state
    }
}

let infoReducer = (state: any, action: any) => {
    return state
}

let reducerOfCombined = combineReducers({
    counter: counterReducer,
    info: infoReducer,
})

let store = createStore(reducerOfCombined, initState)

store.subscribe(() => {
    let state = store.getState()
    console.log(`${state.info.name}: ${state.info.description}`)
})

store.subscribe(() => {
    let state = store.getState()
    console.log(state.counter.count)
})

store.dispatch({
    type: 'INCREMENT',
    payload: 2
})


store.dispatch({
    type: 'DECREMENT',
    payload: 1,
})

store.dispatch({
    type: 'whatever',
    payload: 'not a number'
})