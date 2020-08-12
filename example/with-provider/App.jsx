import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return <div>app-with-provider</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))