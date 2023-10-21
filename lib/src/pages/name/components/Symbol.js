"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("@tarojs/components");
const nutui_react_taro_1 = require("@nutui/nutui-react-taro");
const fhpic_1_jpg_1 = require("../../../images/fhpic_1.jpg");
const fhpic_2_jpg_1 = require("../../../images/fhpic_2.jpg");
require("../index.less");
const fhRandom = ["༺爱༒情༻❦", "✿大白莎҉", "太白 ζั͡~", "奶我 ღ ҉҉҉҉҉҉҉҉҉҉", "✾͡安啦oೄ೨", "挽留 گق", "七爷ღ", "呆猪้๊้๊", "Ꮙ·朝暮", "﹏﹌浪子", "〆乀追风〆乀", "╰☆秋水oO", "ღ҉ 萌哭", "别̶闹̶", "≮错過≯", "﹏๓₯゛妖尾", "ﻬق、ゞ勿忘", "木兰ړ₊", "こ春郎こ", "ৡ蔠嚸 ೄ೨", "演้็员ۣ", "༺思ゝ爷༻", "ℳ_子龙丶℘", "阡陌ั͡✿", "BooM☆*:.｡.", "❀＂怪叔 ღ", "✾͡千夏ೄ೨", "✿͡小雪怪", "❀﹏๓₯毒药", "๓҉ 北风寒", "萱萱✿ۣว", "❀ൢ柠萌ൢ❀", "ᖬིཊ风ཊᖪྀ", "༺―花痴―༻", "橙̶妹̶م", "小̸师̸妹̸", "冬ོ雨ོ", "南辞ꦿ゜এ", "এ᭄燕ོꦿృ༊", "ღ龙儿᭄ꦿ࿐", "梦ꦿ` ", "六道仙ོ人ꦿ", "枫叶⸙", "¸₋ 尐〣 ҉", "红้็颜ۣۖ", "IPhone8s☃☃", "ℳÇ҉丶樱桃", "国服路人王℡", "ζ❀汤圆圆ى", "ೄ冷೨胤๓", ":*☆言溪☆*:", "ζั͡✾情缘҉", "گق  鹿十", "三้็年ۣۖ", "依赖ღ҉", "❢星星点灯❣", "兔子 ҉", "✿•ᴥ•✿", "Ꮙ·思绪", "╰⋛默然⋚╯", "❦花璃༺", "ღ҉ ୨花秀୧❀", "玩ۚ味ۣۖ", "〆灬小妖精ゝ", "༽༾M神༿༼", "҈Ͽ风流倜傥 ೃ", "戰メ六月✿", "*☻宇哥☻*", "贝塔✿", "買酔℡浅唱", "⊱終極喫貨⊰", "☂ღ҉ 17歲", "凉城  ةم", "隼龙سً", "ღ゛5 殺 ❀", "༂芬༒奇༂℡", "、Mi❅小白ヅ", "你瞅啥✪", "ご啻耀★龙涎ぃ", "♚陪她终老❦", "҉   苏沐", "༺ༀ清风ༀ༻", "❀ 临风", "触手寂风ღ", ".ت‿逸ツ", "₰ ゝ老酒﷼", "￡死神的メ镰刀ぃ", "꧁༺强༻꧂ღ", "❀҉风走了", "๛๓㎖°乱神", "ζ͡✾帝❦岚", "₯ღ゛提笔⁶", "︻安▅▆▇◤", "ζั͡✿鴻ى", "♚_乔巴.ღ", "ゝ狂三ゞ", "❦酒༒客❦꧂", "╬魍魉็้๘", "༺棒༒锤༻", "༺☜千羽☞༻", "ご狂刀☞先生", "瓶装水ღ҉", "༺冷江月༻", "♪以梦为马☂", "*☻奈何☻*", "ず夜空下的流星ゞ", "Ꮙ·大宝剑", "✿..魂淡°", "ぴ懒癌晚期〆", "誓☪༺宝er༻", "D̶i̶e̶", "༺梦境缠绕༻", "₯๑  达浪و", "✿森屿༻ℳ", "๘苏妲己໑", "Ꮙ·朝暮", "웃 ღ 유", "夏目君がۣۖ", "肉肉  ړ₊"];
const arrayFuhao = ["枫叶⸙", "学妹²⁰²²", "ζ❀梦ى", "红้็颜ۣۖ", "╰☆秋风oO", "南辞ꦿ゜এ", "℡渣男ヾ", "瞅啥✪", "✿大叔ღ", "依赖ღ҉", "ღ叶❧秋", "এ᭄燕ོꦿృ༊", "六道仙ོ人ꦿ", "︻安▅▆▇◤", "梦ꦿ`", "じ☆ve", "﹋", "﹌", "꧔ꦿ", "☂", "༺࿈༻", "❀༒❀", "༺༽༾ཊ࿈ཏ༿༼༻", "☄", "༊", "情ོོꦿ℘", "☯", "࿊", "ℳ", "✎", "✏", "✐", "ᨐ", "˙⚇˙", "☃", "囍", "♪", "♩", "♫", "♬", "⚢", "⚣", "✘", "㊣", "࿆", "♞", "♡", "♤", "☾", "☽", "☼", "✭", "✬", "✫", "✰", "✧", "✦", "⋆", "❀", "❋", "❃", "❁", "✿", "✾", "✽", "♜", "♛", "♚", "♕", "♔", "ʚɞ ", "ʚΐɞ ", "▒", "̈́͒", "₯", "҉", "ღ ", "ฬ ", "ะ ", "๏", "๛", "๗", "๓", "๑", "ჲ ", "ჯ ", "ტ ", "ლ ", "დ ", " ر ", "ε ", "з ", "﹅", "﹆", "★", "㍊", "㍍", "㍑", "㌫", "㌍", "㌫", "㌶", "❤", "♥", "删除线→", "̶", "上排数字： º¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ ", "下排数字：₀₁₂₃₄₅₆₇₈₉₊₋₌ ", "上排： ᵃ ᵇ ᶜ ᵈ ᵉ ᶠ ᵍ ʰ ⁱ ʲ ᵏ ˡ ᵐ ⁿ ᵒ ᵖ ʳ ˢ ᵗ ᵘ ᵛ ʷ ˣ ʸ ᶻ ", "上排： ᴬ ᴮ ᒼ ᴰ ᴱ ᴳ ᴴ ᴵ ᴶ ᴷ ᴸ ᴹ ᴺ ᴼ ᴾ ᴼ̴ ᴿ ˢ ᵀ ᵁ ᵂ ˣ ᵞ ᙆ "];
function Blank() {
    const [val, setVal] = (0, react_1.useState)('');
    const generateName = () => {
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: 'blank-box', children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: 'demo-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'txt', children: "\u91CD\u590D\u540D\u793A\u4F8B" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'img-box', children: [(0, jsx_runtime_1.jsx)(components_1.Image, { src: fhpic_1_jpg_1.default, mode: 'widthFix', className: 'img' }), (0, jsx_runtime_1.jsx)(components_1.Image, { src: fhpic_2_jpg_1.default, mode: 'widthFix', className: 'img' })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Input, { value: val, style: { marginBottom: '20rpx', border: '1px solid #ccc', borderRadius: '4rpx' }, onChange: (value) => setVal(value), placeholder: '\u70B9\u51FB\u590D\u5236, \u4E2D\u6587\u81EA\u884C\u4FEE\u6539', readOnly: true }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Button, { block: true, onClick: generateName, color: '#6B4EFF', children: "\u751F\u6210/\u590D\u5236\u91CD\u590D\u540D" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'tips-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips tit', children: "\u5E38\u89C1\u95EE\u9898" }), tips.map((item, index) => {
                        return ((0, jsx_runtime_1.jsx)(components_1.View, { className: 'tips', children: item }, index));
                    })] })] }));
}
exports.default = Blank;
//# sourceMappingURL=Symbol.js.map