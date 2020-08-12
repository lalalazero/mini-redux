import React, { Component, ComponentType } from 'react'
import { createStore } from './create'

export type ActionType = {
    [key: string]: Function
}

export type StateType = {
    [key: string]: any
}

export default function connect(mapStateToProps: (state: StateType) => StateType, mapDispatchToProps: (dispatch: Function) => ActionType) {
    return function wrapHOC(WrapComponent: ComponentType<any>) {
        return class Connected extends Component {
            store: any
            unsub() { }
            constructor(props: {}) {
                super(props)
                this.store = createStore(undefined, { count: 0 })
                this.state = mapStateToProps(this.store.getState())
            }

            componentDidMount() {
                this.unsub = this.store.subscribe(() => {
                    this.setState(mapStateToProps(this.store.getState()))
                })
            }

            componentWillUnmount() {
                this.unsub()
            }

            render() {
                const actions = mapDispatchToProps(this.store.dispatch)
                return <WrapComponent  {...this.state} {...this.props} {...actions} />
            }
        }
    }

}