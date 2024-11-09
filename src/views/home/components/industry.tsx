import { useState } from 'react'
import { Col, Modal, Row, Tabs } from 'antd'
import styles from './index.module.less'
import CommonDetail from './commonDetail'
import Normal1 from '@/assets/normal1.svg'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import api from '@/api'
import { IsOpenProps } from '../type'
import {
  AppstoreOutlined,
  ClusterOutlined,
  HighlightOutlined,
  RedoOutlined,
  SlidersOutlined,
  SoundOutlined
} from '@ant-design/icons'
import { useStore } from '@/store'

const tabsList = [
  { label: '产业链数据', key: '1' },
  { label: '企业互动数据', key: '2' },
  { label: '产品流通数据', key: '3' },
  { label: '政策数据', key: '4' },
  { label: '工具', key: '5' }
]

// const iconStyle: Record<string, string> = {
//   '1': 'tabIcon1',
//   '2': 'tabIcon2',
//   '3': 'tabIcon3',
//   '4': 'tabIcon4',
//   '5': 'tabIcon5'
// }

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
  '6': <AppstoreOutlined {...iconStyle} />
}

const iconCheckedStyle: Record<string, string> = {
  '1': 'checkedIcon1',
  '2': 'checkedIcon2',
  '3': 'checkedIcon3',
  '4': 'checkedIcon4',
  '5': 'checkedIcon5'
}

const contentData1 = [
  {
    title: '半导体',
    circle: '128',
    firm: '6445'
  },
  {
    title: '机器人',
    circle: '128',
    firm: '6445'
  },
  {
    title: '5G',
    circle: '128',
    firm: '6445'
  },
  {
    title: '大健康',
    circle: '128',
    firm: '6445'
  },
  {
    title: '临空经济',
    circle: '128',
    firm: '6445'
  },
  {
    title: '金融',
    circle: '128',
    firm: '6445'
  },
  {
    title: '新能源汽车',
    circle: '128',
    firm: '6445'
  },
  {
    title: '半导体',
    circle: '128',
    firm: '6445'
  }
]

export default function IndustryFC(props: any) {
  const { setCurrent } = props
  const [isModalOpen, setIsModalOpen] = useState<IsOpenProps>({ type: false, record: {} })
  const [checked, setChecked] = useState('1')
  const { getRowIndustry } = useStore()

  const { data } = useRequest(
    async () => {
      const resp: any[] = (await api.getByAreaCode()) as any[]
      return resp
    },
    {
      manual: false
    }
  )

  const style: React.CSSProperties = {
    padding: '8px 24px',
    height: 110,
    border: '1px solid #d7d7d7',
    borderRadius: 5,
    cursor: 'pointer'
  }

  const onChange = (key: string) => {
    setChecked(key)
  }

  const handleClick = (item: any) => {
    setCurrent('7')
    getRowIndustry(item)
  }

  const content1 = () => {
    return (
      <Row gutter={[24, 24]}>
        {contentData1?.map((item, index) => {
          return (
            <Col span={6} onClick={() => handleClick(item)} key={index}>
              <div className={styles.colStyle}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={styles.cardText} style={{ paddingBottom: 10 }}>
                  <span>环节</span>
                  <span>{`${item.circle}个`}</span>
                </div>
                <div className={styles.cardText}>
                  <span>企业</span>
                  <span>{`${item.firm}家`}</span>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }
  const content2 = () => (
    <Row gutter={[24, 24]}>
      <Col span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
  )

  const contentRender: any = {
    '1': content1(),
    '2': content2(),
    '3': 'checkedIcon3',
    '4': 'checkedIcon4',
    '5': 'checkedIcon5'
  }

  return (
    <div className={styles.industryStyle}>
      {/* <Row gutter={[24, 24]}>
        {data?.map((item: Record<string, any>, index: number) => {
          return (
            <Col span={6} onClick={() => setIsModalOpen({ type: true, record: item })} key={index}>
              <div style={style}>
                <div className={styles.cardTitle}>{item?.informationId}</div>
                <div className={styles.cardText} style={{ paddingBottom: 10 }}>
                  <span>环节</span>
                  <span>{`${item?.linkNumber}个`}</span>
                </div>
                <div className={styles.cardText}>
                  <span>企业</span>
                  <span>{`${item?.firmNumber}家`}</span>
                </div>
              </div>
            </Col>
          )
        })}
      </Row> */}
      <Tabs
        defaultActiveKey='1'
        tabPosition='left'
        onChange={onChange}
        items={tabsList?.map(item => {
          return {
            label: (
              <span className={styles.tabTitle}>
                {/* <div className={classNames([styles[iconStyle[item.key]],styles[iconCheckedStyle[checked]]])}/> */}
                <div style={{ marginBottom: 8 }}>{icon[item.key]}</div>
                {item.label}
              </span>
            ),
            key: item.key,
            children: contentRender[item.key]
          }
        })}
      />
      <Modal
        title={null}
        open={isModalOpen.type}
        footer={null}
        onCancel={() => setIsModalOpen({ type: false, record: {} })}
        width={1200}
        centered={true}
      >
        <CommonDetail />
      </Modal>
    </div>
  )
}
