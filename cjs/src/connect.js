"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Provider_1 = require("./Provider");
var shallowequal_1 = __importDefault(require("shallowequal"));
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
function connect(mapStateToProps, mapDispatchToProps) {
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
                    return (!shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.state, nextState));
                };
                Connected.prototype.componentWillUnmount = function () {
                    this.unsub();
                };
                Connected.prototype.render = function () {
                    return react_1.default.createElement(WrapComponent, __assign({}, this.state, this.props, this.actions));
                };
                return Connected;
            }(react_1.Component)),
            _a.contextType = Provider_1.StoreContext,
            _a.displayName = "Connect" + getDisplayName(WrapComponent),
            _a;
    };
}
exports.default = connect;
