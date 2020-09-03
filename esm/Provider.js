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
import React, { createContext, Component } from 'react';
export var StoreContext = createContext(null);
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        return _super.call(this, props) || this;
    }
    Provider.prototype.render = function () {
        return (React.createElement(StoreContext.Provider, { value: this.props.store }, this.props.children));
    };
    return Provider;
}(Component));
export default Provider;
