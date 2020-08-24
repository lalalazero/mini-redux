import React, { Component, ComponentType } from 'react'
import { StateType, ActionType, StoreType } from './types'
import { StoreContext } from './Provider'
import shallowEqual from 'shallowequal'

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

type mapStateToPropsType = (state: StateType) => StateType
type mapDispatchToPropsType = (dispatch: Function) => ActionType

export default function connect(mapStateToProps: mapStateToPropsType = () => ({}), 
    mapDispatchToProps: mapDispatchToPropsType = () => ({})) {
    return function wrapHOC(WrapComponent: ComponentType<any>) {
        return class Connected extends Component<{ store: StoreType }> {
            static contextType = StoreContext
            static displayName = `Connect${getDisplayName(WrapComponent)}`
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
            shouldComponentUpdate(nextProps: any, nextState: any) {
                return (
                    !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
                )
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