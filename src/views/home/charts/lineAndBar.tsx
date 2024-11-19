import { useEffect } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'

export default function BarChartFC(props: any) {
  const { xdata, ydata1, ydata2, yname1, yname2, yAxisName1, yAxisName2, isSmooth } = props

  // 初始化柱折图
  const [rdInvestRef, rdInvestChart] = useCharts()

  useEffect(() => {
    renderRDInvestChart()
  }, [rdInvestRef, rdInvestChart])

  // 柱折图数据
  const renderRDInvestChart = async () => {
    if (!rdInvestChart) return
    rdInvestChart?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: { data: [yname1, yname2] },
      xAxis: [
        {
          data: xdata
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: yAxisName1,
          position: 'left'
        },
        {
          type: 'value',
          name: yAxisName2,
          position: 'right',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: yname1,
          type: 'bar',
          yAxisIndex: 0,
          data: ydata1,
          label: {
            show: true
          }
        },
        {
          name: yname2,
          type: 'line',
          smooth: isSmooth,
          yAxisIndex: 1,
          data: ydata2,
          label: {
            show: true,
            formatter: '{c} %'
          }
        }
      ]
    })
  }

  return <div ref={rdInvestRef} className={styles.itemChart1}></div>
}
