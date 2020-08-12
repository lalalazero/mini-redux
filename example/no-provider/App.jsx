import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Store, StoreSimple } from '../../src/index'

const { createStore, combineReducers } = Store
const countReducer =  (state = 0, action) => {
    switch(action.type){
        case 'increment': {
            return state + 1
        }
        case 'decrement': {
            return state - 1
        }
        default: return state;
    }
}
let store = createStore(combineReducers({
    count: countReducer
}))

class StoreDemo extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: store.getState().count
        }
    }

    increment = () => {
        store.dispatch({ type: 'increment' })
    }

    decrement = () => {
        store.dispatch({ type: 'decrement' })
    }

    componentDidMount(){
        this.unsub = store.subscribe(() => {
            let newCount = store.getState().count
            this.setState({
                count: newCount
            })
        })
    }

    componentWillUnmount(){
        this.unsub()
    }

    render(){
        const { count } = this.state
        return <div>
            <p>app-no-provider, use Store</p>
            <p>count: { count }</p>
            <p><button onClick={this.increment}>+1</button><button onClick={this.decrement}>-1</button></p>
        </div>
    }
}


// StoreSimple
const { createStoreSimple } = StoreSimple 
let storeSimple = createStoreSimple({ count: 0 })

class StoreSimpleDemo extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: storeSimple.getState().count
        }
    }
    increment = () => {
        storeSimple.setState({ count: storeSimple.getState().count + 1})
    }
    decrement = () => {
        storeSimple.setState({ count: storeSimple.getState().count - 1})
    }
    componentDidMount(){
        this.unsub = storeSimple.subscribe(() => {
            let newCount = storeSimple.getState().count
            this.setState({
                count: newCount
            })
        })
    }
    componentWillUnmount(){
        this.unsub()
    }
    render(){
        const { count } = this.state 
        return <div>
            <p>app-no-provider, use StoreSimple</p>
            <p>count: { count }</p>
            <p><button onClick={this.increment}>+1</button><button onClick={this.decrement}>-1</button></p>
        </div>
    }
}

const App = () => (
    <div>
        <StoreDemo />
        <StoreSimpleDemo />
    </div>
)

ReactDOM.render(<App />, document.querySelector('#root'))