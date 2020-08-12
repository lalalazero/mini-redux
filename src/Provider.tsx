import React, { createContext, Component } from 'react'
import { StoreType } from './types'

export const StoreContext = createContext<StoreType | null>(null)

export default class Provider extends Component<{ store: StoreType }> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <StoreContext.Provider value={this.props.store}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}