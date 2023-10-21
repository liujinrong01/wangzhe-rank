"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@tarojs/components");
const nutui_react_taro_1 = require("@nutui/nutui-react-taro");
const taro_1 = require("@tarojs/taro");
const kbpic_1_jpg_1 = require("../../../images/kbpic_1.jpg");
const kbpic_2_jpg_1 = require("../../../images/kbpic_2.jpg");
require("../index.less");
function Blank() {
    const tips = ["1、生成、复制即可", "2、进入游戏粘贴‘提示重复’，说明已被前人占用", "3、空白名、重复名每次随机生成，都不一样", "4、安卓苹果均完美显示", "5、空白名数量是有限的，且改且珍惜", "6、太火的重复名可能无法生成。如果你有耐心，不断去尝试生成，可以捡漏！"];
    const kongBaiData = ["⁠", "⁡", "⁢", "⁣", "​", "　", " "];
    const copyBlackName = () => {
        let randomName = '';
        for (let i = 0; i < 6; i++) {
            randomName += kongBaiData[Math.floor(Math.random() * kongBaiData.length)];
        }
        taro_1.default.setClipboardData({
            data: randomName,
        });
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: 'blank-box', children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: 'demo-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'txt', children: "\u7A7A\u767D\u540D\u793A\u4F8B" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'img-box', children: [(0, jsx_runtime_1.jsx)(components_1.Image, { src: kbpic_1_jpg_1.default, mode: 'widthFix', className: 'img' }), (0, jsx_runtime_1.jsx)(components_1.Image, { src: kbpic_2_jpg_1.default, mode: 'widthFix', className: 'img' })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Button, { block: true, onClick: copyBlackName, color: '#6B4EFF', children: "\u590D\u5236\u968F\u673A\u7A7A\u767D\u540D" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'tips-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips tit', children: "\u5E38\u89C1\u95EE\u9898" }), tips.map((item, index) => {
                        return ((0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips', children: item }, index));
                    })] })] }));
}
exports.default = Blank;
//# sourceMappingURL=Blank.js.map