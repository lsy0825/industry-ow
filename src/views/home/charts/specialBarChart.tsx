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
        text: '印度 2021 年关税政策对博世产品影响',
        subtext: '来源：产业链供应链数据平台'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['政策前', '政策后'],
        top: '5%'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['电动公交车和电动卡车', '公共汽车、卡车和两轮车的半成品', '乘用车和三轮车']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '政策前',
          type: 'bar',
          data: [25, 15, 15, 10],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }]
          },
          itemStyle: {
            color: '#f83a93'
          }
        },
        {
          name: '政策后',
          type: 'bar',
          data: [40, 25, 30, 15],
          markPoint: {
            data: [
              { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18 },
              { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }]
          },
          itemStyle: {
            color: '#eba3a7'
          }
        }
      ]
    })
  }

  return <div ref={barRef} className={styles.itemChart1}></div>
}
