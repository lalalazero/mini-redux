"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.combineReducers = void 0;
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var nextState = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            var reducer = reducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    };
}
exports.combineReducers = combineReducers;
exports.createStore = function (reducer, initState) {
    var state = initState;
    var listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
    }
    function notify() {
        for (var i = 0; i < listeners.length; i++) {
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
    var initAction = {
        type: Symbol('')
    };
    dispatch(initAction);
    return {
        combineReducers: combineReducers,
        subscribe: subscribe,
        dispatch: dispatch,
        getState: getState
    };
};
