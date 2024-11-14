import { useEffect } from 'react'
import { Card, Table } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'

const dataList1 = [
  {
    value: 218,
    name: '北京市'
  },
  {
    value: 122,
    name: '广东省'
  },
  {
    value: 119,
    name: '台湾省'
  },
  {
    value: 81,
    name: '香港特别行政区'
  },
  {
    value: 74,
    name: '山东省'
  },
  {
    value: 68,
    name: '江苏省'
  },
  {
    value: 62,
    name: '浙江省'
  },
  {
    value: 49,
    name: '上海市'
  },
  {
    value: 48,
    name: '河北省'
  },
  {
    value: 43,
    name: '河南省'
  },
  {
    value: 41,
    name: '辽宁省'
  },
  {
    value: 36,
    name: '四川省'
  },
  {
    value: 33,
    name: '湖北省'
  },
  {
    value: 31,
    name: '湖南省'
  },
  {
    value: 29,
    name: '安徽省'
  },
  {
    value: 28,
    name: '吉林省'
  },
  {
    value: 26,
    name: '江西省'
  },
  {
    value: 24,
    name: '新疆维吾尔族自治区'
  },
  {
    value: 24,
    name: '重庆市'
  },
  {
    value: 23,
    name: '福建省'
  },
  {
    value: 19,
    name: '广西壮族自治区'
  },
  {
    value: 18,
    name: '山西省'
  },
  {
    value: 16,
    name: '云南省'
  },
  {
    value: 16,
    name: '内蒙古自治区'
  },
  {
    value: 16,
    name: '黑龙江省'
  },
  {
    value: 12,
    name: '陕西省'
  },
  {
    value: 12,
    name: '天津市'
  },
  {
    value: 11,
    name: '宁夏回族自治区'
  },
  {
    value: 10,
    name: '甘肃省'
  },
  {
    value: 8,
    name: '贵州省'
  },
  {
    value: 4,
    name: '西藏自治区'
  },
  {
    value: 4,
    name: '青海省'
  },
  {
    value: 1,
    name: '海南省'
  }
]

