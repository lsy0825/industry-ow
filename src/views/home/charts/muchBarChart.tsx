import { useEffect } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function BarChartFC(props: any) {
  const { xdata, ydata1, ydata2 } = props

  // 初始化条形图
  const [barRef, barChart] = useCharts()

  useEffect(() => {
    renderBarChart()
  }, [barRef, barChart])

  // 条形图数据
  const renderBarChart = () => {
    if (!barChart) return
    barChart?.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xdata
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '产业内其他企业(家)',
          type: 'bar',
          stack: 'Ad',
          barWidth: '30%',
          emphasis: {
            focus: 'series'
          },
          data: ydata1
        },
        {
          name: '产业内重点企业(家)',
          type: 'bar',
          stack: 'Ad',
          barWidth: '30%',
          emphasis: {
            focus: 'series'
          },
          data: ydata2
        }
      ]
    })
  }

  return <div ref={barRef} className={styles.itemChart1}></div>
}
