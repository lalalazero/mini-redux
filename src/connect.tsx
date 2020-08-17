import React, { Component, ComponentType } from 'react'
import { StateType, ActionType, StoreType } from './types'
import { StoreContext } from './Provider'

export default function connect(mapStateToProps: (state: StateType) => StateType, mapDispatchToProps: (dispatch: Function) => ActionType) {
    return function wrapHOC(WrapComponent: ComponentType<any>) {
        return class Connected extends Component<{ store: StoreType }> {
            static contextType = StoreContext
            // declare store: StoreType will accur errors with babel-loader
            store: any // to remove ts error
            actions: any // to remove ts error
            unsub() { }
            constructor(props: any, context: StoreType) {
                super(props, context)
                this.store = context
                this.state = mapStateToProps(this.store.getState())
                this.actions = mapDispatchToProps(this.store.dispatch)
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
                
                return <WrapComponent  {...this.state} {...this.props} {...this.actions} />

            }
        }
    }

}