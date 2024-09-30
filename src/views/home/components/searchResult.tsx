import { useMemo, useState } from 'react'
import styles from './index.module.less'
import { Tabs } from 'antd'
import FirmIcon from '@/assets/firmIcon.svg'
import PolicyIcon from '@/assets/policyIcon.svg'
import CommonFirmList from './commonFirmList'
import EnterpriseFC from './enterprise'
import IndustryFC from './industry'
import PolicyFC from './policy'
import { useStore } from '@/store'
import { useRequest } from 'ahooks'
import api from '@/api'
import CommonPolicyList from './commonPolicyList'
import { SearchResultProps } from '../type'

const tabsList = [
  { label: '全部', key: '1' },
  { label: '企业', key: '2' },
  { label: '产业链', key: '3' },
  { label: '企业互动数据', key: '4' },
  { label: '产品流通数据', key: '5' },
  { label: '政策数据', key: '6' }
]

export default function SearchResultFC() {
  const [checked, setChecked] = useState('1')
  const { enterValue } = useStore()

  // 搜索结果
  const { data: resultData } = useRequest(
    async () => {
      const resp: SearchResultProps = (await api.getSearchResult({ keywords: enterValue })) as SearchResultProps
      return resp
    },
    {
      manual: false,
      refreshDeps: [enterValue]
    }
  )

  const onChange = (key: string) => {
    setChecked(key)
  }

  const content1 = useMemo(() => {
    return (
      <div>
        <div className={styles.titleColor}>
          <img src={FirmIcon} style={{ paddingTop: 4 }} width='30px' height='30px' />
          <span className={styles.text}>企业</span>
        </div>
        <CommonFirmList dataList={resultData?.informationRespOpenVOList} title='result' />

        <div className={styles.titleColor}>
          <img src={PolicyIcon} style={{ paddingTop: 6 }} width='30px' height='30px' />
          <span className={styles.text}>政策</span>
        </div>
        <CommonPolicyList dataList={resultData?.policyDataRespVOList} title='result' />
      </div>
    )
  }, [resultData])

  const content2 = useMemo(() => {
    return (
      <div>
        <div className={styles.titleColor}>
          <img src={FirmIcon} style={{ paddingTop: 4 }} width='30px' height='30px' />
          <span className={styles.text}>企业</span>
        </div>
        <EnterpriseFC />
      </div>
    )
  }, [])

  const content3 = useMemo(() => {
    return (
      <div>
        <div className={styles.titleColor}>
          <img src={FirmIcon} style={{ paddingTop: 4 }} width='30px' height='30px' />
          <span className={styles.text}>产业链</span>
        </div>
        <IndustryFC />
      </div>
    )
  }, [])

  const content6 = useMemo(() => {
    return (
      <div>
        <div className={styles.titleColor}>
          <img src={FirmIcon} style={{ paddingTop: 4 }} width='30px' height='30px' />
          <span className={styles.text}>政策数据</span>
        </div>
        <PolicyFC />
      </div>
    )
  }, [])

  const contentRender: Record<string, any> = {
    '1': content1,
    '2': content2,
    '3': content3,
    '4': 'checkedIcon4',
    '5': 'checkedIcon5',
    '6': content6
  }

  return (
    <div className={styles.searchResult}>
      <Tabs
        defaultActiveKey='1'
        tabPosition='left'
        onChange={onChange}
        items={tabsList?.map(item => {
          return {
            label: <span className={styles.tabTitle}>{item.label}</span>,
            key: item.key,
            children: contentRender[item.key]
          }
        })}
      />
    </div>
  )
}
