import { useEffect } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function BarChartFC(props: any) {
  const { xdata, ydata, yname, title } = props

  // 初始化条形图
  const [barRef, barChart] = useCharts()

  useEffect(() => {
    renderBarChart()
  }, [barRef, barChart])

  // 条形图数据
  const renderBarChart = () => {
    if (!barChart) return
    barChart?.setOption({
      title: {
        text: title,
        position: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['订单']
      // },
      xAxis: {
        data: xdata
      },
      yAxis: {
        name: yname,
        type: 'value'
      },
      series: [
        {
          name: 'data',
          type: 'bar',
          data: ydata, //data.order
          barWidth: '30%',
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    })
  }

  return <div ref={barRef} className={styles.itemChart1}></div>
}
