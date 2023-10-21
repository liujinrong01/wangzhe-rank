"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const nutui_react_taro_1 = require("@nutui/nutui-react-taro");
const Blank_1 = require("@/pages/name/components/Blank");
const Repeat_1 = require("@/pages/name/components/Repeat");
const Symbol_1 = require("@/pages/name/components/Symbol");
require("./index.less");
const theme = {
    nutuiBrandColor: '#6B4EFF',
    nutuiBrandColorStart: '#6B4EFF',
    nutuiBrandColorEnd: '#6B4EFF',
};
function Name() {
    const [tab1value, setTab1value] = (0, react_1.useState)('0');
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(nutui_react_taro_1.ConfigProvider, { theme: theme, children: (0, jsx_runtime_1.jsxs)(nutui_react_taro_1.Tabs, { value: tab1value, onChange: (value) => {
                    setTab1value(value);
                }, children: [(0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tabs.TabPane, { title: '\u7A7A\u767D\u540D ', children: (0, jsx_runtime_1.jsx)(Blank_1.default, {}) }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tabs.TabPane, { title: '\u91CD\u590D\u540D ', children: (0, jsx_runtime_1.jsx)(Repeat_1.default, {}) }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tabs.TabPane, { title: '\u7B26\u53F7\u540D', children: (0, jsx_runtime_1.jsx)(Symbol_1.default, {}) })] }) }) }));
}
exports.default = Name;
//# sourceMappingURL=index.js.map