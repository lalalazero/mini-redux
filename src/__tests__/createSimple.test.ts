import { StoreSimple }  from '../index'
const { createStoreSimple } = StoreSimple


test('createSimpleStore', () => {
    let store = createStoreSimple({ count: 0 })
    expect(store.getState()).toEqual({ count: 0})
})

test('setState', () => {
    let store = createStoreSimple({ foo: 'foo', bar: false})
    store.setState({...store.getState(), bar: true })
    expect(store.getState()).toEqual({ foo: 'foo', bar: true})
})

test('subscribe and unsubscribe', () => {
    let store = createStoreSimple({ foo: 'foo' })
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    store.subscribe(listener1)
    let unsubscribe = store.subscribe(listener2)
    store.setState({ foo: 'hello' })
    
    expect(listener1).toBeCalled()
    expect(listener2).toBeCalled()

    unsubscribe()

    store.setState({ foo: 'world' })

    expect(listener1).toHaveBeenCalledTimes(2)
    expect(listener2).toHaveBeenCalledTimes(1)
    

    
})

