import { useEffect } from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
// import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
// import { DetailProps } from '../type'

export default function DetailFC(props: any) {
  const { data } = props

  // 初始化链状图
  const [chainRef, chainChart] = useCharts()

  useEffect(() => {
    console.log(data, 'data')

    renderChainChart()
  }, [data, chainRef, chainChart])

  // 链状图数据
  const renderChainChart = () => {
    if (!chainChart) return
    // const data = await api.getLineData()
    chainChart?.setOption({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      // legend: {
      // 	bottom: '2%',
      // 	left: '3%',
      // 	orient: 'vertical',
      // 	data: [
      // 		{
      // 			name: '业务领域覆盖',
      // 			icon: 'circle'
      // 		},
      // 		{
      // 			name: '暂无业务布局',
      // 			// icon: 'rectangle'
      // 		},
      // 	],
      // 	borderColor: '#c23531'
      // },
      series: [
        {
          type: 'tree',
          name: '业务领域覆盖',
          data: [data],
          top: '1%',
          left: '18%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    })
  }

  return <div ref={chainRef} className={styles.itemChart1}></div>
}
