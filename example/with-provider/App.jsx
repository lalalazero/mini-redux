import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import connect from '../../src/connect'
import Provider from '../../src/Provider'
import { createStore, combineReducers } from '../../src/create'

const countReducer = (state, action) => {
    switch (action.type) {
        case 'increment': return state + 1
        case 'decrement': return state - 1
        default: return state
    }
}
const store = createStore(combineReducers({
    count: countReducer
}), { count: 100 })

class StoreDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <p>StoreDemo</p>
            <p>count: {this.props.count}</p>
            <button onClick={() => this.props.add()}>+1</button>
            <button onClick={() => this.props.minus()}>-1</button>
        </div>
    }
}
function mapStateToProps(state) {
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        'add': () => dispatch({ type: 'increment' }),
        'minus': () => dispatch({ type: 'decrement' })
    }
}
const Connected = connect(mapStateToProps, mapDispatchToProps)(StoreDemo)

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider store={store}>
            <div>app-with-provider
                    <Connected />
            </div>
        </Provider>

    }
}

ReactDOM.render(<App />, document.querySelector('#root'))