import { View, Text, Image } from '@tarojs/components'
import { Cell, Tag, Button } from '@nutui/nutui-react-taro'
import { RectRight } from '@nutui/icons-react-taro'
import { useLoad } from '@tarojs/taro'
import './index.less'
import { Swiper } from '@nutui/nutui-react-taro';



const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]




export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>

      <View className='kv-swiper'>
        <Swiper
          defaultValue={0}
          indicator
        >
          {list.map((item, index) => {
            return (
              <Swiper.Item key={item}>
                <Image className='kv-img' src={item} onClick={() => console.log(index)} />
              </Swiper.Item>
            )
          })}
        </Swiper>
      </View>

      <View className='form-box'>
        <Cell.Group>
          <Cell
            title={
              <View>大区</View>
            }
            extra={
              <View><Tag background="#6B4EFF">微信</Tag><Tag background="#E7E7E7" color='#333333'>QQ</Tag> </View>
            }
          />
          <Cell
            title={
              <View>设备</View>
            }
            extra={
              <View><Tag background="#6B4EFF">苹果</Tag><Tag background="#E7E7E7" color='#333333'>安卓</Tag> </View>
            }
          />
          <Cell
            title={
              <View>英雄</View>
            }
            extra={
              <>
                <span style={{ marginRight: '5px' }}>选择查询的英雄</span>
                <RectRight  size='1em' />
              </>
            }
          />
          <Button block color="#6B4EFF">查询</Button>
        </Cell.Group>
      </View>

      <View className='history-list'>

        <View className='title-box'>
          <View className='left'>历史查询</View>
          <View className='right'>查看更多  <RectRight size='1em'/> </View>
        </View>

      </View>

    </View>
  )
}
