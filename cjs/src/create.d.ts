export declare function combineReducers(reducers: any): (state: any, action: any) => any;
export declare type ActionCreatorType = {
    [key: string]: Function;
};
export declare function bindActionCreators(actionCreators: Function | ActionCreatorType, dispatch: Function): (() => any) | {
    [key: string]: Function;
} | undefined;
export declare function applyMiddlewares(middlewares: Function[]): (oldCreateStore: Function) => (reducer: Function, initState: any) => any;
export declare const createStore: (reducer: Function, initState: any, rewriteStore?: Function | undefined) => any;
