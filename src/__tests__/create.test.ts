import { Store } from '../index'
const { createStore, combineReducers } = Store

test('combineReducers', () => {
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
    expect(store.getState()).toEqual({ info: { name: '', description: ''}, counter: { count: 0 }})
})


test('dispatch', () => {
    let countReducer: Function = (state: number = 0, action: { type: string }) => {
        switch(action.type) {
            case 'add': {
                return state + 1
            }
            case 'minus': {
                return state - 1
            }
            default: return state
        }

    }
    let store = createStore(combineReducers({
        count: countReducer
    }))
    expect(store.getState()).toEqual({ count: 0})
    store.dispatch({
        type: 'add'
    })
    expect(store.getState()).toEqual({ count: 1})
})


test('subscribe and unsubscribe', () => {
    let countReducer: Function = (state: number = 0, action: { type: string }) => {
        switch(action.type) {
            case 'add': {
                return state + 1
            }
            case 'minus': {
                return state - 1
            }
            default: return state
        }
    }
    let store = createStore(combineReducers({
        count: countReducer
    }))
    expect(store.getState()).toEqual({ count: 0})
    const listener1 = jest.fn()
    const unsubscribe = store.subscribe(listener1)

    store.dispatch({
        type: 'add'
    })
    expect(listener1).toBeCalled()
    expect(store.getState()).toEqual({ count: 1})
    unsubscribe()
    store.dispatch({
        type: 'add'
    })
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(store.getState()).toEqual({ count: 2})

})
