"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("@tarojs/components");
const nutui_react_taro_1 = require("@nutui/nutui-react-taro");
const taro_1 = require("@tarojs/taro");
const cfpic_1_jpg_1 = require("../../../images/cfpic_1.jpg");
const cfpic_2_jpg_1 = require("../../../images/cfpic_2.jpg");
require("../index.less");
function Blank() {
    const cfm = ["⁠", "⁡", "⁢", "⁣", "​"];
    const tips = ["1、生成、复制即可", "2、进入游戏粘贴‘提示重复’，说明已被前人占用", "3、空白名、重复名每次随机生成，都不一样", "4、安卓苹果均完美显示", "5、空白名数量是有限的，且改且珍惜", "6、太火的重复名可能无法生成。如果你有耐心，不断去尝试生成，可以捡漏！"];
    const [val, setVal] = (0, react_1.useState)('');
    const copyBlackName = () => {
        if (val == '') {
            taro_1.default.showToast({
                title: '请输入昵称',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        else if (val.length > 5) {
            taro_1.default.showToast({
                title: '输入昵称最长长度不能大于5',
                icon: 'none',
                duration: 2000
            });
        }
        let t = val;
        let a = cfm;
        var n = "";
        if (1 == t.length) {
            for (var o = 0; o < 5; o++)
                n = a[Math.round(Math.random() * (a.length - 1))] + n;
            console.log(n);
        }
        else if (2 == t.length) {
            for (var e = 0; e < 4; e++)
                n = a[Math.round(Math.random() * (a.length - 1))] + n;
            console.log(n);
        }
        else if (3 == t.length) {
            for (var i = 0; i < 3; i++)
                n = a[Math.round(Math.random() * (a.length - 1))] + n;
            console.log(n);
        }
        else if (4 == t.length) {
            for (var s = 0; s < 2; s++)
                n = a[Math.round(Math.random() * (a.length - 1))] + n;
            console.log(n);
        }
        else {
            n = a[Math.round(Math.random() * (a.length - 1))], console.log(n);
        }
        var h = "";
        console.log(h);
        for (var r = val.split(""), l = Math.round(Math.random() * (r.length - 1)), c = 0; c < r.length; c++)
            l == c ? h = h + r[c] + n : h += r[c];
        console.log(h);
        taro_1.default.setClipboardData({
            data: h,
        }).then(() => {
            taro_1.default.showToast({
                title: '复制成功',
                icon: 'none',
            });
        }).catch((err) => {
            console.log(err);
            taro_1.default.showToast({
                title: '复制失败',
                icon: 'none',
            });
        });
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: 'blank-box', children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: 'demo-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'txt', children: "\u91CD\u590D\u540D\u793A\u4F8B" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'img-box', children: [(0, jsx_runtime_1.jsx)(components_1.Image, { src: cfpic_1_jpg_1.default, mode: 'widthFix', className: 'img' }), (0, jsx_runtime_1.jsx)(components_1.Image, { src: cfpic_2_jpg_1.default, mode: 'widthFix', className: 'img' })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Input, { value: val, style: { marginBottom: '20rpx', border: '1px solid #ccc', borderRadius: '4rpx' }, onChange: (value) => setVal(value), placeholder: '\u8BF7\u8F93\u5165\u91CD\u590D\u7684\u6635\u79F0(1-5\u4E2A\u5B57\u7B26)' }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Button, { block: true, onClick: copyBlackName, color: '#6B4EFF', children: "\u751F\u6210/\u590D\u5236\u91CD\u590D\u540D" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'tips-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips tit', children: "\u5E38\u89C1\u95EE\u9898" }), tips.map((item, index) => {
                        return ((0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips', children: item }, index));
                    })] })] }));
}
exports.default = Blank;
//# sourceMappingURL=Repeat.js.map