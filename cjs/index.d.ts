export declare function combineReducers(reducers: any): (state: any, action: any) => any;
export declare const createStore: (reducer: Function, initState?: any) => {
    combineReducers: typeof combineReducers;
    subscribe: (listener: Function) => void;
    dispatch: (action: any) => void;
    getState: () => any;
};