export default function DetailFC(props: any) {
  const { dataList, type } = props
  // 初始化地图
  const [mapRef, mapChart] = useCharts()

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderMapChart()
  }, [mapRef, mapChart, dataList])

  const geoCoordMap: any = {
    江西: [115.892151, 28.676493],
    河南: [113.665412, 34.757975],
    四川: [104.065735, 30.659462],
    重庆: [106.504962, 29.533155],
    西藏: [91.132212, 29.660361],
    贵州: [106.713478, 26.578343],
    辽宁: [123.429096, 41.796767],
    新疆: [87.617733, 43.792818],
    山东: [117.000923, 36.675807],
    上海: [121.472644, 31.231706],
    澳門: [113.54909, 22.198951],
    山西: [112.549248, 37.857014],
    浙江: [120.153576, 30.287459],
    海南: [110.33119, 20.031971],
    福建: [119.306239, 26.075302],
    青海: [101.778916, 36.623178],
    宁夏: [106.278179, 38.46637],
    湖北: [114.298572, 30.584355],
    甘肃: [103.823557, 36.058039],
    安徽: [117.283042, 31.86119],
    台湾: [121.509062, 25.044332],
    陕西: [108.948024, 34.263161],
    广西: [108.320004, 22.82402],
    天津: [117.190182, 39.125596],
    云南: [102.712251, 25.040609],
    黑龙江: [126.642464, 45.756967],
    广东: [113.280637, 23.125178],
    湖南: [112.982279, 28.19409],
    河北: [114.502461, 38.045474],
    内蒙古: [111.670801, 40.818311],
    吉林: [125.3245, 43.886841],
    江苏: [118.767413, 32.041544],
    北京: [116.405285, 39.904989],
    香港: [114.173355, 22.320048]
  }

  const data: any = {
    江西: Math.round(Math.random() * 1000),
    河南: Math.round(Math.random() * 1000),
    四川: 60, //
    重庆: Math.round(Math.random() * 1000),
    西藏: Math.round(Math.random() * 1000),
    贵州: Math.round(Math.random() * 1000),
    辽宁: Math.round(Math.random() * 1000),
    新疆: Math.round(Math.random() * 1000),
    山东: 180, //
    山西: Math.round(Math.random() * 1000),
    海南: 70, //
    福建: Math.round(Math.random() * 1000),
    青海: Math.round(Math.random() * 1000),
    宁夏: Math.round(Math.random() * 1000),
    湖北: Math.round(Math.random() * 1000),
    甘肃: Math.round(Math.random() * 1000),
    安徽: 180, //
    陕西: Math.round(Math.random() * 1000),
    广西: Math.round(Math.random() * 1000),
    云南: Math.round(Math.random() * 1000),
    黑龙江: Math.round(Math.random() * 1000),
    湖南: Math.round(Math.random() * 1000),
    河北: Math.round(Math.random() * 1000),
    内蒙古: Math.round(Math.random() * 1000),
    吉林: Math.round(Math.random() * 1000),
    江苏: 160, //
    北京: 180, //
    上海: 175, //
    浙江: 175, //
    广东: 180 //
  }

  // 保存引导线末端的坐标
  const linesEndCoords: any = {
    山西: [geoCoordMap['山西'][0], geoCoordMap['山西'][1] + 8],
    陕西: [geoCoordMap['陕西'][0], geoCoordMap['陕西'][1] + 16],
    宁夏: [geoCoordMap['宁夏'][0], geoCoordMap['宁夏'][1] + 6],
    甘肃: [geoCoordMap['甘肃'][0], geoCoordMap['甘肃'][1] + 16],
    河北: [geoCoordMap['河北'][0] + 12, geoCoordMap['河北'][1]],
    北京: [geoCoordMap['北京'][0] - 10, geoCoordMap['北京'][1] + 10], //
    山东: [geoCoordMap['山东'][0] + 10, geoCoordMap['山东'][1] + 12], //
    河南: [geoCoordMap['河南'][0] + 14, geoCoordMap['河南'][1]],
    上海: [geoCoordMap['上海'][0] + 10, geoCoordMap['上海'][1] - 3], //
    安徽: [geoCoordMap['安徽'][0] + 23, geoCoordMap['安徽'][1] + 13], //
    江苏: [geoCoordMap['江苏'][0] + 15, geoCoordMap['江苏'][1] + 5], //
    湖北: [geoCoordMap['湖北'][0] + 14, geoCoordMap['湖北'][1]],
    浙江: [geoCoordMap['浙江'][0] + 12, geoCoordMap['浙江'][1] - 12], //
    江西: [geoCoordMap['江西'][0] + 22, geoCoordMap['江西'][1]],
    福建: [geoCoordMap['福建'][0] + 9, geoCoordMap['福建'][1]],
    海南: [geoCoordMap['海南'][0] - 9, geoCoordMap['海南'][1]], //
    重庆: [geoCoordMap['重庆'][0] - 27, geoCoordMap['重庆'][1]],
    四川: [geoCoordMap['四川'][0] - 27, geoCoordMap['四川'][1]], //
    云南: [geoCoordMap['云南'][0] - 10, geoCoordMap['云南'][1]],
    广西: [geoCoordMap['广西'][0] - 30, geoCoordMap['广西'][1]],
    贵州: [geoCoordMap['贵州'][0], geoCoordMap['贵州'][1] - 10],
    湖南: [geoCoordMap['湖南'][0], geoCoordMap['湖南'][1] - 11],
    广东: [geoCoordMap['广东'][0], geoCoordMap['广东'][1] - 11] //
  }

  const infoData: any = {
    四川: `"十四五"时期，每年至少扶持3部电影；建设电影公共服务平台；评选表彰喝宣传推介一批优秀电影。`,
    山东: '公益电影进校园进乡村进社区；到2025年，每年生成有一定影响的影片不少于5部，有较大影响力的影片1-2部，全省城市影院突破800家、银幕数量达到5000块，电影票房力达到40亿元。',
    海南: '借助海南岛国际电影节进行发布与营销；推动微电影等新兴文艺类型繁荣有序发展。',
    安徽: '实施戏曲电影工程，整合全省剧院资源，培育戏曲演出市场和年轻消费群体。',
    广东: '推进乡镇影院建设；建设覆盖全省的数字电影院线以及演出院线；建设佛山“南方影视中心” “粤港澳大湾区电影产业试验区”。',
    江苏: `"十四五"时期，出品有较大影响的电影50部；推动农村电影放映提质增效；推动筹建电影学院；推动扬州光线、常州西太湖等影视基地建设。`,
    上海: '办好上海国际电影节等活动；加快电影创意、拍摄、制作、技术、人才向上海集聚。',
    浙江: '到2025年，电影银幕数达到6000块；推出具有国内一流水准、深受群众喜爱、富有浙江特色的10部电影；创办浙江电影学院；开展农村公益电影放映；办好浙江国际青年电影周等展会。',
    北京: '办好北京国际电影节；每年承接国家重点电影项目5部左右，每年推出市级重点影片30部以上；到2025年全市影院超过300家。'
  }

  // lines引导线数据和坐标
  function dataLines(province: any, data: any) {
    const res: any[] = []
    province.forEach((name: any) => {
      res.push({
        name: name,
        value: data[name],
        coords: [geoCoordMap[name], linesEndCoords[name]]
      })
    })
    return res
  }

  // 散点图数据，其中value属性值为地理坐标和value拼接
  function dataScatter(province: any, data: any) {
    const res: any[] = []
    province.forEach((name: any) => {
      res.push({
        name: name,
        value: [geoCoordMap[name][0], geoCoordMap[name][1], data[name]]
      })
    })
    return res
  }

  const scatterData = [
    { name: '黑龙江', value: 1 },
    { name: '吉林', value: 1 },
    { name: '辽宁', value: 4 },
    { name: '内蒙古', value: 1 },
    { name: '四川', value: 5 },
    { name: '青海', value: 1 },
    { name: '新疆', value: 1 },
    { name: '西藏', value: 1 }
  ]

  // 加载地图数据
  const renderMapChart = async () => {
    if (!mapChart) return
    mapChart?.setOption({
      legend: {},
      geo: {
        type: 'map',
        map: 'china',
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
          // itemStyle: {
          //   areaColor: '#ccc',
          //   borderColor: '#4aacd9'
          // }
        },
        // itemStyle: {
        //   areaColor: '#e5f7ff' // 地图图形颜色 #fff
        //   // borderColor: "#a0d4e7", // 地图边框线色
        //   // borderWidth: 1, // 地图边框线宽
        // },
        regions: [
          {
            // 隐藏南海诸岛
            name: '南海诸岛',
            itemStyle: {
              opacity: 0
            }
          }
        ]
      },
      series: [
        {
          // 含引导线的省份，用lines实现
          type: 'lines',
          symbol: 'circle',
          symbolSize: [10, 10],
          // color: '#ff8003',
          label: {
            show: true,
            padding: [10, 20],
            color: '#fff',
            backgroundColor: '#00A2FF',
            borderRadius: 6,
            maxWidth: 120,
            formatter: function (params: any) {
              const text = infoData[params.name] // 获取地图区域名称
              const maxLengthPerLine = 10 // 每行最大字符数
              const lines = []

              // 简单地将文本按每行最大字符数分割
              for (let i = 0; i < text.length; i += maxLengthPerLine) {
                lines.push(text.slice(i, i + maxLengthPerLine))
              }
              //标签内容
              return `${params.name}\n${lines.join('\n')}`
            }
          },
          lineStyle: {
            type: 'solid',
            opacity: 18
            // shadowBlur: 3
          },
          data: dataLines(['四川', '山东', '海南', '安徽', '广东', '江苏', '上海', '浙江', '北京'], data)
        },
        {
          // 没有引导线的省份，用scatter实现
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 6,
          label: {
            show: false
            // position: 'bottom',
            // formatter: '{b}{@[2]}份'
          },
          // itemStyle: {
          //   color: '#00f'
          // },
          data: scatterData
        }
      ],
      // 视觉映射组件
      visualMap: {
        type: 'continuous',
        left: 'left',
        min: 0,
        max: 200,
        inRange: {
          color: [
            '#e5f7ff',
            '#096dd9'
            // "#fedeb5",
            // "#f96a35",
            // "#c3380e",
            // "#942005",
            // "#5b1305",
          ]
        },
        text: ['政策数量越多，颜色越深', '']
        // textStyle: {
        //   color: '#000'
        // }
        // calculable: true
      }
    })
  }

  return <div ref={mapRef} style={{ height: 800, width: '100%' }}></div>
}
