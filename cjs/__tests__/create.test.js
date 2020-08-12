"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
// test('create', () => {
//     let store = createStore()
// })
var counterReducer = function (state, action) {
    if (state === void 0) { state = { count: 0 }; }
    switch (action.type) {
        case 'INCREMENT': {
            return __assign(__assign({}, state), { count: state.count + action.payload });
        }
        case 'DECREMENT': {
            return __assign(__assign({}, state), { count: state.count - action.payload });
        }
        default: return state;
    }
};
var infoReducer = function (state, action) {
    if (state === void 0) { state = { name: '', description: '' }; }
    return state;
};
var reducerOfCombined = index_1.combineReducers({
    counter: counterReducer,
    info: infoReducer,
});
var store = index_1.createStore(reducerOfCombined);
console.log('test with node.js');
console.log(store.getState());
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
    payload: 1,
});
store.dispatch({
    type: 'whatever',
    payload: 'not a number'
});
