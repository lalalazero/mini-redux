

const createStore = function(reducer: Function, initState: any){
    let state = initState
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

let store = createStore(reducer, initState)

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