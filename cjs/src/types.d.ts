export declare type ActionType = {
    [key: string]: Function;
};
export declare type StateType = {
    [key: string]: any;
};
export declare type StoreType = {
    getState: () => StateType;
    subscribe: (f: Function) => () => void;
    dispatch: () => void;
};
