function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    return function combination(state = {}, action) {
        const nextState = {};
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    };
}
const createStore = function (reducer, initState) {
    let state = initState;
    let listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
    }
    function notify() {
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function dispatch(action) {
        state = reducer(state, action);
        notify();
    }
    function getState() {
        return state;
    }
    const initAction = {
        type: Symbol('')
    };
    dispatch(initAction);
    return {
        combineReducers,
        subscribe,
        dispatch,
        getState
    };
};
let counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            return Object.assign({}, state, { count: state.count + action.payload });
        }
        case 'DECREMENT': {
            return Object.assign({}, state, { count: state.count - action.payload });
        }
        default: return state;
    }
};
let infoReducer = (state = { name: '', description: '' }, action) => {
    return state;
};
let reducerOfCombined = combineReducers({
    counter: counterReducer,
    info: infoReducer,
});
let store = createStore(reducerOfCombined);
console.log(store.getState());
store.subscribe(() => {
    let state = store.getState();
    console.log(`${state.info.name}: ${state.info.description}`);
});
store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count);
});
store.dispatch({
    type: 'INCREMENT',
    payload: 2
});
store.dispatch({
    type: 'DECREMENT',
    payload: 1,
});
store.dispatch({
    type: 'whatever',
    payload: 'not a number'
});
