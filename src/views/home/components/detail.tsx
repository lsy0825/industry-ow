import { useEffect, useState } from 'react'
import { Card, Descriptions, Table, Tag, Tabs, Button } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import { useRequest } from 'ahooks'
import api from '@/api'
import * as echarts from 'echarts'
import { useCharts } from '@/hook/useCharts'
import geoJson from '@/assets/geoJson.json'
import { DetailProps } from '../type'
import { getName } from '@/utils'
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
  // 政策的分页
  const [policyPage, setPolicyPage] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [patentTotal, setPatentTotal] = useState(0)
  // 产业链名称
  const [industrialName, setIndustrialName] = useState([])

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

  // 获取财务数据
  const { data: revenueData } = useRequest(
    async () => {
      const resp: any = await api.getFinancial({ firmId: record?.id })
      return resp
    },
    {
      manual: false
    }
  )

  // 获取相关政策数据
  const { data: policyData } = useRequest(
    async () => {
      const resp: any = await api.getPolicyInfo({
        firmId: record?.id,
        pageNo: policyPage.pageNo,
        pageSize: policyPage.pageSize
      })
      return resp
    },
    {
      manual: false
    }
  )

  // 获取省级企业数据
  const { data: provinceData } = useRequest(
    async () => {
      const resp: any = await api.getProvinceFirm({ firmId: record?.id })
      return resp
    },
    {
      manual: false
    }
  )

  useEffect(() => {
    echarts.registerMap('china', geoJson as any)
    renderRevenueChart()
    renderRDInvestChart()
    renderProductsChart()
  }, [revenueChart, rdInvestChart, productsChart, revenueData])

  // 营收--条形图数据
  const renderRevenueChart = async () => {
    if (!revenueChart) return
    if (revenueData?.length) {
      revenueChart?.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['营收', '非营收', '总收入']
        },
        xAxis: {
          data: revenueData?.map((item: any) => item.years)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '营收',
            type: 'bar',
            data: revenueData?.map((item: any) => Number(item.revenue.replace(/,/g, ''))),
            barGap: '20%',
            barCategoryGap: '20%'
          },
          {
            name: '非营收',
            type: 'bar',
            data: revenueData?.map((item: any) => Number(item.nonRevenue.replace(/,/g, ''))),
            barGap: '20%',
            barCategoryGap: '20%'
          },
          {
            name: '总收入',
            type: 'bar',
            data: revenueData?.map((item: any) => Number(item.grossIncome.replace(/,/g, ''))),
            barGap: '20%',
            barCategoryGap: '20%'
          }
        ]
      })
    }
  }
  //营收-表格
  const revenueColumns: any = [
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '年份',
      dataIndex: 'years'
    },
    {
      title: '营业总收入(万元)',
      dataIndex: 'grossIncome'
    },
    {
      title: '营业收入(万元)',
      dataIndex: 'revenue'
    },
    {
      title: '营业外收入(万元)',
      dataIndex: 'nonRevenue'
    }
  ]

  // 研发投入--条形图数据
  const renderRDInvestChart = async () => {
    if (!rdInvestChart) return
    if (revenueData?.length) {
      rdInvestChart?.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: { data: ['研发费用', '研发投入占比'] },
        xAxis: [
          {
            data: revenueData?.map((item: any) => item.years)
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '万元',
            position: 'left'
          },
          {
            type: 'value',
            name: '%',
            position: 'right'
          }
        ],
        series: [
          {
            name: '研发费用',
            type: 'bar',
            yAxisIndex: 0,
            data: revenueData?.map((item: any) => Number(item.researchAndDevelopmentExpense.replace(/,/g, '')))
          },
          {
            name: '研发投入占比',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: revenueData?.map((item: any) => item.researchAndDevelopmentScale)
          }
        ]
      })
    }
  }
  //研发投入-表格
  const rDInvestColumns: any = [
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '年份',
      dataIndex: 'years'
    },
    {
      title: '研发费用(万元)',
      dataIndex: 'researchAndDevelopmentExpense'
    },
    {
      title: '研发投入占比(%)',
      dataIndex: 'researchAndDevelopmentScale'
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
      dataIndex: 'id'
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
      defaultSortOrder: 'descend',
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
          <Descriptions.Item label='所在地'>{detailInfo?.registeredOffice}</Descriptions.Item>
          <Descriptions.Item label='所属行业' span={4}>
            <Tag color='#2db7f5'>{detailInfo?.industry}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='公司资质' span={4}>
            {detailInfo?.qualificationsList?.map((tag: any) => (
              <Tag color='#fcb138' key={tag?.id}>
                {tag?.qualificationName}
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
            dataSource={revenueData}
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
            dataSource={revenueData}
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
        <MapChart dataList={provinceData} type='firm' />
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
        <div className={styles.titleColor}>
          <img src={Icon} style={{ paddingTop: 8 }} />
          <span className={styles.text}>产业相关政策信息</span>
        </div>
        <CommonPolicyList
          dataList={policyData?.list}
          title='policy'
          searchValue={policyPage}
          setSearchValue={setPolicyPage}
        />
      </div>
    </div>
  )
}
