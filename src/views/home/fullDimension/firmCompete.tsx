import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import FirmMap from '@/assets/firmMap.png'
import TipMapChart from '../charts/tipMapChart'

export default function FirmCompete() {
  const [form] = Form.useForm()
  const [isShow, setIsShow] = useState(false)

  const handleClick = (fieldsValue: any) => {
    setIsShow(true)
  }
  return (
    <div className={styles.industryAnalyse}>
      <Form
        layout='inline'
        form={form}
        initialValues={{ industry: '电影产业', area: '全国' }}
        onFinish={handleClick}
        style={{ marginBottom: 24 }}
      >
        <Form.Item label='产业' name='industry'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='区域' name='area'>
          <Input disabled />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
      {isShow && <TipMapChart />}
    </div>
  )
}
