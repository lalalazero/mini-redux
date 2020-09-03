"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function bindActionCreator(actionCreator, dispatch) {
    if (typeof actionCreator === 'function') {
        return function () { return dispatch(actionCreator.apply(undefined, arguments)); };
    }
}
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error('actionCreators should be a function or a object.');
    }
    var keys = Object.keys(actionCreators);
    var boundActions = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActions[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return boundActions;
}
exports.bindActionCreators = bindActionCreators;
function applyMiddlewares(middlewares) {
    return function rewriteStore(oldCreateStore) {
        return function newCreateStore(reducer, initState) {
            var store = oldCreateStore(reducer, initState);
            var dispatch = store.dispatch, getState = store.getState;
            middlewares = middlewares.map(function (middleware) { return middleware({ getState: getState, dispatch: dispatch }); });
            middlewares.reverse().map(function (middleware) {
                dispatch = middleware(dispatch);
            });
            store.dispatch = function (action) {
                dispatch(action);
            };
            return store;
        };
    };
}
exports.applyMiddlewares = applyMiddlewares;
exports.createStore = function (reducer, initState, rewriteStore) {
    if (rewriteStore && typeof rewriteStore === 'function') {
        return rewriteStore(exports.createStore)(reducer, initState);
    }
    var state = initState;
    var listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    function notify() {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function dispatch(action) {
        if (reducer) {
            state = reducer(state, action);
        }
        notify();
    }
    function getState() {
        return state;
    }
    var initAction = {
        type: Symbol('')
    };
    // 初始化所有 state
    dispatch(initAction);
    return {
        combineReducers: combineReducers,
        subscribe: subscribe,
        dispatch: dispatch,
        getState: getState,
    };
};
