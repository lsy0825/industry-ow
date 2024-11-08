import { useEffect } from 'react'
import { Card, Table } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'

// const dataList = [
//   {
//     value: 218,
//     name: '北京市'
//   },
//   {
//     value: 122,
//     name: '广东省'
//   },
//   {
//     value: 119,
//     name: '台湾省'
//   },
//   {
//     value: 81,
//     name: '香港特别行政区'
//   },
//   {
//     value: 74,
//     name: '山东省'
//   },
//   {
//     value: 68,
//     name: '江苏省'
//   },
//   {
//     value: 62,
//     name: '浙江省'
//   },
//   {
//     value: 49,
//     name: '上海市'
//   },
//   {
//     value: 48,
//     name: '河北省'
//   },
//   {
//     value: 43,
//     name: '河南省'
//   },
//   {
//     value: 41,
//     name: '辽宁省'
//   },
//   {
//     value: 36,
//     name: '四川省'
//   },
//   {
//     value: 33,
//     name: '湖北省'
//   },
//   {
//     value: 31,
//     name: '湖南省'
//   },
//   {
//     value: 29,
//     name: '安徽省'
//   },
//   {
//     value: 28,
//     name: '吉林省'
//   },
//   {
//     value: 26,
//     name: '江西省'
//   },
//   {
//     value: 24,
//     name: '新疆维吾尔族自治区'
//   },
//   {
//     value: 24,
//     name: '重庆市'
//   },
//   {
//     value: 23,
//     name: '福建省'
//   },
//   {
//     value: 19,
//     name: '广西壮族自治区'
//   },
//   {
//     value: 18,
//     name: '山西省'
//   },
//   {
//     value: 16,
//     name: '云南省'
//   },
//   {
//     value: 16,
//     name: '内蒙古自治区'
//   },
//   {
//     value: 16,
//     name: '黑龙江省'
//   },
//   {
//     value: 12,
//     name: '陕西省'
//   },
//   {
//     value: 12,
//     name: '天津市'
//   },
//   {
//     value: 11,
//     name: '宁夏回族自治区'
//   },
//   {
//     value: 10,
//     name: '甘肃省'
//   },
//   {
//     value: 8,
//     name: '贵州省'
//   },
//   {
//     value: 4,
//     name: '西藏自治区'
//   },
//   {
//     value: 4,
//     name: '青海省'
//   },
//   {
//     value: 1,
//     name: '海南省'
//   }
// ]

export default function DetailFC(props:any) {
	const {dataList} = props
	// 初始化地图
  const [mapRef, mapChart] = useCharts()

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderMapChart()
  }, [dataList])

	//企业交易数据-表格
	const corDealColumns: any = [
    {
      title: '排行',
      dataIndex: 'rank',
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
    },
  ]

  // 加载地图数据
  const renderMapChart = async () => {
    if (!mapChart) return
    // const data = await api.getLineData()
    mapChart?.setOption({
      title: '',
      // 提示框
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params: any) => {
          const { data = {} } = params
          const { value = 0 } = data
          return `${params.name}<br/>数量: ${value}`
        }
      },
      // 工具导航
      // toolbox: {
      //   show: true,
      //   left: 'left',
      //   top: 'top',
      //   feature: {
      //     // dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      // 地图数据
      dataset: {
        source: dataList
      },
      series: {
        type: 'map',
        map: 'china',
        data: dataList,
        roam: true, // 地图拖动、缩放
        top: '10%', // 距离顶部距离
        zoom: 1.2, // 当前视角的缩放比例
        scaleLimit: {
          max: 2,
          min: 1 // 设置默认缩放效果
        },
        // 文本标签，地区名, 控制样式，位置等等，可以是数组，多个
        label: {
          show: true, // 默认状态下，显示省市名称
          position: [1, 100], // 相对的百分比
          fontSize: 12,
          offset: [2, 0],
          align: 'left'
        },
        itemStyle: {
          areaColor: '#e5f7ff' // 地图图形颜色 #fff
          // borderColor: "#a0d4e7", // 地图边框线色
          // borderWidth: 1, // 地图边框线宽
        },
        // 高亮状态下的多边形和文本样式，鼠标悬浮在地图块上的效果
        emphasis: {
          itemStyle: {
            areaColor: '#ccc',
            borderColor: '#4aacd9'
          }
        }
      },
      // 视觉映射组件
      visualMap: {
        type: 'continuous',
        left: 'left',
        min: 0,
        max: 218,
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
        text: [`最大值：218`, 0],
        textStyle: {
          color: '#000'
        }
        // calculable: true
      }
    })
  }

  return (
		<div className={styles.chart}>
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
		</div>
  )
}
