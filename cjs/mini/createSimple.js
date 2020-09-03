"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreSimple = function (initState) {
    var state = initState;
    var listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    function getState() {
        return state;
    }
    function notify() {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function setState(newState) {
        state = newState;
        notify();
    }
    return {
        getState: getState,
        setState: setState,
        subscribe: subscribe
    };
};
