var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var createStore = function (reducer, initState) {
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
    return {
        subscribe: subscribe,
        dispatch: dispatch,
        getState: getState
    };
};
var initState = {
    counter: {
        count: 0
    },
    info: {
        name: '',
        description: ''
    }
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'INCREMENT': {
            return __assign({}, state, { counter: {
                    count: state.counter.count + action.payload
                } });
        }
        case 'DECREMENT': {
            return __assign({}, state, { counter: {
                    count: state.counter.count - action.payload
                } });
        }
        default: return state;
    }
};
var store = createStore(reducer, initState);
store.subscribe(function () {
    var state = store.getState();
    console.log(state.info.name + ": " + state.info.description);
});
store.subscribe(function () {
    var state = store.getState();
    console.log(state.counter.count);
});
store.dispatch({
    type: 'INCREMENT',
    payload: 2
});
store.dispatch({
    type: 'DECREMENT',
    payload: 1
});
store.dispatch({
    type: 'whatever',
    payload: 'not a number'
});
