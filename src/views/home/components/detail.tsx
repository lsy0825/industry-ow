import { useEffect, useState } from 'react'
import { Card, Col, Descriptions, Row, Table, Tag, Tabs, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import { useRequest } from 'ahooks'
import api from '@/api'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'
import { DetailProps } from '../type'
import { flattenTree, getName, mergeIdList } from '@/utils'
import moment from 'moment'
import { useStore } from '@/store'
import CommonPolicyList from './commonPolicyList'
import ChainChart from '../charts/chainChart'
import MapChart from '../charts/mapChart'

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

// const items: DescriptionsProps['items'] = [
//   {
//     key: '1',
//     label: '经营能力',
//     children: '经营能力优异。'
//   },
//   {
//     key: '2',
//     label: '创新能力',
//     children: '创新能力优异。建立1个创新平台。'
//   },
//   {
//     key: '3',
//     label: '融资能力',
//     children: '融资能力优异。'
//   },
//   {
//     key: '4',
//     label: '成长能力',
//     children: '成长能力优异。技术增长速度较快。'
//   },
//   {
//     key: '5',
//     label: '社会贡献',
//     children: '社会贡献优异。在解决就业表现突出。'
//   }
// ]

export default function DetailFC(props: DetailProps) {
  const { record, setCurrent } = props
  const { areaNames } = useStore()
  // 财务数据-营收-条形图
  const [revenueRef, revenueChart] = useCharts()
  // 财务数据-研发投入-条形图
  const [rdInvestRef, rdInvestChart] = useCharts()
  // 产品流通-折线图
  const [productsRef, productsChart] = useCharts()
  // 专利信息的分页
  const [patentPage, setPatentPage] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [patentTotal, setPatentTotal] = useState(0)
  // 产业链名称
  const [industrialName, setIndustrialName] = useState([])
  // 初始化地图
  // const [mapRef, mapChart] = useCharts()
  // 初始化链状图
  // const [chainRef, chainChart] = useCharts()
  // 初始化条形图
  // const [lineRef, lineChart] = useCharts()
  // 初始饼图
  // const [pieRef1, pieChart1] = useCharts()
  // 初始化雷达图
  // const [radarRef, radarChart] = useCharts()

  // 获取关联产业链数据
  const { data: allIndustrialChain } = useRequest(
    async () => {
      const resp: any = await api.getAllIndustrialChain()
      const names = resp?.children?.map((item: any) => item.name)
      setIndustrialName(names)
      return resp
    },
    {
      manual: false
    }
  )

  // 获取产品流通信息
  // const { data: productionData } = useRequest(
  //   async () => {
  //     const resp: any = await api.getProductionData({ firmId: record?.id })
  //     return resp
  //   },
  //   {
  //     manual: false
  //   }
  // )

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderRevenueChart()
    renderRDInvestChart()
    renderProductsChart()
    // renderChainChart()
    // renderLineChart()
    // renderPieChart()
    // renderRadarChart()
    // renderMapChart()
  }, [revenueChart, rdInvestChart, productsChart])

  // 营收--条形图数据
  const renderRevenueChart = async () => {
    if (!revenueChart) return
    // const data = await api.getLineData()
    revenueChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['营收', '非营收', '总收入']
      },
      xAxis: {
        data: ['2022Q1', '2022Q2', '2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3'] //data.label
      },
      yAxis: {
        // name: '企业数量（家）',
        type: 'value'
      },
      series: [
        {
          name: '营收',
          type: 'bar',
          data: [3852, 1767, 45244, 1254, 4578, 2354, 7854], //data.order
          // barWidth: '30%',
          barGap: '20%',
          barCategoryGap: '20%'
        },
        {
          name: '非营收',
          type: 'bar',
          data: [4111, 4222, 10000, 5000, 5132, 3211, 2312], //data.order
          // barWidth: '30%'
          barGap: '20%',
          barCategoryGap: '20%'
        },
        {
          name: '总收入',
          type: 'bar',
          data: [200000, 245555, 34555, 748586, 234563, 46877, 43455], //data.order
          // barWidth: '30%'
          barGap: '20%',
          barCategoryGap: '20%'
        }
      ]
    })
  }
  //营收-表格
  const revenueColumns: any = [
    {
      title: '序号',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1 //+(searchValue.page-1)*searchValue.pageSize
    },
    {
      title: '年份',
      dataIndex: 'year'
    },
    {
      title: '营业总收入(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '营业收入(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '营业外收入(万元)',
      dataIndex: 'investedNum'
    }
  ]

  // 研发投入--条形图数据
  const renderRDInvestChart = async () => {
    if (!rdInvestChart) return
    // const data = await api.getLineData()
    rdInvestChart?.setOption({
      tooltip: {
        trigger: 'axis'
        // axisPointer: { type: 'cross' }
      },
      legend: { data: ['研发费用', '研发投入占比'] },
      xAxis: [
        {
          // type: 'category',
          // axisTick: {
          // 	alignWithLabel: true
          // },
          data: ['2022Q1', '2022Q2', '2022Q3', '2022Q4', '2023Q1', '2023Q2', '2023Q3']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '万元',
          // min: 0,
          // max: 25,
          position: 'left'
          // axisLabel: {
          // 	formatter: '{value}'
          // }
        },
        {
          type: 'value',
          name: '%',
          // min: 0,
          // max: 5,
          position: 'right'
          // axisLabel: {
          // 	formatter: '{value}'
          // }
        }
      ],
      series: [
        {
          name: '研发费用',
          type: 'bar',
          yAxisIndex: 0,
          data: [8887.0, 5466.2, 2457.3, 13100.5, 45677.3, 21344.2, 123474.3, 2456.4, 12347.0, 3577.5, 4567.0, 8984.2]
        },
        {
          name: '研发投入占比',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [1.2, 3.2, 1.7, 1.8, 1.7, 4.7, 3.6, 4.2, 1.7, 2.8, 3.0, 1.3]
        }
      ]
    })
  }
  //研发投入-表格
  const rDInvestColumns: any = [
    {
      title: '序号',
      dataIndex: 'No',
      render: (text: unknown, row: unknown, index: number) => index + 1 //+(searchValue.page-1)*searchValue.pageSize
    },
    {
      title: '年份',
      dataIndex: 'year'
    },
    {
      title: '研发费用(万元)',
      dataIndex: 'investedNum'
    },
    {
      title: '研发投入占比(%)',
      dataIndex: 'investedNum'
    }
  ]

  //企业交易数据-表格
  const corDealColumns: any = [
    {
      title: '排行',
      dataIndex: 'rank'
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
    }
  ]

  // 产品流通--折线图数据
  const renderProductsChart = async () => {
    if (!productsChart) return
    const productionData: any = await api.getProductionData({ firmId: record?.id })
    productsChart?.setOption({
      tooltip: { trigger: 'axis' },
      // legend: {data: ['研发费用','研发投入占比']},
      xAxis: [
        {
          name: '年份',
          axisTick: {
            alignWithLabel: true
          },
          data: productionData?.map((item: any) => item.years)
        }
      ],
      yAxis: { type: 'value' },
      series: [
        {
          name: '产品流通信息',
          type: 'line',
          smooth: true,
          data: productionData?.map((item: any) => item.revenue)
        }
      ]
    })
  }

  const mytextStyle = {
    color: '#333', //文字颜色
    fontStyle: 'normal', //italic斜体  oblique倾斜
    fontWeight: 'normal', //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
    // fontFamily:"sans-serif",   //字体系列
    fontSize: 12 //字体大小
  }

  const { data: detailInfo } = useRequest(
    async () => {
      const resp: Record<string, any> = (await api.getEnterpriseDetail({ id: record?.id })) as Record<string, any>
      return resp
    },
    {
      manual: false
    }
  )

  // 获取专利信息数据
  const { data: patentList } = useRequest(
    async () => {
      const resp: any = await api.getPatentList({
        firmId: record?.id,
        pageNo: patentPage.pageNo,
        pageSize: patentPage.pageSize
      })
      setPatentTotal(resp?.total)
      return resp
    },
    {
      manual: false
    }
  )

  const columnsPatent: any = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text: unknown, row: unknown, index: number) => index + 1 + (patentPage.pageNo - 1) * patentPage.pageSize
    },
    {
      title: '专利名称',
      dataIndex: 'patentName'
    },
    {
      title: '专利类型',
      dataIndex: 'patentType'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '公告号',
      dataIndex: 'announcementNumber'
    },
    {
      title: '申请日',
      dataIndex: 'applyDate'
    },
    {
      title: '公告日',
      dataIndex: 'announcementDate'
    },
    {
      title: '申请（专利权）人',
      dataIndex: 'applicant'
    },
    {
      title: '价值评分',
      dataIndex: 'valueScoring',
      // defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.valueScoring - b.valueScoring
    }
  ]

  const showTotal = (total: number) => `总共 ${total} 条数据`

  return (
    <div className={styles.detail}>
      <div className={styles.topBtn}>
        <div className={styles.detailText}>{record?.name}</div>
        <Button onClick={() => setCurrent('2')}>返回</Button>
      </div>
      <div className={styles.detailStyle}>
        {/* 基本信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>基本信息</span>
        </div>
        <Descriptions title={null} column={4} style={{ marginBottom: 16 }}>
          <Descriptions.Item label='成立日'>
            {moment(detailInfo?.dateEstablishment).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label='注册额'>{`${detailInfo?.annualIncome}万元`}</Descriptions.Item>
          <Descriptions.Item label='员工数'>{detailInfo?.numberEmployees}</Descriptions.Item>
          <Descriptions.Item label='所在地'>{getName(areaNames, detailInfo?.registeredOfficeId)}</Descriptions.Item>
          <Descriptions.Item label='所属行业' span={4}>
            {detailInfo?.industryclassList?.map((tag: string) => (
              <Tag color='#2db7f5' key={tag}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label='公司资质' span={4}>
            {detailInfo?.qualificationsList?.map((tag: string) => (
              <Tag color='#fcb138' key={tag}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
        {/* 财务数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>财务数据</span>
        </div>
        <div className={styles.chart}>
          <Card style={{ width: 700, height: 400 }}>
            <div ref={revenueRef} className={styles.itemChart}></div>
          </Card>
          <Table
            columns={revenueColumns}
            dataSource={[]}
            bordered
            rowKey='id'
            pagination={false}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </div>
        <div className={styles.rdText}>研发投入</div>
        <div className={styles.chart}>
          <Card style={{ width: 700, height: 400 }}>
            <div ref={rdInvestRef} className={styles.itemChart}></div>
          </Card>
          <Table
            columns={rDInvestColumns}
            dataSource={[]}
            bordered
            rowKey='id'
            pagination={false}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </div>
        {/* 企业交易数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>企业交易数据</span>
        </div>
        <MapChart dataList={dataList} />
        {/* <div className={styles.chart}>
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
      </div> */}
        {/* 产品流通信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>产品流通信息</span>
        </div>
        <Card style={{ marginBottom: 16 }}>
          <div ref={productsRef} className={styles.itemChart}></div>
        </Card>
        {/* 企业专利信息 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>企业专利信息</span>
        </div>
        <Table
          columns={columnsPatent}
          dataSource={patentList?.list}
          bordered
          rowKey='id'
          pagination={{
            current: patentPage.pageNo,
            pageSize: patentPage.pageSize,
            total: patentTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal,
            onChange: (pageNo: number, pageSize: number) => {
              setPatentPage({
                ...patentPage,
                pageNo,
                pageSize
              })
            }
          }}
          style={{ width: '100%', marginBottom: 16 }}
        />
        {/* 关联产业链数据 */}
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>关联产业链数据</span>
        </div>
        <Tabs
          type='card'
          style={{ height: 600 }}
          items={industrialName?.map((name: string) => {
            const chainData = allIndustrialChain?.children?.filter((item: any) => item.name === name)[0]
            return {
              label: name,
              key: name,
              children: <ChainChart data={chainData} />
            }
          })}
        />
        {/* <Card>
				<div ref={chainRef} className={styles.itemChart1}></div>
			</Card> */}
        {/* 雷达图 */}
        {/* <div className={styles.chart}>
        <Card>
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
        <Descriptions column={1} style={{ width: '100%', marginLeft: 24 }} bordered items={items} />
      </div> */}
        {/* 条形图和饼图 */}
        {/* <div className={styles.chart}>
        <Card style={{ width: 600, height: 400 }}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
        <Card style={{ width: 600, height: 400 }}>
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
          </div>
        </Card>
      </div> */}

        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>产业相关政策信息</span>
        </div>
        <CommonPolicyList
          dataList={[]}
          title='policy'
          // searchValue={searchValue}
          // setSearchValue={setSearchValue}
        />
        {/* <Row gutter={10}>
        <Col span={8}>
          <div className={styles.infoTitle}>上游：核心设备及零部件</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              核心零部件
            </span>
            <span className={styles.leftSubTitle}>软件应用开发</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoTitle}>中游：机器人制造</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              服务机器人
            </span>
            <span className={styles.leftSubTitle}>工业机器人</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>col-8</Col>
      </Row> */}
      </div>
    </div>
  )
}
