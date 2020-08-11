

const createStore = function(initState: any){
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

    function changeState(newState: any){
        state = newState 
        notify()
    }

    function getState(){
        return state
    }

    return {
        subscribe,
        changeState,
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

let store = createStore(initState)

store.subscribe(() => {
    let state = store.getState()
    console.log(`${state.info.name}: ${state.info.description}`)
})

store.subscribe(() => {
    let state = store.getState()
    console.log(state.counter.count)
})

store.changeState({
    ...store.getState(),
    info: {
        name: 'jack',
        description: 'is a boy'
    }
})


store.changeState({
    ...store.getState(),
    counter: {
        count: 2
    }
})

store.changeState({
    ...store.getState(),
    counter: {
        count: 'whatever but not a number'
    }
})