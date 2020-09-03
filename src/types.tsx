export type ActionType = {
    [key: string]: Function
}

export type StateType = {
    [key: string]: any
}

export type StoreType = {
    getState: () => StateType,
    subscribe: (f: Function) => () => void,
    dispatch: () => void
}