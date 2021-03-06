import { Store } from '../index'
const { createStore, combineReducers, applyMiddlewares, bindActionCreators } = Store

describe('test create.ts', () => {
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
        
        let store = createStore(reducerOfCombined, {})
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
        }), {})
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
        }), {})
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

    test('applyMiddlewares', () => {
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
        
        let executionOrder: number[] = []
        const A = ({ getState, dispatch }: { getState: Function, dispatch: Function }) => (next: Function) => (action: any) => {
            executionOrder.push(1)
            expect(getState().count).toEqual(0)
            next(action)
            expect(getState().count).toEqual(1)
            executionOrder.push(6)
        }
        const B = ({ getState, dispatch }: { getState: Function, dispatch: Function }) => (next: Function) => (action: any) => {
            executionOrder.push(2)
            expect(getState().count).toEqual(0)
            next(action)
            executionOrder.push(5)
            expect(getState().count).toEqual(1)
        }
        const C = ({ getState, dispatch }: { getState: Function, dispatch: Function }) => (next: Function) => (action: any) => {
            executionOrder.push(3)
            expect(getState().count).toEqual(0)
            next(action)
            executionOrder.push(4)
            expect(getState().count).toEqual(1)
        }

        let store = createStore(combineReducers({
            count: countReducer
        }), {}, applyMiddlewares([A,B,C]))

        store.dispatch({
            type: 'add'
        })

        expect(store.getState().count).toEqual(1)
        expect(executionOrder.toString()).toEqual('1,2,3,4,5,6')

    })

    test('bindActionCreators - test actionCreator is a function', () => {
        let countReducer: Function = (state: number = 0, action: { type: string, payload?: number }) => {
            switch(action.type) {
                case 'add': {
                    return action.payload ? state + action.payload : state + 1
                }
                case 'minus': {
                    return action.payload ? state - action.payload : state - 1
                }
                default: return state
            }
    
        }
        let store = createStore(combineReducers({
            count: countReducer
        }), {})
        let actionCreator = function(type: 'add' | 'minus' = 'add', payload: number = 1){
            return {
                type,
                payload
            }
        }
        let boundActions = bindActionCreators(actionCreator, store.dispatch) as Function
        boundActions()
        expect(store.getState()).toEqual({ count: 1 })
        boundActions('add', 2)
        expect(store.getState()).toEqual({ count: 3 })
        boundActions('minus', 3)
        expect(store.getState()).toEqual({ count: 0 })
    })

    test('bindActionCreators - test actionCreator is a object', () => {
        let countReducer: Function = (state: number = 0, action: { type: string, payload?: number }) => {
            switch(action.type) {
                case 'add': {
                    return action.payload ? state + action.payload : state + 1
                }
                case 'minus': {
                    return action.payload ? state - action.payload : state - 1
                }
                default: return state
            }
    
        }
        let store = createStore(combineReducers({
            count: countReducer
        }), {})
        let add = function(payload: number = 1){
            return {
                type: 'add',
                payload
            }
        }
        let minus = function(payload: number = 1) {
            return {
                type: 'minus',
                payload
            }
        }
        let actionCreator = { add, minus }
        let boundActions = bindActionCreators(actionCreator, store.dispatch) as { [key: string]: Function }
        boundActions.add(1)
        expect(store.getState()).toEqual({ count: 1 })
        boundActions.add(2)
        expect(store.getState()).toEqual({ count: 3 })
        boundActions.minus(3)
        expect(store.getState()).toEqual({ count: 0 })
    })
})



