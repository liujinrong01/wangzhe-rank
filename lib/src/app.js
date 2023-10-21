"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
require("./app.less");
require("@nutui/nutui-react-taro/dist/style.css");
function App({ children }) {
    (0, taro_1.useLaunch)(() => {
        console.log('App launched.');
    });
    // children 是将要会渲染的页面
    return children;
}
exports.default = App;
//# sourceMappingURL=app.js.map