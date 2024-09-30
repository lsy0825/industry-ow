import { useState } from 'react'
import { Col, Modal, Row } from 'antd'
import styles from './index.module.less'
import CommonDetail from './commonDetail'
import { useRequest } from 'ahooks'
import api from '@/api'
import { IsOpenProps } from '../type'

export default function IndustryFC() {
  const [isModalOpen, setIsModalOpen] = useState<IsOpenProps>({ type: false, record: {} })

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

  return (
    <div className={styles.industryStyle}>
      <Row gutter={[24, 24]}>
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
      </Row>
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
