"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("@tarojs/components");
const nutui_react_taro_1 = require("@nutui/nutui-react-taro");
const icons_react_taro_1 = require("@nutui/icons-react-taro");
const taro_1 = require("@tarojs/taro");
const pinyin_1 = require("pinyin");
require("./index.less");
const theme = {
    nutuiBrandColor: '#6B4EFF',
    nutuiBrandColorStart: '#6B4EFF',
    nutuiBrandColorEnd: '#6B4EFF',
};
function Index() {
    const [heroList, setHeroList] = (0, react_1.useState)([]);
    const [historyList, setHistoryList] = (0, react_1.useState)([]);
    const [type, setType] = (0, react_1.useState)('iwx');
    const [device, setDevice] = (0, react_1.useState)('i');
    const [area, setArea] = (0, react_1.useState)('wx');
    const [showHero, setShowHero] = (0, react_1.useState)(false);
    const [checkHero, setCheckHero] = (0, react_1.useState)({});
    const [showResult, setShowResult] = (0, react_1.useState)(false);
    const [heroName, setHeroName] = (0, react_1.useState)('');
    const [kvList, setKvList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setType(device + area);
    }, [device, area]);
    (0, taro_1.useLoad)(() => {
        console.log('Page loaded.');
        init();
    });
    const init = () => {
        let today = taro_1.default.getStorageSync('today');
        if (today) {
            if (today === new Date().getDate()) {
                const history = taro_1.default.getStorageSync('history') || [];
                setHistoryList(history);
            }
            else {
                taro_1.default.setStorageSync('today', new Date().getDate());
                taro_1.default.setStorageSync('history', []);
            }
        }
        else {
            taro_1.default.setStorageSync('today', new Date().getDate());
            taro_1.default.setStorageSync('history', []);
        }
        // 获取英雄列表
        taro_1.default.request({
            url: "https://pvp.qq.com/web201605/js/herolist.json",
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
        }).then(res => {
            const heroMap = {};
            res.data.forEach((item) => {
                item.name = item.cname;
                item.id = item.ename;
                item.iconUrl = `//game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`;
                const p = (0, pinyin_1.default)(item.cname);
                if (!p || !p.length) {
                    return;
                }
                // 去掉声调 例如： Ā -> A Á -> A Ǎ -> A À -> A
                let key = p[0][0].slice(0, 1).toUpperCase().replace(/[ĀÁǍÀ]/, 'A');
                if (key) {
                    if (!heroMap[key]) {
                        heroMap[key] = {
                            title: key,
                            list: []
                        };
                    }
                    heroMap[key].list.push(item);
                }
            });
            const singerList = Object.keys(heroMap).map(key => {
                return heroMap[key];
            });
            singerList.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });
            setHeroList(singerList);
        });
        // 获取 KV
        taro_1.default.request({
            url: "https://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi?activityId=2735&sVerifyCode=ABCD&sDataType=JSON&iListNum=7&totalpage=0&page=0&iOrder=0&iSortNumClose=1&iAMSActivityId=51991&_everyRead=true&iTypeId=1&iFlowId=267733&iActId=2735&iModuleId=2735&_=1697877093064",
        }).then(res => {
            // setKvList(res.data.data)
            const result = res.data.List;
            result.map(item => {
                // 先解码 https%3A%2F%2Fshp%2Eqpic%2Ecn%2Fishow%2F2735102010%2F1697770767%5F829394697%5F29477%5FsProdImgNo%5F6%2Ejpg%2F200   https://shp.qpic.cn/ishow/2735102010/1697770767_829394697_29477_sProdImgNo_6.jpg/200 ==> https://shp.qpic.cn/ishow/2735102010/1697770767_829394697_29477_sProdImgNo_6.jpg/0
                item.kv = decodeURIComponent(item.sProdImgNo_6).replace(/\/200$/, '/0');
            });
            setKvList(result);
            console.log(result);
        });
    };
    const onItemClick = (key, item) => {
        console.log(key, item);
        setHeroName(item.cname);
        setShowHero(false);
    };
    const search = () => {
        if (!heroName) {
            taro_1.default.showToast({
                title: '请选择英雄',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        taro_1.default.showLoading();
        taro_1.default.request({
            url: "https://www.somekey.cn/mini/hero/getHeroInfo.php?hero=" + heroName + "&type=" + type,
            header: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            console.log(res.data);
            let result = res.data.data;
            result.text = `${result.name}（${result.platform}）`;
            setCheckHero(result);
            setShowResult(true);
            // 保存历史记录
            let history = taro_1.default.getStorageSync('history') || [];
            history.unshift(result);
            // 去重
            history = history.reduce((prev, cur) => {
                const has = prev.find((item) => {
                    return item.text === cur.text;
                });
                if (!has) {
                    prev.push(cur);
                }
                return prev;
            }, []);
            taro_1.default.setStorageSync('history', history);
            setHistoryList(history);
        }).finally(() => {
            taro_1.default.hideLoading();
        });
    };
    const onIndexClick = (key) => {
        console.log(key);
    };
    const clearHistory = () => {
        nutui_react_taro_1.Dialog.open('test', {
            title: '提示',
            content: '确定清空历史记录吗？',
            onConfirm: () => {
                nutui_react_taro_1.Dialog.close('test');
                taro_1.default.setStorageSync('history', []);
                setHistoryList([]);
            },
            onCancel: () => {
                nutui_react_taro_1.Dialog.close('test');
            },
        });
    };
    const handleHistoryClick = (item) => {
        // setHeroName(item.name)
        // setDevice(item.platform.slice(0, 1))
        // setArea(item.platform.slice(1))
        setShowResult(true);
        setCheckHero(item);
    };
    return ((0, jsx_runtime_1.jsx)(nutui_react_taro_1.ConfigProvider, { theme: theme, children: (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'index', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'kv-swiper', children: (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Swiper, { defaultValue: 0, indicator: true, height: '393.75rpx', loop: true, autoPlay: true, children: kvList.map((item, index) => {
                            return ((0, jsx_runtime_1.jsx)(nutui_react_taro_1.Swiper.Item, { children: (0, jsx_runtime_1.jsx)(components_1.Image, { className: 'kv-img', mode: 'widthFix', src: item.kv }) }, index));
                        }) }) }), (0, jsx_runtime_1.jsx)(components_1.View, { className: 'form-box', children: (0, jsx_runtime_1.jsxs)(nutui_react_taro_1.Cell.Group, { children: [(0, jsx_runtime_1.jsx)(nutui_react_taro_1.Cell, { title: (0, jsx_runtime_1.jsx)(components_1.View, { children: "\u8BBE\u5907" }), extra: (0, jsx_runtime_1.jsxs)(components_1.View, { children: [(0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tag, { onClick: () => setDevice('i'), background: device === 'i' ? "#6B4EFF" : '#E7E7E7', color: device === 'i' ? '#ffffff' : '#333333', children: "\u82F9\u679C" }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tag, { onClick: () => setDevice('a'), background: device === 'a' ? "#6B4EFF" : '#E7E7E7', color: device === 'a' ? '#ffffff' : '#333333', children: "\u5B89\u5353" }), " "] }) }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Cell, { title: (0, jsx_runtime_1.jsx)(components_1.View, { children: "\u5927\u533A" }), extra: (0, jsx_runtime_1.jsxs)(components_1.View, { children: [(0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tag, { onClick: () => setArea('wx'), background: area === 'wx' ? "#6B4EFF" : '#E7E7E7', color: area === 'wx' ? '#ffffff' : '#333333', children: "\u5FAE\u4FE1" }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Tag, { onClick: () => setArea('qq'), background: area === 'qq' ? "#6B4EFF" : '#E7E7E7', color: area === 'qq' ? '#ffffff' : '#333333', children: "\u6263\u6263" }), " "] }) }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Cell, { onClick: () => setShowHero(true), title: (0, jsx_runtime_1.jsx)(components_1.View, { children: "\u82F1\u96C4" }), extra: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [heroName ? (0, jsx_runtime_1.jsx)("span", { style: { marginRight: '5px', color: '#333333' }, children: heroName }) : (0, jsx_runtime_1.jsx)("span", { style: { marginRight: '5px' }, children: "\u9009\u62E9\u67E5\u8BE2\u7684\u82F1\u96C4" }), (0, jsx_runtime_1.jsx)(icons_react_taro_1.RectRight, { size: '1em' })] }) }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Button, { block: true, color: '#6B4EFF', onClick: search, children: "\u67E5\u8BE2" })] }) }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'history-list', children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: 'title-box', children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'left', children: "\u5386\u53F2\u67E5\u8BE2" }), (0, jsx_runtime_1.jsx)(components_1.View, { className: 'right', style: { color: "#6B4EFF" }, onClick: clearHistory, children: "\u6E05\u7A7A" })] }), (0, jsx_runtime_1.jsx)(components_1.View, { className: 'list-box', children: (0, jsx_runtime_1.jsx)(components_1.Block, { children: historyList.length ? historyList.map((item, index) => {
                                    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: 'list-item', onClick: () => handleHistoryClick(item), children: [(0, jsx_runtime_1.jsx)(components_1.Image, { className: 'img', src: item.photo }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'name', children: [item.name, " (", item.platform, ")"] })] }, index));
                                }) : (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Empty, { description: '\u65E0\u6570\u636E', imageSize: 100 }) }) })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Popup, { className: 'popup-box', visible: showHero, style: { padding: '30px 50px' }, children: (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Elevator, { sticky: true, list: heroList, height: '100vh', onItemClick: (key, item) => onItemClick(key, item), onIndexClick: (key) => onIndexClick(key), children: (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Elevator.Context.Consumer, { children: (value) => {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.Image, { className: 'hero-img', src: value === null || value === void 0 ? void 0 : value.iconUrl }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: '15px' }, children: value === null || value === void 0 ? void 0 : value.name })] }));
                            } }) }) }), (0, jsx_runtime_1.jsxs)(nutui_react_taro_1.Popup, { className: 'result-box', visible: showResult, onOverlayClick: () => setShowResult(false), children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: 'result-title', children: checkHero.alias }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: 'result-content', children: [(0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u6240\u9009\u5927\u533A\uFF1A", checkHero.platform] }), (0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u6700\u4F4E\u53BF\u6807\uFF1A", checkHero.area, "\uFF08", checkHero.areaPower, "\uFF09"] }), (0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u6700\u4F4E\u5E02\u6807\uFF1A", checkHero.city, "\uFF08", checkHero.cityPower, "\uFF09"] }), (0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u6700\u4F4E\u7701\u6807\uFF1A", checkHero.province, "\uFF08", checkHero.provincePower, "\uFF09"] }), (0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u6700\u4F4E\u56FD\u6807\uFF1A\u56FD\u6807\u6700\u4F4E\u6218\u529B\uFF08", checkHero.guobiao, "\uFF09"] }), (0, jsx_runtime_1.jsxs)(components_1.View, { children: ["\u66F4\u65B0\u65F6\u95F4\uFF1A", checkHero.updatetime] })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Button, { block: true, color: '#6B4EFF', className: 'confirm-btn', onClick: () => setShowResult(false), children: "\u786E\u5B9A" })] }), (0, jsx_runtime_1.jsx)(nutui_react_taro_1.Dialog, { id: 'test' })] }) }));
}
exports.default = Index;
//# sourceMappingURL=index.js.map