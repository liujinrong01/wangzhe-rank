export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/name/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    color: '#333',
    selectedColor: '#6B4EFF',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '战力查询',
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-active.png"
      },
      {
        pagePath: 'pages/name/index',
        text: '王者改名',
        "iconPath": "images/user.png",
        "selectedIconPath": "images/user-active.png"
      },
    ],
  },
  "lazyCodeLoading": "requiredComponents"
})
