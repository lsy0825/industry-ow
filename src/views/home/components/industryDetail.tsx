import { useEffect } from 'react'
import { Table, Button, Descriptions } from 'antd'
import Icon from '@/assets/detailIcon.svg'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'
import { DetailProps } from '../type'
import MapChart from '../charts/mapChart'
import { useRequest } from 'ahooks'
import api from '@/api'

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

const items = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database'
  },
  {
    key: '2',
    label: 'Billing',
    children: 'Prepaid'
  },
  {
    key: '3',
    label: 'Time',
    children: '18:00:00'
  },
  {
    key: '4',
    label: 'Amount',
    children: '$80.00'
  },
  {
    key: '5',
    label: 'Discount',
    children: '$20.00'
  },
  {
    key: '6',
    label: 'Official',
    children: '$60.00'
  },
  {
    key: '7',
    label: 'UserName',
    children: 'Zhou Maomao'
  },
  {
    key: '8',
    label: 'Telephone',
    children: '1810000000'
  },
  {
    key: '9',
    label: 'Live',
    children: 'Hangzhou, Zhejiang'
  },
  {
    key: '10',
    label: 'Remark',
    children: 'empty'
  },
  {
    key: '11',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
  }
]

const news = [
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊附加费用价格反弹就会发光的肺结核v与解封',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  },
  {
    text: '发哈客户发德哈卡哈尔发的富士康国际氨基酸佛爱回复啊',
    time: '2002'
  }
]

