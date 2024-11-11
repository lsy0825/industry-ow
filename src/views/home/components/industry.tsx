import { useCallback, useEffect, useState } from 'react'
import { Col, Modal, Row, Tabs } from 'antd'
import styles from './index.module.less'
import CommonDetail from './commonDetail'
import { useRequest } from 'ahooks'
import api from '@/api'
import { IsOpenProps } from '../type'
import {
  AlertOutlined,
  AppstoreOutlined,
  BranchesOutlined,
  ClusterOutlined,
  HighlightOutlined,
  RedoOutlined,
  SlidersOutlined,
  SoundOutlined
} from '@ant-design/icons'
import { useStore } from '@/store'

const iconStyle = {
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined,
  rev: undefined,
  style: { fontSize: 24 }
}

const icon: any = {
  '1': <ClusterOutlined {...iconStyle} />,
  '2': <SoundOutlined {...iconStyle} />,
  '3': <SlidersOutlined {...iconStyle} />,
  '4': <HighlightOutlined {...iconStyle} />,
  '5': <RedoOutlined {...iconStyle} />,
  '6': <AlertOutlined {...iconStyle} />,
  '7': <BranchesOutlined {...iconStyle} />,
  '8': <AppstoreOutlined {...iconStyle} />
}

export default function IndustryFC(props: any) {
  const { setCurrent } = props
  const { getRowIndustry } = useStore()

  // 获取左侧产业链导航数据
  const { data: navData } = useRequest(
    async () => {
      const resp: string[] = (await api.getChainNav()) as string[]
      return resp
    },
    {
      manual: false
    }
  )

  // 获取右侧产业链内容
  const { data: infoData, run: getInfo } = useRequest(
    async chainNav => {
      const resp = await api.getChainInfo({ chainNav })
      return resp
    },
    {
      manual: true
    }
  )

  useEffect(() => {
    navData?.length && getInfo(navData?.[0])
  }, [navData])

  const onChange = (key: string) => {
    getInfo(key)
  }

  const handleClick = (item: any) => {
    setCurrent('7')
    getRowIndustry(item)
  }

  const rightContent = useCallback((data: any[]) => {
    return (
      <Row gutter={[24, 24]}>
        {data?.map((item, index) => {
          return (
            <Col span={6} onClick={() => handleClick(item)} key={index}>
              <div className={styles.colStyle}>
                <div className={styles.cardTitle}>{item.chainName}</div>
                <div className={styles.cardText} style={{ paddingBottom: 10 }}>
                  <span>环节</span>
                  <span>{`${item.linkNum} 个`}</span>
                </div>
                <div className={styles.cardText}>
                  <span>企业</span>
                  <span>{`${item.firmNum} 家`}</span>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }, [])

  return (
    <div className={styles.industryStyle}>
      <Tabs
        tabPosition='left'
        onChange={onChange}
        items={navData?.map((item: string, index: number) => {
          return {
            label: (
              <span className={styles.tabTitle}>
                <div style={{ marginBottom: 8 }}>{icon[index + 1]}</div>
                {item}
              </span>
            ),
            key: item,
            children: rightContent(infoData as any[])
          }
        })}
      />
    </div>
  )
}
