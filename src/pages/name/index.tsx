
import { useState } from "react";
import {ConfigProvider, Tabs} from '@nutui/nutui-react-taro';
import {useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import Blank from '@/pages/name/components/Blank';
import Repeat from '@/pages/name/components/Repeat';
import Symbol from '@/pages/name/components/Symbol';


import './index.less'



const theme = {
  nutuiBrandColor: '#6B4EFF',
  nutuiBrandColorStart: '#6B4EFF',
  nutuiBrandColorEnd: '#6B4EFF',
}




export default function Name() {

  const [tab1value, setTab1value] = useState('0');


  // taro 小程序分享

  useShareAppMessage(() => {
    return {
      title: "王者重复名生成器，王者改名神器给你，超实用！！",
      path: "/pages/name/index",
      imageUrl: "/images/share.png"
    }
  })

  useShareTimeline(() => {
    return {
      title: "王者重复名生成器，王者改名神器给你，超实用！！",
      path: "/pages/name/index"
    }
  })
  return (
    <div>
      <ConfigProvider theme={theme}>
        <Tabs autoHeight value={tab1value} onChange={(value: string) => {
          setTab1value(value)
        }}
        >
          <Tabs.TabPane title='空白名 '>

            <Blank />
          </Tabs.TabPane>
          <Tabs.TabPane title='重复名 '>
            <Repeat />
          </Tabs.TabPane>
          <Tabs.TabPane title='符号名'>
            <Symbol />
          </Tabs.TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
}
