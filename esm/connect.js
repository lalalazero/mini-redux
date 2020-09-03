var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React, { Component } from 'react';
import { StoreContext } from './Provider';
import shallowEqual from 'shallowequal';
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
export default function connect(mapStateToProps, mapDispatchToProps) {
    if (mapStateToProps === void 0) { mapStateToProps = function () { return ({}); }; }
    if (mapDispatchToProps === void 0) { mapDispatchToProps = function () { return ({}); }; }
    return function wrapHOC(WrapComponent) {
        var _a;
        return _a = /** @class */ (function (_super) {
                __extends(Connected, _super);
                function Connected(props, context) {
                    var _this = _super.call(this, props, context) || this;
                    _this.store = context;
                    _this.state = mapStateToProps(_this.store.getState());
                    _this.actions = mapDispatchToProps(_this.store.dispatch);
                    return _this;
                }
                Connected.prototype.unsub = function () { };
                Connected.prototype.componentDidMount = function () {
                    var _this = this;
                    this.unsub = this.store.subscribe(function () {
                        _this.setState(mapStateToProps(_this.store.getState()));
                    });
                };
                Connected.prototype.shouldComponentUpdate = function (nextProps, nextState) {
                    return (!shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState));
                };
                Connected.prototype.componentWillUnmount = function () {
                    this.unsub();
                };
                Connected.prototype.render = function () {
                    return React.createElement(WrapComponent, __assign({}, this.state, this.props, this.actions));
                };
                return Connected;
            }(Component)),
            _a.contextType = StoreContext,
            _a.displayName = "Connect" + getDisplayName(WrapComponent),
            _a;
    };
}
