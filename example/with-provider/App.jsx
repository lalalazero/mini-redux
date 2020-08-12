import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import connectSimple from '../../src/connectSimple'

class StoreSimpleDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <p>StoreSimpleDemo</p>
            count: {this.props.count}
        </div>
    }
}

const Connected = connectSimple(StoreSimpleDemo)

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