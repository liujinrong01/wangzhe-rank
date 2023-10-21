import {View, Image} from "@tarojs/components";
import {Button} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

import kb from '../../../images/kbpic_1.jpg'
import kb2 from '../../../images/kbpic_2.jpg'

import '../index.less'

export default function Blank() {

  const tips = ["1、生成、复制即可", "2、进入游戏粘贴‘提示重复’，说明已被前人占用", "3、空白名、重复名每次随机生成，都不一样", "4、安卓苹果均完美显示", "5、空白名数量是有限的，且改且珍惜", "6、太火的重复名可能无法生成。如果你有耐心，不断去尝试生成，可以捡漏！"]

  const kongBaiData = ["⁠", "⁡", "⁢", "⁣", "​", "　", " "]

    const copyBlackName = () => {

    let randomName = ''

    for (let i = 0; i < 6; i++) {
      randomName += kongBaiData[Math.floor(Math.random() * kongBaiData.length)]
    }


    Taro.setClipboardData({
      data: randomName,
    })

  }
  return (
    <View className='blank-box'>
      <View className='demo-box'>
        <View className='txt'>空白名示例</View>
        <View className='img-box'>
          <Image src={kb} mode='widthFix' className='img' />
          <Image src={kb2} mode='widthFix' className='img' />
        </View>
        <Button block onClick={copyBlackName} color='#6B4EFF'>复制随机空白名</Button>
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
