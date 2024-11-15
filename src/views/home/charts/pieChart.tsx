import { useEffect } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function PieChartFC(props: any) {
  const { legend, pieData, title } = props

  // 初始化实心饼图
  const [pieRef, pieChart] = useCharts()

  useEffect(() => {
    renderSolidPieChart()
  }, [pieRef, pieChart])

  // 加载实心饼图
  const renderSolidPieChart = async () => {
    if (!pieChart) return
    pieChart?.setOption({
      title: {
        text: title || '',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '5%',
        left: 'center',
        data: legend
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '35%'],
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          label: {
            formatter: '{b}\n{d}%'
          },
          data: pieData
        }
      ]
    })
  }

  return <div ref={pieRef} className={styles.itemChart1}></div>
}
