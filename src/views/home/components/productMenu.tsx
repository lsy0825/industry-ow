import { useState } from 'react'
import { Button, Input } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import Toy from '@/assets/toyIndustry.png'
import BarChart from '../charts/barChart'
import PieChart from '../charts/pieChart'
import CommonPolicyList from './commonPolicyList'
import { useRequest } from 'ahooks'
import { RespProps } from '../type'
import api from '@/api'

const xdata = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
const ydata = [1900, 2500, 3200, 3500, 4000, 4200, 5000, 4800, 7000, 5200]

const pieData = [
  { value: 80, name: '2015' },
  { value: 95, name: '2016' },
  { value: 110, name: '2017' },
  { value: 150, name: '2018' },
  { value: 210, name: '2019' },
  { value: 300, name: '2020' },
  { value: 360, name: '2021' },
  { value: 480, name: '2022' },
  { value: 650, name: '2023' }
]

export default function ProductMenu() {
  const [searchValue, setSearchValue] = useState({ pageNo: 1, pageSize: 10 })

  // 查询数据
  const { data: policyData } = useRequest(
    async () => {
      const resp: RespProps = (await api.getPolicyData({ ...searchValue })) as RespProps
      return resp?.list
    },
    {
      manual: false,
      refreshDeps: [searchValue]
    }
  )

  return (
    <div className={styles.productMenu}>
      <div className={styles.top}>
        <span>产品或类型</span>
        <Input style={{ width: 400, margin: '0 24px' }} />
        <Button>搜索</Button>
      </div>
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>玩具产业 品牌分布</span>
      </div>
      <img src={Toy} />
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>玩具产业 企业数量趋势</span>
      </div>
      <BarChart xdata={xdata} ydata={ydata} yname='家' title='2015-2024年中国玩具生产企业新增注册数量（单位：家）' />
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>玩具产业 产业链结构分布</span>
      </div>
      <PieChart
        legend={pieData?.map(item => item.name)}
        pieData={pieData}
        title='2015-2023年中国潮流玩具行业市场规模（单位：亿元）'
      />
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>玩具产业 相关政策</span>
      </div>
      <CommonPolicyList
        dataList={policyData}
        title='policy'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  )
}
