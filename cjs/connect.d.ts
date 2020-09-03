import React from 'react';
import { StateType, ActionType, StoreType } from './types';
declare type mapStateToPropsType = (state: StateType) => StateType;
declare type mapDispatchToPropsType = (dispatch: Function) => ActionType;
export default function connect(mapStateToProps?: mapStateToPropsType, mapDispatchToProps?: mapDispatchToPropsType): (WrapComponent: React.ComponentType<any>) => {
    new (props: any, context: StoreType): {
        store: any;
        actions: any;
        unsub(): void;
        componentDidMount(): void;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            store: StoreType;
        }>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{
            store: StoreType;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType: React.Context<StoreType | null>;
    displayName: string;
};
export {};
