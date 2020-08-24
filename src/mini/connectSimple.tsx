import React, { Component, ComponentType } from 'react'
import { createStoreSimple } from './createSimple'

const store = createStoreSimple({ count: 12 })

export default function connect(WrapComponent: ComponentType<any>) {
    return class Connected extends Component {
        constructor(props: {}) {
            super(props)
            this.state = store.getState()
        }

        unsub() { }

        componentDidMount() {
            this.unsub = store.subscribe(() => {
                this.setState(store.getState())
            })
        }

        componentWillUnmount() {
            this.unsub()
        }

        render() {
            return <WrapComponent  {...this.state} {...this.props} />
        }
    }
}