export default function DetailFC(props: DetailProps) {
  const { record, setCurrent } = props
  const Wwidth = document.body.clientWidth
  console.log(record, 'record', Wwidth)
  // 初始化条形图
  const [lineRef, lineChart] = useCharts()
  // 初始化金字塔图
  const [pyramidRef, pyramidChart] = useCharts()
  // 初始空心饼图
  const [pieRef1, pieChart1] = useCharts()
  // 初始实心饼图
  const [pieRef2, pieChart2] = useCharts()

  // 获取业资质数据
  const { data: qualifyData } = useRequest(
    async () => {
      const resp: any = await api.getFirmQualification()
      return resp
    },
    {
      manual: false
    }
  )

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderLineChart()
    renderPyramidChart()
    renderPieChart()
    renderSolidPieChart()
  }, [lineRef, lineChart, pyramidRef, pieRef1, pieRef2])

  // 金字塔图
  const renderPyramidChart = async () => {
    if (!pyramidChart) return
    // const data = await api.getLineData()
    pyramidChart?.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          width: '50%',
          height: '80%',
          left: '10%',
          top: '10%',
          sort: 'ascending',
          gap: 2,
          label: {
            show: true,
            formatter: '{b}Expected'
            // position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 16
            }
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' }
          ]
        }
      ]
    })
  }

  // 加载条形图数据
  const renderLineChart = async () => {
    if (!lineChart) return
    // const data = await api.getLineData()
    lineChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['订单']
      // },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] //data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25], //data.order
          barWidth: '30%'
        }
      ]
    })
  }

  // 加载空心饼图
  const renderPieChart = async () => {
    if (!pieChart1) return
    // const data = await api.getPieCityData()
    pieChart1?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '5%',
        left: 'center',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      series: [
        {
          // name: '城市分布',
          type: 'pie',
          radius: ['40%', '50%'],
          avoidLabelOverlap: false,
          center: ['50%', '40%'],
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
          data: [
            { value: 335, name: 'A' },
            { value: 310, name: 'B' },
            { value: 234, name: 'C' },
            { value: 135, name: 'D' },
            { value: 1548, name: 'E' },
            { value: 23, name: 'F' },
            { value: 45, name: 'G' }
          ]
        }
      ]
    })
  }

  // 加载实心饼图
  const renderSolidPieChart = async () => {
    if (!pieChart2) return
    // const data = await api.getPieCityData()
    pieChart2?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '5%',
        left: 'center',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      series: [
        {
          // name: '城市分布',
          type: 'pie',
          radius: '50%',
          center: ['50%', '40%'],
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
          data: [
            { value: 335, name: 'A' },
            { value: 310, name: 'B' },
            { value: 234, name: 'C' },
            { value: 135, name: 'D' },
            { value: 1548, name: 'E' },
            { value: 23, name: 'F' },
            { value: 45, name: 'G' }
          ]
        }
      ]
    })
  }

  const commonColumn = [
    {
      title: '排行',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1 //+(searchValue.page-1)*searchValue.pageSize
    },
    {
      title: '企业名称',
      dataIndex: 'year'
    }
  ]

  //专利量-表格
  const patentColumns: any = [
    ...commonColumn,
    {
      title: '专利数量',
      dataIndex: 'investedNum'
    }
  ]

  //企业潜力-表格
  const latentColumns: any = [
    ...commonColumn,
    {
      title: '可达级别',
      dataIndex: 'investedNum'
    }
  ]

  //上奇评价-表格
  const evaColumns: any = [
    ...commonColumn,
    {
      title: '上奇评分',
      dataIndex: 'investedNum'
    }
  ]

  return (
    <div className={styles.detail}>
      <div className={styles.topBtn}>
        <div className={styles.detailText}>{record?.chainName}</div>
        <Button onClick={() => setCurrent('3')}>返回</Button>
      </div>
      <div className={styles.detailStyle}>
        <MapChart dataList={dataList} />
        <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>全国专精特新企业区域分布</div>
            <div ref={lineRef} className={styles.gridCharts}></div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>全国专精特新企业产业分布</div>
            <div className={styles.textArea}>
              <Descriptions column={1} size='small' bordered>
                {qualifyData?.resultList?.map((item: any) => (
                  <Descriptions.Item label={item.qualificationName} key={item.qualificationName}>
                    {item.firmCount}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>全国专精特新企业金字塔</div>
            <div ref={pyramidRef} className={styles.gridCharts}></div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>全国专精特新企业成立年限</div>
            <div ref={pieRef1} className={styles.gridCharts}></div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>全国专精特新企业注册资本</div>
            <div ref={pieRef2} className={styles.gridCharts}></div>
          </div>
        </div>
        {/* 榜单 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>榜单</span>
        </div>
        <div className={styles.tableArea}>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>授权发明专利量TOP100</div>
            <Table columns={patentColumns} dataSource={[]} bordered={false} rowKey='id' pagination={false} />
          </div>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>企业潜力TOP100</div>
            <Table columns={latentColumns} dataSource={[]} bordered={false} rowKey='id' pagination={false} />
          </div>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>上奇评价</div>
            <Table columns={evaColumns} dataSource={[]} bordered={false} rowKey='id' pagination={false} />
          </div>
        </div>
        <div className={styles.tableArea}>
          <div className={styles.tableItem}>
            <div className={styles.footerItem}>
              <span className={styles.footerTitle}>最新动态</span>
              <span className={styles.moreText} onClick={() => setCurrent('info')}>
                更多
              </span>
            </div>
            <div className={styles.newsArea}>
              {news?.map((item, index) => (
                <div key={index}>
                  <div className={styles.textStyle} style={{ width: `${(Wwidth - 278) / 3}px` }} title={item.text}>
                    {item.text}
                  </div>
                  <div className={styles.timeStyle}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.tableItem}>
            <div className={styles.footerItem}>
              <span className={styles.footerTitle}>相关政策</span>
              <span className={styles.moreText} onClick={() => setCurrent('6')}>
                更多
              </span>
            </div>
            <div className={styles.newsArea}>
              {news?.map((item, index) => (
                <div key={index}>
                  <div className={styles.textStyle} style={{ width: `${(Wwidth - 278) / 3}px` }} title={item.text}>
                    {item.text}
                  </div>
                  <div className={styles.timeStyle}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.tableItem}>
            <div className={styles.footerItem}>
              <span className={styles.footerTitle}>报告推荐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
