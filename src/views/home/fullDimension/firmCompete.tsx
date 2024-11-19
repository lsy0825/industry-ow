import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import LineAndBar from '../charts/lineAndBar'

const xdata = ['2017', '2018', '2019', '2020', '2021E', '2022E', '2023E', '2024E', '2025E']
const ydata1 = [17, 24, 34, 42, 51, 68, 94, 120, 150]
const ydata2 = [67, 60, 42, 24, 26, 28, 38, 28, 25]

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
        initialValues={{ upstream: '三元锂电池', midAndDownStream: '新能源汽车' }}
        onFinish={handleClick}
        style={{ marginBottom: 24 }}
      >
        <Form.Item label='上游' name='upstream'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='中游或下游' name='midAndDownStream'>
          <Input disabled />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
      {isShow && (
        <LineAndBar
          xdata={xdata}
          ydata1={ydata1}
          ydata2={ydata2}
          yname1={'新能源汽车出货量'}
          yname2={'三元锂电子开发成本'}
          yAxisName1={'万辆'}
          yAxisName2={'%'}
          isSmooth={false}
        />
      )}
    </div>
  )
}
