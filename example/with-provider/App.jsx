import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import connect from '../../src/connect'

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

class StoreDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('this.props..', this.props)
        return <div>
            <p>StoreDemo</p>
            count: {this.props.count}
            <button onClick={() => this.props.add()}>+1</button>
            <button onClick={() => this.props.minus()}>-1</button>
        </div>
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(StoreDemo)

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>app-with-provider
            <Connected />
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))