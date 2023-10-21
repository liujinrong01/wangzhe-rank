import {useState} from "react";
import {View, Image} from "@tarojs/components";
import {Button, Input} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

import cf from '../../../images/cfpic_1.jpg'
import cf2 from '../../../images/cfpic_2.jpg'

import '../index.less'

export default function Blank() {

  const cfm = ["⁠", "⁡", "⁢", "⁣", "​"]
  const tips = ["1、生成、复制即可", "2、进入游戏粘贴‘提示重复’，说明已被前人占用", "3、空白名、重复名每次随机生成，都不一样", "4、安卓苹果均完美显示", "5、空白名数量是有限的，且改且珍惜", "6、太火的重复名可能无法生成。如果你有耐心，不断去尝试生成，可以捡漏！"]

  const [val, setVal] = useState('');
  const copyBlackName = () => {

    if(val == '') {
      Taro.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return
    }else if(val.length > 5) {
      Taro.showToast({
        title: '输入昵称最长长度不能大于5',
        icon: 'none',
        duration: 2000
      })
    }

    let t = val
    let a = cfm

    var n = "";
    if (1 == t.length) {
      for (var o = 0; o < 5; o++) n = a[Math.round(Math.random() * (a.length - 1))] + n;
      console.log(n);
    } else if (2 == t.length) {
      for (var e = 0; e < 4; e++) n = a[Math.round(Math.random() * (a.length - 1))] + n;
      console.log(n);
    } else if (3 == t.length) {
      for (var i = 0; i < 3; i++) n = a[Math.round(Math.random() * (a.length - 1))] + n;
      console.log(n);
    } else if (4 == t.length) {
      for (var s = 0; s < 2; s++) n = a[Math.round(Math.random() * (a.length - 1))] + n;
      console.log(n);
    } else {
      n = a[Math.round(Math.random() * (a.length - 1))], console.log(n);
    }
    var h = "";
    console.log(h);
    for (var r = val.split(""), l = Math.round(Math.random() * (r.length - 1)), c = 0; c < r.length; c++) l == c ? h = h + r[c] + n : h += r[c];
    console.log(h)

    Taro.setClipboardData({
      data: h,
    }).then(() => {
      Taro.showToast({
        title: '复制成功',
        icon: 'none',
      });
    }).catch((err) => {
      console.log(err);
      Taro.showToast({
        title: '复制失败',
        icon: 'none',
      });
    })
  }
  return (
    <View className='blank-box'>
      <View className='demo-box'>
        <View className='txt'>重复名示例</View>
        <View className='img-box'>
          <Image src={cf} mode='widthFix' className='img' />
          <Image src={cf2} mode='widthFix' className='img' />
        </View>

        <Input value={val}
          style={{ marginBottom: '20rpx', border: '1px solid #ccc', borderRadius: '4rpx'}}
          onChange={(value) => setVal(value)} placeholder='请输入重复的昵称(1-5个字符)'
        />
        <Button block onClick={copyBlackName} color='#6B4EFF'>生成/复制重复名</Button>
      </View>

      <View className='tips-box'>
        <View className='tips tit'>常见问题</View>
        {
          tips.map((item, index) => {
            return (
              <View className='tips' key={index}>{item}</View>
            )
          })
        }

      </View>
    </View>
  )
}
