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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var createSimple_1 = require("./createSimple");
var store = createSimple_1.createStoreSimple({ count: 12 });
function connect(WrapComponent) {
    return /** @class */ (function (_super) {
        __extends(Connected, _super);
        function Connected(props) {
            var _this = _super.call(this, props) || this;
            _this.state = store.getState();
            return _this;
        }
        Connected.prototype.unsub = function () { };
        Connected.prototype.componentDidMount = function () {
            var _this = this;
            this.unsub = store.subscribe(function () {
                _this.setState(store.getState());
            });
        };
        Connected.prototype.componentWillUnmount = function () {
            this.unsub();
        };
        Connected.prototype.render = function () {
            return react_1.default.createElement(WrapComponent, __assign({}, this.state, this.props));
        };
        return Connected;
    }(react_1.Component));
}
exports.default = connect;
