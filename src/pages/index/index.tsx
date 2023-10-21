import {useEffect, useState} from 'react';
import {View, Image, Block} from '@tarojs/components'
import {Cell, Tag, Button, Empty, Popup, Elevator, Swiper, Dialog, ConfigProvider } from '@nutui/nutui-react-taro'
import { RectRight } from '@nutui/icons-react-taro'
import Taro, { useLoad, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import pinyin from 'js-pinyin'
import './index.less'



const theme = {
  nutuiBrandColor: '#6B4EFF',
  nutuiBrandColorStart: '#6B4EFF',
  nutuiBrandColorEnd: '#6B4EFF',
}




export default function Index() {

  const [heroList, setHeroList] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [type , setType] = useState('iwx')
  const [device, setDevice] = useState('i')
  const [area, setArea] = useState('wx')
  const [showHero, setShowHero] = useState(false)
  const [checkHero, setCheckHero] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [heroName, setHeroName] = useState('')

  const [kvList, setKvList] = useState([])

  useEffect(() => {
    setType(device + area)
  }, [device, area])

  useLoad(() => {
    console.log('Page loaded.')
    init()
  })

  const init = () => {

    let today = Taro.getStorageSync('today')
    if (today) {
      if (today === new Date().getDate()) {
        const history = Taro.getStorageSync('history') || []
        setHistoryList(history)
      } else {
        Taro.setStorageSync('today', new Date().getDate())
        Taro.setStorageSync('history', [])
      }
    } else {
      Taro.setStorageSync('today', new Date().getDate())
      Taro.setStorageSync('history', [])
    }
    // 获取英雄列表
    Taro.request({
      url: "https://pvp.qq.com/web201605/js/herolist.json",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
    }).then(res => {
      const heroMap = {
      }

      res.data.forEach((item: any) => {
        item.name = item.cname
        item.id = item.ename
        item.iconUrl = `//game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`
        const p = pinyin.getCamelChars(item.cname)
        if (!p || !p.length) {
          return
        }
        // 去掉声调 例如： Ā -> A Á -> A Ǎ -> A À -> A
        let key = p[0][0].slice(0, 1).toUpperCase().replace(/[ĀÁǍÀ]/, 'A')
        if (key) {
          if (!heroMap[key]) {
            heroMap[key] = {
              title: key,
              list: []
            }
          }
          heroMap[key].list.push(item)
        }
      })
      const singerList: any = Object.keys(heroMap).map(key => {
        return heroMap[key]
      })
      singerList.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      setHeroList(singerList)
    })

    // 获取 KV

    Taro.request({
      url: "https://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi?activityId=2735&sVerifyCode=ABCD&sDataType=JSON&iListNum=7&totalpage=0&page=0&iOrder=0&iSortNumClose=1&iAMSActivityId=51991&_everyRead=true&iTypeId=1&iFlowId=267733&iActId=2735&iModuleId=2735&_=1697877093064",
    }).then(res => {
      // setKvList(res.data.data)
      const result = res.data.List
      result.map(item => {

        // 先解码 https%3A%2F%2Fshp%2Eqpic%2Ecn%2Fishow%2F2735102010%2F1697770767%5F829394697%5F29477%5FsProdImgNo%5F6%2Ejpg%2F200   https://shp.qpic.cn/ishow/2735102010/1697770767_829394697_29477_sProdImgNo_6.jpg/200 ==> https://shp.qpic.cn/ishow/2735102010/1697770767_829394697_29477_sProdImgNo_6.jpg/0
        item.kv = decodeURIComponent(item.sProdImgNo_3).replace(/\/200$/, '/0')
      })
      setKvList(result)
      console.log(result)
    })

  }



  const onItemClick = (key: string, item: any) => {
    console.log(key, item)
    setHeroName(item.cname)
    setShowHero(false);

  }

  const search = () => {
    if (!heroName) {
      Taro.showToast({
        title: '请选择英雄',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Taro.showLoading()
    Taro.request({
      url: "https://www.somekey.cn/mini/hero/getHeroInfo.php?hero=" + heroName + "&type=" + type,
      header: {
        "Content-Type": "application/json"
      },
    }).then(res => {
      console.log(res.data)

      let result = res.data.data
      result.text = `${result.name}（${result.platform}）`
      setCheckHero(result)
      setShowResult(true)

      // 保存历史记录
      let history = Taro.getStorageSync('history') || []
      history.unshift(result)
      // 去重

      history = history.reduce((prev: any, cur: any) => {
        const has = prev.find((item: any) => {
          return item.text === cur.text
        })
        if (!has) {
          prev.push(cur)
        }
        return prev
      }, [])



      Taro.setStorageSync('history', history)
      setHistoryList(history)

    }).finally(() => {
      Taro.hideLoading()
    })
  }

  const onIndexClick = (key: string) => {
    console.log(key)
  }

  const clearHistory = () => {

    Dialog.open('test', {
      title: '提示',
      content: '确定清空历史记录吗？',
      onConfirm: () => {
        Dialog.close('test')

        Taro.setStorageSync('history', [])
        setHistoryList([])
      },
      onCancel: () => {
        Dialog.close('test')
      },
    })
  }

  const handleHistoryClick = (item: any) => {
    // setHeroName(item.name)
    // setDevice(item.platform.slice(0, 1))
    // setArea(item.platform.slice(1))
    setShowResult(true)
    setCheckHero(item)
  }


  // taro 小程序分享

  useShareAppMessage(() => {
    return {
      title: "免费查王者荣耀战力排行榜，助你最低战力上榜！快速拿标！",
      path: "/pages/index/index",
      imageUrl: "/images/share.png"
    }
  })

  useShareTimeline(() => {
    return {
      title: "免费查王者荣耀战力排行榜，助你最低战力上榜！快速拿标！",
      path: "/pages/index/index"
    }
  })


  return (
    <ConfigProvider theme={theme}>
      <View className='index'>

      <View className='kv-swiper'>
        <Swiper
          defaultValue={0}
          indicator
          height='393.75rpx'
          loop
          autoPlay
        >
          {kvList.map((item, index) => {
            return (
              <Swiper.Item key={index}>
                <Image className='kv-img' mode='widthFix' src={item.kv} />
              </Swiper.Item>
            )
          })}
        </Swiper>
      </View>

      <View className='form-box'>
        <Cell.Group>

          <Cell
            title={
              <View>设备</View>
            }
            extra={
              <View><Tag  onClick={() => setDevice('i')} background={device === 'i' ? "#6B4EFF" : '#E7E7E7'} color={device === 'i' ? '#ffffff' : '#333333'}>苹果</Tag>
                <Tag  onClick={() => setDevice('a')} background={device === 'a' ? "#6B4EFF" : '#E7E7E7'} color={device === 'a' ? '#ffffff' : '#333333'}>安卓</Tag> </View>
            }
          />
          <Cell
            title={
              <View>大区</View>
            }
            extra={
              <View><Tag onClick={() => setArea('wx')} background={area === 'wx' ? "#6B4EFF" : '#E7E7E7'} color={area === 'wx' ? '#ffffff' : '#333333'}>微信</Tag>
                <Tag onClick={() => setArea('qq')} background={area === 'qq' ? "#6B4EFF" : '#E7E7E7'} color={area === 'qq' ? '#ffffff' : '#333333'}>扣扣</Tag> </View>
            }
          />
          <Cell

            onClick={() => setShowHero(true)}
            title={
              <View>英雄</View>
            }
            extra={
              <>
                {heroName ? <span style={{marginRight: '5px', color: '#333333'}}>{heroName}</span> : <span style={{marginRight: '5px'}}>选择查询的英雄</span>}
                <RectRight  size='1em' />
              </>
            }
          />
          <Button block color='#6B4EFF' onClick={search}>查询</Button>
        </Cell.Group>
      </View>

      <View className='history-list'>

        <View className='title-box'>
          <View className='left'>历史查询</View>
          <View className='right' style={{color: "#6B4EFF"}} onClick={clearHistory}>清空</View>
        </View>

        <View className='list-box'>
          <Block>
            {
              historyList.length ? historyList.map((item: any, index) => {
                return (
                  <View className='list-item' key={index} onClick={() => handleHistoryClick(item)}
                  >
                    <Image className='img' src={item.photo}></Image>
                    <View className='name'>{item.name} ({item.platform})</View>
                  </View>
                )
              }) :  <Empty description='无数据' imageSize={100} />
            }
          </Block>
        </View>

      </View>

      <Popup className='popup-box' visible={showHero} style={{ padding: '30px 50px' }}>

        <Elevator
          sticky
          list={heroList}
          height='100vh'
          onItemClick={(key: string, item: any) => onItemClick(key, item)}
          onIndexClick={(key: string) => onIndexClick(key)}
        >
          <Elevator.Context.Consumer>
            {(value: any) => {
              return (
                <>
                  <Image className='hero-img' src={value?.iconUrl}></Image>
                  <span style={{ marginLeft: '15px' }}>{value?.name}</span>
                </>
              )
            }}
          </Elevator.Context.Consumer>
        </Elevator>
      </Popup>

      <Popup className='result-box' visible={showResult} onOverlayClick={() => setShowResult(false)}>
        <View className='result-title'>{checkHero.alias}</View>
        <View className='result-content'>
          <View>所选大区：{checkHero.platform}</View>
          <View>最低县标：{checkHero.area}（{checkHero.areaPower}）</View>
          <View>最低市标：{checkHero.city}（{checkHero.cityPower}）</View>
          <View>最低省标：{checkHero.province}（{checkHero.provincePower}）</View>
          <View>最低国标：国标最低战力（{checkHero.guobiao}）</View>
          <View>更新时间：{checkHero.updatetime}</View>
        </View>
        <Button block color='#6B4EFF' className='confirm-btn' onClick={() => setShowResult(false)}>确定</Button>
      </Popup>

      <Dialog id='test' />

        {/*<Tabbar fixed>
          <Tabbar.Item title='战力查询' onClick={() => Taro.redirectTo({url: '/pages/index/index'})} icon={<Home width={20} height={20} />} />
          <Tabbar.Item title='王者改名'  onClick={() => Taro.redirectTo({url: '/pages/name/index'})} icon={<My width={20} height={20} />} />
        </Tabbar>*/}
    </View>
    </ConfigProvider>
  )
}
