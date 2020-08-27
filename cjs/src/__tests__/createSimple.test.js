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
var createStoreSimple = index_1.StoreSimple.createStoreSimple;
describe('test createSimple.ts', function () {
    test('createSimpleStore', function () {
        var store = createStoreSimple({ count: 0 });
        expect(store.getState()).toEqual({ count: 0 });
    });
    test('setState', function () {
        var store = createStoreSimple({ foo: 'foo', bar: false });
        store.setState(__assign(__assign({}, store.getState()), { bar: true }));
        expect(store.getState()).toEqual({ foo: 'foo', bar: true });
    });
    test('subscribe and unsubscribe', function () {
        var store = createStoreSimple({ foo: 'foo' });
        var listener1 = jest.fn();
        var listener2 = jest.fn();
        store.subscribe(listener1);
        var unsubscribe = store.subscribe(listener2);
        store.setState({ foo: 'hello' });
        expect(listener1).toBeCalled();
        expect(listener2).toBeCalled();
        unsubscribe();
        store.setState({ foo: 'world' });
        expect(listener1).toHaveBeenCalledTimes(2);
        expect(listener2).toHaveBeenCalledTimes(1);
    });
});
