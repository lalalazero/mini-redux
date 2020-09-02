# mini-redux

a step by step implement of redux & react-redux.

## Usage

`npm install @zerocodes/mini-redux`

### simple version

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { StoreSimple } from 'zerocodes/mini-redux'

const { createStoreSimple }  = StoreSimple
const store = createStoreSimple({ count: 0 })

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = store.getState()
    }
    onClick = () => {
        const newState = store.setState({ count: store.getState().count + 1 })
        this.setState(newState)
    }
    render(){
        return (
            <div>
                count: { this.state.count }
                <button onClick={this.onClick}>+1</button>
            </div>
        )
    }
}
```

### complete version