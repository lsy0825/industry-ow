import { useEffect } from 'react'
import { Card, Col, Descriptions, Row, Table, Tag, Tabs, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import { useRequest } from 'ahooks'
import api from '@/api'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'
import { DetailProps } from '../type'
import { flattenTree, getName, mergeIdList } from '@/utils'
import moment from 'moment'
import { useStore } from '@/store'
import CommonPolicyList from './commonPolicyList'
import ChainChart from '../charts/chainChart'
import MapChart from '../charts/mapChart'

const dataList = [
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

// const items: DescriptionsProps['items'] = [
//   {
//     key: '1',
//     label: '经营能力',
//     children: '经营能力优异。'
//   },
//   {
//     key: '2',
//     label: '创新能力',
//     children: '创新能力优异。建立1个创新平台。'
//   },
//   {
//     key: '3',
//     label: '融资能力',
//     children: '融资能力优异。'
//   },
//   {
//     key: '4',
//     label: '成长能力',
//     children: '成长能力优异。技术增长速度较快。'
//   },
//   {
//     key: '5',
//     label: '社会贡献',
//     children: '社会贡献优异。在解决就业表现突出。'
//   }
// ]

export default function DetailFC(props: DetailProps) {
  const { record, setCurrent } = props
  console.log(record, 'record')

  const { areaNames } = useStore()
  // 财务数据-营收-条形图
  const [revenueRef, revenueChart] = useCharts()
  // 财务数据-研发投入-条形图
  const [rdInvestRef, rdInvestChart] = useCharts()
  // 产品流通-折线图
  const [productsRef, productsChart] = useCharts()
  // 初始化地图
  // const [mapRef, mapChart] = useCharts()
  // 初始化链状图
  // const [chainRef, chainChart] = useCharts()
  // 初始化条形图
  // const [lineRef, lineChart] = useCharts()
  // 初始饼图
  // const [pieRef1, pieChart1] = useCharts()
  // 初始化雷达图
  // const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderRevenueChart()
    renderRDInvestChart()
    renderProductsChart()
    // renderChainChart()
    // renderLineChart()
    // renderPieChart()
    // renderRadarChart()
    // renderMapChart()
  }, [revenueChart, rdInvestChart, productsChart])

  // 营收--条形图数据
  const renderRevenueChart = async () => {
    if (!revenueChart) return
    // const data = await api.getLineData()
    revenueChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['营收', '非营收', '总收入']
      },
      xAxis: {
        data: ['2022Q1', '2022Q2', '2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3'] //data.label
      },
      yAxis: {
        // name: '企业数量（家）',
        type: 'value'
      },
      series: [
        {
          name: '营收',
          type: 'bar',
          data: [3852, 1767, 45244, 1254, 4578, 2354, 7854], //data.order
          // barWidth: '30%',
          barGap: '20%',
          barCategoryGap: '20%'
        },
        {
          name: '非营收',
          type: 'bar',
          data: [4111, 4222, 10000, 5000, 5132, 3211, 2312], //data.order
          // barWidth: '30%'
          barGap: '20%',
          barCategoryGap: '20%'
        },
        {
          name: '总收入',
          type: 'bar',
          data: [200000, 245555, 34555, 748586, 234563, 46877, 43455], //data.order
          // barWidth: '30%'
          barGap: '20%',
          barCategoryGap: '20%'
        }
      ]
    })
  }
  //营收-表格
  const revenueColumns: any = [
    {
      title: '序号',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1 //+(searchValue.page-1)*searchValue.pageSize
    },
    {
      title: '年份',
      dataIndex: 'year'
    },
    {
      title: '营业总收入(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '营业收入(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '营业外收入(万元)',
      dataIndex: 'investedNum'
    }
  ]

  // 研发投入--条形图数据
  const renderRDInvestChart = async () => {
    if (!rdInvestChart) return
    // const data = await api.getLineData()
    rdInvestChart?.setOption({
      tooltip: {
        trigger: 'axis'
        // axisPointer: { type: 'cross' }
      },
      legend: { data: ['研发费用', '研发投入占比'] },
      xAxis: [
        {
          // type: 'category',
          // axisTick: {
          // 	alignWithLabel: true
          // },
          data: ['2022Q1', '2022Q2', '2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '万元',
          // min: 0,
          // max: 25,
          position: 'left'
          // axisLabel: {
          // 	formatter: '{value}'
          // }
        },
        {
          type: 'value',
          name: '%',
          // min: 0,
          // max: 5,
          position: 'right'
          // axisLabel: {
          // 	formatter: '{value}'
          // }
        }
      ],
      series: [
        {
          name: '研发费用',
          type: 'bar',
          yAxisIndex: 0,
          data: [8887.0, 5466.2, 2457.3, 13100.5, 45677.3, 21344.2, 123474.3, 2456.4, 12347.0, 3577.5, 4567.0, 8984.2]
        },
        {
          name: '研发投入占比',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [1.2, 3.2, 1.7, 1.8, 1.7, 4.7, 3.6, 4.2, 1.7, 2.8, 3.0, 1.3]
        }
      ]
    })
  }
  //研发投入-表格
  const rDInvestColumns: any = [
    {
      title: '序号',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1 //+(searchValue.page-1)*searchValue.pageSize
    },
    {
      title: '年份',
      dataIndex: 'year'
    },
    {
      title: '研发费用(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '研发投入占比(%)',
      dataIndex: 'investedNum'
    }
  ]

  //企业交易数据-表格
  const corDealColumns: any = [
    {
      title: '排行',
      dataIndex: 'rank'
    },
    {
      title: '区域',
      dataIndex: 'area'
    },
    {
      title: '企业',
      dataIndex: 'investedNum'
    },
    {
      title: '产业链类别',
      dataIndex: 'investedNum'
    },
    {
      title: '上下游',
      dataIndex: 'investedNum'
    }
  ]

  // 产品流通--折线图数据
  const renderProductsChart = async () => {
    if (!productsChart) return
    // const data = await api.getLineData()
    productsChart?.setOption({
      tooltip: { trigger: 'axis' },
      // legend: {data: ['研发费用','研发投入占比']},
      xAxis: [
        {
          name: '年份',
          axisTick: {
            alignWithLabel: true
          },
          data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
        }
      ],
      yAxis: { type: 'value' },
      series: [
        {
          name: '产品流通信息',
          type: 'line',
          smooth: true,
          data: [1, 3, 7, 8, 17, 47, 36, 42, 17, 28]
        }
      ]
    })
  }

  // 加载地图数据
  // const renderMapChart = async () => {
  //   if (!mapChart) return
  //   // const data = await api.getLineData()
  //   mapChart?.setOption({
  //     title: '',
  //     // 提示框
  //     tooltip: {
  //       trigger: 'item',
  //       showDelay: 0,
  //       transitionDuration: 0.2,
  //       formatter: (params: any) => {
  //         const { data = {} } = params
  //         const { value = 0 } = data
  //         return `${params.name}<br/>数量: ${value}`
  //       }
  //     },
  //     // 工具导航
  //     // toolbox: {
  //     //   show: true,
  //     //   left: 'left',
  //     //   top: 'top',
  //     //   feature: {
  //     //     // dataView: { readOnly: false },
  //     //     restore: {},
  //     //     saveAsImage: {}
  //     //   }
  //     // },
  //     // 地图数据
  //     dataset: {
  //       source: dataList
  //     },
  //     series: {
  //       type: 'map',
  //       map: 'china',
  //       data: dataList,
  //       roam: true, // 地图拖动、缩放
  //       top: '10%', // 距离顶部距离
  //       zoom: 1.2, // 当前视角的缩放比例
  //       scaleLimit: {
  //         max: 2,
  //         min: 1 // 设置默认缩放效果
  //       },
  //       // 文本标签，地区名, 控制样式，位置等等，可以是数组，多个
  //       label: {
  //         show: true, // 默认状态下，显示省市名称
  //         position: [1, 100], // 相对的百分比
  //         fontSize: 12,
  //         offset: [2, 0],
  //         align: 'left'
  //       },
  //       itemStyle: {
  //         areaColor: '#e5f7ff' // 地图图形颜色 #fff
  //         // borderColor: "#a0d4e7", // 地图边框线色
  //         // borderWidth: 1, // 地图边框线宽
  //       },
  //       // 高亮状态下的多边形和文本样式，鼠标悬浮在地图块上的效果
  //       emphasis: {
  //         itemStyle: {
  //           areaColor: '#ccc',
  //           borderColor: '#4aacd9'
  //         }
  //       }
  //     },
  //     // 视觉映射组件
  //     visualMap: {
  //       type: 'continuous',
  //       left: 'left',
  //       min: 0,
  //       max: 218,
  //       inRange: {
  //         color: [
  //           '#e5f7ff',
  //           '#096dd9'
  //           // "#fedeb5",
  //           // "#f96a35",
  //           // "#c3380e",
  //           // "#942005",
  //           // "#5b1305",
  //         ]
  //       },
  //       text: [`最大值：218`, 0],
  //       textStyle: {
  //         color: '#000'
  //       }
  //       // calculable: true
  //     }
  //   })
  // }

  const data = {
    name: 'flare',
    children: [
      {
        name: 'data',
        children: [
          {
            name: 'converters',
            children: [
              { name: 'Converters', value: 721 },
              { name: 'DelimitedTextConverter', value: 4294 }
            ]
          },
          {
            name: 'DataUtil',
            value: 3322
          }
        ]
      },
      {
        name: 'display',
        children: [
          { name: 'DirtySprite', value: 8833 },
          { name: 'LineSprite', value: 1732 },
          { name: 'RectSprite', value: 3623 }
        ]
      },
      {
        name: 'flex',
        children: [{ name: 'FlareVis', value: 4116 }]
      },
      {
        name: 'query',
        children: [
          { name: 'AggregateExpression', value: 1616 },
          { name: 'And', value: 1027 },
          { name: 'Arithmetic', value: 3891 },
          { name: 'Average', value: 891 },
          { name: 'BinaryExpression', value: 2893 },
          { name: 'Comparison', value: 5103 },
          { name: 'CompositeExpression', value: 3677 },
          { name: 'Count', value: 781 },
          { name: 'DateUtil', value: 4141 },
          { name: 'Distinct', value: 933 },
          { name: 'Expression', value: 5130 },
          { name: 'ExpressionIterator', value: 3617 },
          { name: 'Fn', value: 3240 },
          { name: 'If', value: 2732 },
          { name: 'IsA', value: 2039 },
          { name: 'Literal', value: 1214 },
          { name: 'Match', value: 3748 },
          { name: 'Maximum', value: 843 },
          {
            name: 'methods',
            children: [
              { name: 'add', value: 593 },
              { name: 'and', value: 330 },
              { name: 'average', value: 287 },
              { name: 'count', value: 277 },
              { name: 'distinct', value: 292 },
              { name: 'div', value: 595 },
              { name: 'eq', value: 594 },
              { name: 'fn', value: 460 },
              { name: 'gt', value: 603 },
              { name: 'gte', value: 625 },
              { name: 'iff', value: 748 },
              { name: 'isa', value: 461 },
              { name: 'lt', value: 597 },
              { name: 'lte', value: 619 },
              { name: 'max', value: 283 },
              { name: 'min', value: 283 },
              { name: 'mod', value: 591 },
              { name: 'mul', value: 603 },
              { name: 'neq', value: 599 },
              { name: 'not', value: 386 },
              { name: 'or', value: 323 },
              { name: 'orderby', value: 307 },
              { name: 'range', value: 772 },
              { name: 'select', value: 296 },
              { name: 'stddev', value: 363 },
              { name: 'sub', value: 600 },
              { name: 'sum', value: 280 },
              { name: 'update', value: 307 },
              { name: 'variance', value: 335 },
              { name: 'where', value: 299 },
              { name: 'xor', value: 354 },
              { name: '_', value: 264 }
            ]
          },
          { name: 'Minimum', value: 843 },
          { name: 'Not', value: 1554 },
          { name: 'Or', value: 970 },
          { name: 'Query', value: 13896 },
          { name: 'Range', value: 1594 },
          { name: 'StringUtil', value: 4130 },
          { name: 'Sum', value: 791 },
          { name: 'Variable', value: 1124 },
          { name: 'Variance', value: 1876 },
          { name: 'Xor', value: 1101 }
        ]
      },
      {
        name: 'scale',
        children: [
          { name: 'IScaleMap', value: 2105 },
          { name: 'LinearScale', value: 1316 },
          { name: 'LogScale', value: 3151 },
          { name: 'OrdinalScale', value: 3770 },
          { name: 'QuantileScale', value: 2435 },
          { name: 'QuantitativeScale', value: 4839 },
          { name: 'RootScale', value: 1756 },
          { name: 'Scale', value: 4268 },
          { name: 'ScaleType', value: 1821 },
          { name: 'TimeScale', value: 5833 }
        ]
      }
    ]
  }

  // 链状图数据
  // const renderChainChart = async () => {
  //   if (!chainChart) return
  //   // const data = await api.getLineData()
  //   chainChart?.setOption({
  //     tooltip: {
  //       trigger: 'item',
  //       triggerOn: 'mousemove'
  //     },
  // 		// legend: {
  // 		// 	bottom: '2%',
  // 		// 	left: '3%',
  // 		// 	orient: 'vertical',
  // 		// 	data: [
  // 		// 		{
  // 		// 			name: '业务领域覆盖',
  // 		// 			icon: 'circle'
  // 		// 		},
  // 		// 		{
  // 		// 			name: '暂无业务布局',
  // 		// 			// icon: 'rectangle'
  // 		// 		},
  // 		// 	],
  // 		// 	borderColor: '#c23531'
  // 		// },
  //     series: [
  //       {
  //         type: 'tree',
  // 				name: '业务领域覆盖',
  //         data: [data],
  //         top: '1%',
  //         left: '7%',
  //         bottom: '1%',
  //         right: '20%',
  //         symbolSize: 7,
  //         label: {
  //           position: 'left',
  //           verticalAlign: 'middle',
  //           align: 'right',
  //           fontSize: 9
  //         },
  //         leaves: {
  //           label: {
  //             position: 'right',
  //             verticalAlign: 'middle',
  //             align: 'left'
  //           }
  //         },
  //         emphasis: {
  //           focus: 'descendant'
  //         },
  //         expandAndCollapse: true,
  //         animationDuration: 550,
  //         animationDurationUpdate: 750
  //       },
  //     ]
  //   })
  // }

  // 加载条形图数据
  // const renderLineChart = async () => {
  //   if (!lineChart) return
  //   // const data = await api.getLineData()
  //   lineChart?.setOption({
  //     title: {
  //       text: '订单和流水走势图'
  //     },
  //     tooltip: {
  //       trigger: 'axis'
  //     },
  //     legend: {
  //       data: ['订单']
  //     },
  //     xAxis: {
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] //data.label
  //     },
  //     yAxis: {
  //       name: '企业数量（家）',
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         name: '订单',
  //         type: 'bar',
  //         data: [23, 24, 18, 25, 27, 28, 25], //data.order
  //         barWidth: '30%'
  //       }
  //     ]
  //   })
  // }

  // 加载饼图1
  // const renderPieChart = async () => {
  //   if (!pieChart1) return
  //   // const data = await api.getPieCityData()
  //   pieChart1?.setOption({
  //     title: {
  //       text: '司机城市分布',
  //       left: 'center'
  //     },
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       x: 'left',
  //       data: ['A', 'B', 'C', 'D', 'E']
  //     },
  //     series: [
  //       {
  //         // name: '城市分布',
  //         type: 'pie',
  //         radius: ['50%', '70%'],
  //         avoidLabelOverlap: false,
  //         label: {
  //           show: false,
  //           position: 'center'
  //         },
  //         labelLine: {
  //           show: false
  //         },
  //         emphasis: {
  //           label: {
  //             show: true,
  //             fontSize: '30',
  //             fontWeight: 'bold'
  //           }
  //         },
  //         data: [
  //           { value: 335, name: 'A' },
  //           { value: 310, name: 'B' },
  //           { value: 234, name: 'C' },
  //           { value: 135, name: 'D' },
  //           { value: 1548, name: 'E' }
  //         ]
  //       }
  //     ]
  //   })
  // }

  const mytextStyle = {
    color: '#333', //文字颜色
    fontStyle: 'normal', //italic斜体  oblique倾斜
    fontWeight: 'normal', //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
    // fontFamily:"sans-serif",   //字体系列
    fontSize: 12 //字体大小
  }

  // 加载雷达图
  // const renderRadarChart = async () => {
  //   if (!radarChart) return
  //   // const data = await api.getRadarData()
  //   radarChart?.setOption(
  //     {
  //       title: {
  //         text: '司机模型诊断'
  //       },
  //       //点击提示标签
  //       tooltip: {},
  //       legend: {
  //         //图例文字展示
  //         data: [{ name: '今日更新投诉量' }],
  //         //图例显示在底部
  //         bottom: 0,
  //         //图例背景颜色
  //         backgroundColor: 'transparent',
  //         // 图例标记的图形宽度。[ default: 25 ]
  //         itemWidth: 12,
  //         // 图例标记的图形高度。[ default: 14 ]
  //         itemHeight: 9,
  //         //图例文字样式设置
  //         textStyle: mytextStyle
  //       },
  //       radar: {
  //         //雷达图绘制类型，支持 'polygon' 和 'circle' [ default: 'polygon' ]
  //         shape: 'polygon',
  //         splitNumber: 5,
  //         center: ['50%', '50%'],
  //         radius: '65%',
  //         //指示器名称和指示器轴的距离。[ default: 15 ]
  //         nameGap: 5,
  //         triggerEvent: true,
  //         name: {
  //           textStyle: {
  //             color: '#999',
  //             backgroundColor: 'transparent'
  //             // borderRadius: 3,
  //             // padding: [3, 5]
  //           },
  //           formatter: function (value: any, indicator: any) {
  //             value = value.replace(/\S{4}/g, function (match: any) {
  //               return match + '\n'
  //             })
  //             // value = value + '\n' + indicator.value;
  //             return '{a|' + value + '}' + '\n' + '{b|' + indicator.value + '}'
  //           },
  //           //富文本编辑 修改文字展示样式
  //           rich: {
  //             a: {
  //               color: '#999',
  //               fontSize: 12,
  //               align: 'center'
  //             },
  //             b: {
  //               color: '#333',
  //               fontSize: 17,
  //               align: 'center'
  //             }
  //           }
  //         },
  //         // 设置雷达图中间射线的颜色
  //         axisLine: {
  //           lineStyle: {
  //             color: '#ddd'
  //           }
  //         },
  //         // axisLabel: {
  //         //   show: true
  //         // },
  //         indicator: [
  //           { name: '车辆已售', value: '99%', max: 100 },
  //           { name: '商家冒充个人', value: '89%', max: 100 },
  //           { name: '商家服务态度差', value: '80%', max: 100 },
  //           { name: '电话无法接通', value: '98%', max: 100 },
  //           { name: '走私套牌抵押车', value: '70%', max: 100 }
  //         ],
  //         //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
  //         splitArea: {
  //           show: false,
  //           areaStyle: {
  //             color: 'rgba(255,0,0,0)' // 图表背景的颜色
  //           }
  //         }
  //       },
  //       series: [
  //         {
  //           name: '投诉统计',
  //           type: 'radar',
  //           //显示雷达图选中背景
  //           areaStyle: { normal: {} },
  //           data: [
  //             {
  //               value: [99, 89, 80, 98, 70],
  //               // 设置区域边框和区域的颜色
  //               itemStyle: {
  //                 normal: {
  //                   //雷达图背景渐变设置
  //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //                     {
  //                       offset: 0.5,
  //                       color: 'rgba(48,107, 231, 1)'
  //                     },
  //                     {
  //                       offset: 1,
  //                       color: 'rgba(73,168, 255, 0.7)'
  //                     }
  //                   ]),
  //                   //去除刻度
  //                   opacity: 0,
  //                   //雷达图边线样式
  //                   lineStyle: {
  //                     width: 0,
  //                     color: '#306BE7'
  //                   }
  //                 }
  //               }
  //               // name: '今日更新投诉量',
  //               // id: 'jintian'
  //             }
  //             // {
  //             //   value: [10, 250, 100, 370, 80, 500, 190, 400],
  //             //   // 设置区域边框和区域的颜色
  //             //   itemStyle: {
  //             //     normal: {
  //             //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //             //         {
  //             //           offset: 0.5,
  //             //           color: 'rgba(139,241, 134, 0.7)'
  //             //         },
  //             //         {
  //             //           offset: 1,
  //             //           color: 'rgba(0,208, 131, 1)'
  //             //         }
  //             //       ]),
  //             //       opacity: 0,
  //             //       lineStyle: {
  //             //         width: 0,
  //             //         color: '#8BF186'
  //             //       }
  //             //     }
  //             //   },
  //             //   name: '昨日更新投诉量',
  //             //   id: 'zuotian'
  //             // }
  //           ]
  //         }
  //       ]
  //     }
  //     // 	{
  //     //   title: {
  //     //     text: '司机模型诊断',
  //     //     left: 'center'
  //     //   },
  //     //   legend: {
  //     //     data: ['司机模型诊断'],
  //     //     //图例显示在底部
  //     //     bottom: 0,
  //     //     //图例背景颜色
  //     //     backgroundColor: 'transparent',
  //     //     // 图例标记的图形宽度。[ default: 25 ]
  //     //     itemWidth: 12,
  //     //     // 图例标记的图形高度。[ default: 14 ]
  //     //     itemHeight: 9,
  //     //     //图例文字样式设置
  //     //     textStyle: {
  //     //       color: '#333', //文字颜色
  //     //       fontStyle: 'normal', //italic斜体  oblique倾斜
  //     //       fontWeight: 'normal', //文字粗细bold bolder lighter  100 | 200 | 300 | 400...
  //     //       // fontFamily:"sans-serif",   //字体系列
  //     //       fontSize: 12 //字体大小
  //     //     }
  //     //   },
  //     //   radar: {
  //     //     //雷达图绘制类型，支持 'polygon' 和 'circle' [ default: 'polygon' ]
  //     //     shape: 'polygon',
  //     //     splitNumber: 5,
  //     //     center: ['50%', '50%'],
  //     //     radius: '65%',
  //     //     //指示器名称和指示器轴的距离。[ default: 15 ]
  //     //     nameGap: 5,
  //     //     triggerEvent: true,
  //     //     name: {
  //     //       textStyle: {
  //     //         color: '#999',
  //     //         backgroundColor: 'transparent'
  //     //         // borderRadius: 3,
  //     //         // padding: [3, 5]
  //     //       },
  //     //       // formatter: function (value: any, indicator: any) {
  //     //       //   value = value.replace(/\S{4}/g, function (match) {
  //     //       //     return match + '\n'
  //     //       //   })
  //     //       //   // value = value + '\n' + indicator.value;
  //     //       //   return '{a|' + value + '}' + '\n' + '{b|' + indicator.value + '}'
  //     //       // },
  //     //       // 富文本编辑 修改文字展示样式
  //     //       rich: {
  //     //         a: {
  //     //           color: '#999',
  //     //           fontSize: 12,
  //     //           align: 'center'
  //     //         },
  //     //         b: {
  //     //           color: '#333',
  //     //           fontSize: 17,
  //     //           align: 'center'
  //     //         }
  //     //       }
  //     //     },
  //     //     // 设置雷达图中间射线的颜色
  //     //     axisLine: {
  //     //       lineStyle: {
  //     //         color: '#ddd'
  //     //       }
  //     //     },
  //     //     indicator: [
  //     //       { name: '车辆已售', value: 99, max: 100 },
  //     //       { name: '商家冒充个人', value: 80, max: 100 },
  //     //       { name: '商家服务态度差', value: 70, max: 100 },
  //     //       { name: '电话无法接通', value: 88, max: 100 },
  //     //       { name: '走私套牌抵押车', value: 100, max: 100 }
  //     //     ],
  //     //     //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
  //     //     splitArea: {
  //     //       show: false,
  //     //       areaStyle: {
  //     //         color: 'rgba(255,0,0,0)' // 图表背景的颜色
  //     //       }
  //     //     }
  //     //   },
  //     //   series: [
  //     //     {
  //     //       name: '模型诊断',
  //     //       type: 'radar',
  //     //       //显示雷达图选中背景
  //     //       areaStyle: { normal: {} },
  //     //       data: [
  //     //         {
  //     //           value: [99, 80, 70, 88, 100],
  //     //           // 设置区域边框和区域的颜色
  //     //           itemStyle: {
  //     //             normal: {
  //     //               //雷达图背景渐变设置
  //     //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //     //                 {
  //     //                   offset: 0.5,
  //     //                   color: 'rgba(48,107, 231, 1)'
  //     //                 },
  //     //                 {
  //     //                   offset: 1,
  //     //                   color: 'rgba(73,168, 255, 0.7)'
  //     //                 }
  //     //               ]),
  //     //               //去除刻度
  //     //               opacity: 0,
  //     //               //雷达图边线样式
  //     //               lineStyle: {
  //     //                 width: 0,
  //     //                 color: '#306BE7'
  //     //               }
  //     //             }
  //     //           }
  //     //           // name: '今日更新投诉量',
  //     //           // id: 'jintian'
  //     //         }
  //     //       ]
  //     //     }
  //     //   ]
  //     // }
  //   )
  // }

  const { data: detailInfo } = useRequest(
    async () => {
      const resp: Record<string, any> = (await api.getEnterpriseDetail({ id: record?.id })) as Record<string, any>
      return resp
    },
    {
      manual: false
    }
  )
  const devices = [
    { name: '减速器', count: 59 },
    { name: '伺服电机', count: 117 },
    { name: '控制器', count: 1562 },
    { name: '传感器', count: 442 }
  ]
  const softwares = [
    { name: '人工智能', count: 59 },
    { name: '操作系统', count: 117 },
    { name: 'SLAM', count: 1562 }
  ]
  const dataSource = [
    {
      province: '陕西省',
      investedNum: 40,
      id: '1',
      children: [
        { city: '西安市', investedNum: 31, id: '1-1' },
        { city: '咸阳市', investedNum: 4, id: '1-2' },
        { city: '铜川市', investedNum: 3, id: '1-3' },
        { city: '榆林市', investedNum: 1, id: '1-4' },
        { city: '宝鸡市', investedNum: 1, id: '1-5' }
      ]
    },
    {
      province: '宁夏回族自治区',
      investedNum: 15,
      id: '2',
      children: [
        { city: '银川市', investedNum: 8, id: '2-1' },
        { city: '吴忠市', investedNum: 3, id: '2-2' },
        { city: '中卫市', investedNum: 3, id: '2-3' },
        { city: '石嘴山市', investedNum: 1, id: '2-4' }
      ]
    },
    {
      province: '山东省',
      investedNum: 24,
      id: '3',
      children: [
        { city: '济宁市', investedNum: 7, id: '3-1' },
        { city: '潍坊市', investedNum: 6, id: '3-2' },
        { city: '济南市', investedNum: 2, id: '3-3' },
        { city: '菏泽市', investedNum: 2, id: '3-4' },
        { city: '德州市', investedNum: 2, id: '3-4' },
        { city: '东营市', investedNum: 1, id: '3-4' },
        { city: '聊城市', investedNum: 1, id: '3-4' }
      ]
    }
  ]

  const columns: any = [
    {
      title: '省份',
      dataIndex: 'province',
      onCell: (_: unknown, index: number) => mergeIdList(index, flattenTree(dataSource), 'province')
    },
    {
      title: '市级',
      dataIndex: 'city'
    },
    {
      title: '投资企业数',
      dataIndex: 'investedNum'
    }
  ]

  const columnsPatent: any = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text: unknown, row: unknown, index: number) => index + 1
    },
    {
      title: '专利名称',
      dataIndex: 'investedNum'
    },
    {
      title: '专利类型',
      dataIndex: 'investedNum'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '公告号',
      dataIndex: 'investedNum'
    },
    {
      title: '申请日',
      dataIndex: 'investedNum'
    },
    {
      title: '公告日',
      dataIndex: 'investedNum'
    },
    {
      title: '申请（专利权）人',
      dataIndex: 'investedNum'
    },
    {
      title: '价值评分',
      dataIndex: 'age',
      // defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.age - b.age
    }
  ]

  return (
    <div className={styles.detail}>
      <div className={styles.topBtn}>
        <div className={styles.detailText}>{record?.name}</div>
        <Button onClick={() => setCurrent('2')}>返回</Button>
      </div>
      <div className={styles.detailStyle}>
        {/* 基本信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>基本信息</span>
        </div>
        <Descriptions title={null} column={4} style={{ marginBottom: 16 }}>
          <Descriptions.Item label='成立日'>
            {moment(detailInfo?.dateEstablishment).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label='注册额'>{`${detailInfo?.annualIncome}万元`}</Descriptions.Item>
          <Descriptions.Item label='员工数'>{detailInfo?.numberEmployees}</Descriptions.Item>
          <Descriptions.Item label='所在地'>{getName(areaNames, detailInfo?.registeredOfficeId)}</Descriptions.Item>
          <Descriptions.Item label='所属行业' span={4}>
            {detailInfo?.industryclassList?.map((tag: string) => (
              <Tag color='#2db7f5' key={tag}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label='公司资质' span={4}>
            {detailInfo?.qualificationsList?.map((tag: string) => (
              <Tag color='#fcb138' key={tag}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
        {/* 财务数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>财务数据</span>
        </div>
        <div className={styles.chart}>
          <Card style={{ width: 700, height: 400 }}>
            <div ref={revenueRef} className={styles.itemChart}></div>
          </Card>
          <Table
            columns={revenueColumns}
            dataSource={[]}
            bordered
            rowKey='id'
            pagination={false}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </div>
        <div className={styles.rdText}>研发投入</div>
        <div className={styles.chart}>
          <Card style={{ width: 700, height: 400 }}>
            <div ref={rdInvestRef} className={styles.itemChart}></div>
          </Card>
          <Table
            columns={rDInvestColumns}
            dataSource={[]}
            bordered
            rowKey='id'
            pagination={false}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </div>
        {/* 企业交易数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>企业交易数据</span>
        </div>
        <MapChart dataList={dataList} />
        {/* <div className={styles.chart}>
        <Card>
          <div ref={mapRef} className={styles.itemMap}></div>
        </Card>
        <Table
          columns={corDealColumns}
          dataSource={[]}
          bordered
          rowKey='id'
          pagination={false}
          style={{ width: '100%', marginLeft: 24 }}
        />
      </div> */}
        {/* 产品流通信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>产品流通信息</span>
        </div>
        <Card style={{ marginBottom: 16 }}>
          <div ref={productsRef} className={styles.itemChart}></div>
        </Card>
        {/* 企业专利信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>企业专利信息</span>
        </div>
        <Table
          columns={columnsPatent}
          dataSource={[]}
          bordered
          rowKey='id'
          pagination={false}
          style={{ width: '100%', marginBottom: 16 }}
        />
        {/* 关联产业链数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>关联产业链数据</span>
        </div>
        <Tabs
          // defaultActiveKey="1"
          type='card'
          style={{ height: 600 }}
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i)
            return {
              label: `Tab-${id}`,
              key: id,
              children: <ChainChart data={data} />
            }
          })}
        />
        {/* <Card>
				<div ref={chainRef} className={styles.itemChart1}></div>
			</Card> */}
        {/* 雷达图 */}
        {/* <div className={styles.chart}>
        <Card>
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
        <Descriptions column={1} style={{ width: '100%', marginLeft: 24 }} bordered items={items} />
      </div> */}
        {/* 条形图和饼图 */}
        {/* <div className={styles.chart}>
        <Card style={{ width: 600, height: 400 }}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
        <Card style={{ width: 600, height: 400 }}>
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
          </div>
        </Card>
      </div> */}

        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>产业相关政策信息</span>
        </div>
        <CommonPolicyList
          dataList={[]}
          title='policy'
          // searchValue={searchValue}
          // setSearchValue={setSearchValue}
        />
        {/* <Row gutter={10}>
        <Col span={8}>
          <div className={styles.infoTitle}>上游：核心设备及零部件</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              核心零部件
            </span>
            <span className={styles.leftSubTitle}>软件应用开发</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoTitle}>中游：机器人制造</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              服务机器人
            </span>
            <span className={styles.leftSubTitle}>工业机器人</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>col-8</Col>
      </Row> */}
      </div>
    </div>
  )
}
