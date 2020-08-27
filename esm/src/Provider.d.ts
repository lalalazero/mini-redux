import React, { Component } from 'react';
import { StoreType } from './types';
export declare const StoreContext: React.Context<StoreType | null>;
export default class Provider extends Component<{
    store: StoreType;
}> {
    constructor(props: any);
    render(): JSX.Element;
}
