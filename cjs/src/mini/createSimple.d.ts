export declare const createStoreSimple: (initState: any) => {
    getState: () => any;
    setState: (newState: any) => void;
    subscribe: (listener: Function) => () => void;
};
