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
    text: '30余家投资机构齐聚调研 隆平高科技举行专精特新种业板块专题交...',
    time: '2024-11-02'
  },
  {
    text: '北京市专精特新小巨人企业三元基因大涨超25%：聚焦生物医药',
    time: '2024-10-31'
  },
  {
    text: '“湖北专精特新企业上云”专项计划启动 助力企业数字化转型',
    time: '2024-10-30'
  }
]

export default function DetailFC(props: DetailProps) {
  const { record, setCurrent } = props
  const Wwidth = document.body.clientWidth
  // 初始化条形图
  const [lineRef, lineChart] = useCharts()
  // 初始化金字塔图
  const [pyramidRef, pyramidChart] = useCharts()
  // 初始空心饼图
  const [pieRef1, pieChart1] = useCharts()
  // 初始实心饼图
  const [pieRef2, pieChart2] = useCharts()

  // 获取企业资质数据
  const { data: qualifyData } = useRequest(
    async () => {
      const resp: any = await api.getFirmQualification()
      return resp
    },
    {
      manual: false
    }
  )

  // 获取产业链企业数据
  const { data: provinceChainData } = useRequest(
    async () => {
      const resp: any = await api.getIndustrialArea({ industrialChain: record?.chainName })
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
  }, [lineRef, lineChart, pyramidChart, pieRef1, pieRef2])

  // 金字塔图
  const renderPyramidChart = async () => {
    if (!pyramidChart) return
    const resp: any = await api.getFirmLevel()
    const data = resp?.resultList?.map((item: any) => ({ name: item.level, value: item.firmCount }))
    pyramidChart?.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
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
            formatter: '{b} {c}家'
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
          data: data
        }
      ]
    })
  }

  // 加载条形图数据
  const renderLineChart = async () => {
    if (!lineChart) return
    const data: any = await api.getProvinceData()
    lineChart?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: data?.resultList?.map((item: any) => item.province)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '省级',
          type: 'bar',
          data: data?.resultList?.map((item: any) => item.firmCount),
          barWidth: '30%'
        }
      ]
    })
  }

  // 加载空心饼图
  const renderPieChart = async () => {
    if (!pieChart1) return
    const resp: any = await api.getYearsData()
    const data = resp?.resultList?.map((item: any) => ({ name: item.year, value: item.firmCount }))
    pieChart1?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '2%',
        // left: 'center',
        data: resp?.resultList?.map((item: any) => item.year)
      },
      series: [
        {
          // name: '城市分布',
          type: 'pie',
          radius: ['40%', '50%'],
          avoidLabelOverlap: false,
          center: ['55%', '35%'],
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          label: {
            formatter: '{b}\n{d}%'
          },
          data: data
        }
      ]
    })
  }

  // 加载实心饼图
  const renderSolidPieChart = async () => {
    if (!pieChart2) return
    const resp: any = await api.getRegisterData()
    const data = resp?.resultList?.map((item: any) => ({ name: item.moneyGroup, value: item.firmCount }))
    pieChart2?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '5%',
        left: 'center',
        data: resp?.resultList?.map((item: any) => item.moneyGroup)
      },
      series: [
        {
          // name: '城市分布',
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
          data: data
        }
      ]
    })
  }

  // 获取专利量数据
  const { data: patentSort } = useRequest(
    async () => {
      const resp: any = await api.getPatentSort()
      return resp
    },
    {
      manual: false
    }
  )

  // 获取企业潜力数据
  const { data: potentialSort } = useRequest(
    async () => {
      const resp: any = await api.getPotentialSort()
      return resp
    },
    {
      manual: false
    }
  )

  // 获取专利评分数据
  const { data: rateSort } = useRequest(
    async () => {
      const resp: any = await api.getRateSort()
      return resp
    },
    {
      manual: false
    }
  )

  // 获取产业链相关政策
  const { data: industrialPolicy } = useRequest(
    async () => {
      const resp: any = await api.getIndustrialPolicy({ industrialChain: record.chainName })
      return resp
    },
    {
      manual: false
    }
  )

  const commonColumn = [
    {
      title: '排行',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1, //+(searchValue.page-1)*searchValue.pageSize
      width: '20%'
    },
    {
      title: '企业名称',
      dataIndex: 'firmName',
      width: '50%'
    }
  ]

  //专利量-表格
  const patentColumns: any = [
    ...commonColumn,
    {
      title: '专利数量',
      dataIndex: 'patentCount',
      width: '30%'
    }
  ]

  //企业潜力-表格
  const latentColumns: any = [
    ...commonColumn,
    {
      title: '可达级别',
      dataIndex: 'highestLevel',
      width: '30%'
    }
  ]

  //上奇评价-表格
  const evaColumns: any = [
    ...commonColumn,
    {
      title: '上奇评分',
      dataIndex: 'patentRateSum',
      width: '30%'
    }
  ]

  return (
    <div className={styles.detail}>
      <div className={styles.topBtn}>
        <div className={styles.detailText}>{record?.chainName}</div>
        <Button onClick={() => setCurrent('3')}>返回</Button>
      </div>
      <div className={styles.detailStyle}>
        <MapChart dataList={provinceChainData?.resultList} type='chain' />
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
          {/* <img src={Icon} style={{ paddingTop: 8 }} /> */}
          <div className={styles.colorBar}></div>
          <span className={styles.text}>榜单</span>
        </div>
        <div className={styles.tableArea}>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>授权发明专利量TOP100</div>
            <Table
              columns={patentColumns}
              dataSource={patentSort?.resultList}
              bordered={false}
              rowKey='firmName'
              pagination={false}
            />
          </div>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>企业潜力TOP100</div>
            <Table
              columns={latentColumns}
              dataSource={potentialSort?.resultList}
              bordered={false}
              rowKey='firmName'
              pagination={false}
            />
          </div>
          <div className={styles.tableItem}>
            <div className={styles.itemTitle}>上奇评价</div>
            <Table
              columns={evaColumns}
              dataSource={rateSort?.resultList}
              bordered={false}
              rowKey='firmName'
              pagination={false}
            />
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
              {industrialPolicy?.list?.map((item: any) => (
                <div key={item.id}>
                  <div className={styles.textStyle} style={{ width: `${(Wwidth - 278) / 3}px` }} title={item.text}>
                    {item.policyContentSummary}
                  </div>
                  <div className={styles.rightText}>
                    <span className={styles.timeStyle} style={{ paddingRight: 10 }}>
                      发布单位：{item.issuingAuthority}
                    </span>
                    <span className={styles.timeStyle}>{item.releaseDate}</span>
                  </div>
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
