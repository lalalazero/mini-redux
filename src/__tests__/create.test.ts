import { createStore, combineReducers } from '../index'

// test('create', () => {
//     let store = createStore()
// })

let counterReducer = (state = { count: 0 }, action: any) => {
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

let infoReducer = (state: { name: '', description: ''} = { name: '', description: ''}, action: any) => {
    return state
}

let reducerOfCombined = combineReducers({
    counter: counterReducer,
    info: infoReducer,
})

let store = createStore(reducerOfCombined)

console.log('test with node.js')

console.log(store.getState())

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