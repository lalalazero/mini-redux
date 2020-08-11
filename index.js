var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var createStore = function (initState) {
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
    function changeState(newState) {
        state = newState;
        notify();
    }
    function getState() {
        return state;
    }
    return {
        subscribe: subscribe,
        changeState: changeState,
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
var store = createStore(initState);
store.subscribe(function () {
    var state = store.getState();
    console.log(state.info.name + ": " + state.info.description);
});
store.subscribe(function () {
    var state = store.getState();
    console.log(state.counter.count);
});
store.changeState(__assign({}, store.getState(), { info: {
        name: 'jack',
        description: 'is a boy'
    } }));
store.changeState(__assign({}, store.getState(), { counter: {
        count: 2
    } }));
store.changeState(__assign({}, store.getState(), { counter: {
        count: 'whatever but not a number'
    } }));
