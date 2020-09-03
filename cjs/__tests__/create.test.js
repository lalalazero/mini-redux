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
var createStore = index_1.Store.createStore, combineReducers = index_1.Store.combineReducers, applyMiddlewares = index_1.Store.applyMiddlewares, bindActionCreators = index_1.Store.bindActionCreators;
describe('test create.ts', function () {
    test('combineReducers', function () {
        var counterReducer = function (state, action) {
            if (state === void 0) { state = { count: 0 }; }
            switch (action.type) {
                case 'INCREMENT': {
                    return __assign({}, state, { count: state.count + action.payload });
                }
                case 'DECREMENT': {
                    return __assign({}, state, { count: state.count - action.payload });
                }
                default: return state;
            }
        };
        var infoReducer = function (state, action) {
            if (state === void 0) { state = { name: '', description: '' }; }
            return state;
        };
        var reducerOfCombined = combineReducers({
            counter: counterReducer,
            info: infoReducer,
        });
        var store = createStore(reducerOfCombined, {});
        expect(store.getState()).toEqual({ info: { name: '', description: '' }, counter: { count: 0 } });
    });
    test('dispatch', function () {
        var countReducer = function (state, action) {
            if (state === void 0) { state = 0; }
            switch (action.type) {
                case 'add': {
                    return state + 1;
                }
                case 'minus': {
                    return state - 1;
                }
                default: return state;
            }
        };
        var store = createStore(combineReducers({
            count: countReducer
        }), {});
        expect(store.getState()).toEqual({ count: 0 });
        store.dispatch({
            type: 'add'
        });
        expect(store.getState()).toEqual({ count: 1 });
    });
    test('subscribe and unsubscribe', function () {
        var countReducer = function (state, action) {
            if (state === void 0) { state = 0; }
            switch (action.type) {
                case 'add': {
                    return state + 1;
                }
                case 'minus': {
                    return state - 1;
                }
                default: return state;
            }
        };
        var store = createStore(combineReducers({
            count: countReducer
        }), {});
        expect(store.getState()).toEqual({ count: 0 });
        var listener1 = jest.fn();
        var unsubscribe = store.subscribe(listener1);
        store.dispatch({
            type: 'add'
        });
        expect(listener1).toBeCalled();
        expect(store.getState()).toEqual({ count: 1 });
        unsubscribe();
        store.dispatch({
            type: 'add'
        });
        expect(listener1).toHaveBeenCalledTimes(1);
        expect(store.getState()).toEqual({ count: 2 });
    });
    test('applyMiddlewares', function () {
        var countReducer = function (state, action) {
            if (state === void 0) { state = 0; }
            switch (action.type) {
                case 'add': {
                    return state + 1;
                }
                case 'minus': {
                    return state - 1;
                }
                default: return state;
            }
        };
        var executionOrder = [];
        var A = function (_a) {
            var getState = _a.getState, dispatch = _a.dispatch;
            return function (next) { return function (action) {
                executionOrder.push(1);
                expect(getState().count).toEqual(0);
                next(action);
                expect(getState().count).toEqual(1);
                executionOrder.push(6);
            }; };
        };
        var B = function (_a) {
            var getState = _a.getState, dispatch = _a.dispatch;
            return function (next) { return function (action) {
                executionOrder.push(2);
                expect(getState().count).toEqual(0);
                next(action);
                executionOrder.push(5);
                expect(getState().count).toEqual(1);
            }; };
        };
        var C = function (_a) {
            var getState = _a.getState, dispatch = _a.dispatch;
            return function (next) { return function (action) {
                executionOrder.push(3);
                expect(getState().count).toEqual(0);
                next(action);
                executionOrder.push(4);
                expect(getState().count).toEqual(1);
            }; };
        };
        var store = createStore(combineReducers({
            count: countReducer
        }), {}, applyMiddlewares([A, B, C]));
        store.dispatch({
            type: 'add'
        });
        expect(store.getState().count).toEqual(1);
        expect(executionOrder.toString()).toEqual('1,2,3,4,5,6');
    });
    test('bindActionCreators - test actionCreator is a function', function () {
        var countReducer = function (state, action) {
            if (state === void 0) { state = 0; }
            switch (action.type) {
                case 'add': {
                    return action.payload ? state + action.payload : state + 1;
                }
                case 'minus': {
                    return action.payload ? state - action.payload : state - 1;
                }
                default: return state;
            }
        };
        var store = createStore(combineReducers({
            count: countReducer
        }), {});
        var actionCreator = function (type, payload) {
            if (type === void 0) { type = 'add'; }
            if (payload === void 0) { payload = 1; }
            return {
                type: type,
                payload: payload
            };
        };
        var boundActions = bindActionCreators(actionCreator, store.dispatch);
        boundActions();
        expect(store.getState()).toEqual({ count: 1 });
        boundActions('add', 2);
        expect(store.getState()).toEqual({ count: 3 });
        boundActions('minus', 3);
        expect(store.getState()).toEqual({ count: 0 });
    });
    test('bindActionCreators - test actionCreator is a object', function () {
        var countReducer = function (state, action) {
            if (state === void 0) { state = 0; }
            switch (action.type) {
                case 'add': {
                    return action.payload ? state + action.payload : state + 1;
                }
                case 'minus': {
                    return action.payload ? state - action.payload : state - 1;
                }
                default: return state;
            }
        };
        var store = createStore(combineReducers({
            count: countReducer
        }), {});
        var add = function (payload) {
            if (payload === void 0) { payload = 1; }
            return {
                type: 'add',
                payload: payload
            };
        };
        var minus = function (payload) {
            if (payload === void 0) { payload = 1; }
            return {
                type: 'minus',
                payload: payload
            };
        };
        var actionCreator = { add: add, minus: minus };
        var boundActions = bindActionCreators(actionCreator, store.dispatch);
        boundActions.add(1);
        expect(store.getState()).toEqual({ count: 1 });
        boundActions.add(2);
        expect(store.getState()).toEqual({ count: 3 });
        boundActions.minus(3);
        expect(store.getState()).toEqual({ count: 0 });
    });
});
