import { useEffect } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function RadarChartFC(props: any) {
  const { data, title, radarName1, radarName2, radarData1, radarData2 } = props

  // 初始化条形图
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    renderBarChart()
  }, [radarRef, radarChart])

  // 条形图数据
  const renderBarChart = () => {
    if (!radarChart) return
    radarChart?.setOption({
      title: {
        text: title
      },
      legend: {
        data: [radarName1, radarName2]
      },
      radar: {
        // shape: 'circle',
        indicator: data
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: radarData1,
              name: radarName1
            },
            {
              value: radarData2,
              name: radarName2
            }
          ]
        }
      ]
    })
  }

  return <div ref={radarRef} className={styles.itemChart1}></div>
}
