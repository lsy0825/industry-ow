import { Button, Form, Input, Typography } from 'antd'
import styles from './index.module.less'
import EcoImg from '@/assets/ecoImg.png'
import { useState } from 'react'
import LineAndBar from '../charts/lineAndBar'

const { Paragraph, Text } = Typography
const xdata = ['2018', '2019', '2020', '2021', '2022', '2023年1-4月']
const ydata1 = [17, 9, 7, 27, 102, 30]
const ydata2 = [50, -25, -23, 340, 280, 40]

export default function AreaEco() {
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
        initialValues={{ area: '西安', industry: '新能源汽车' }}
        onFinish={handleClick}
        style={{ marginBottom: 24 }}
      >
        <Form.Item label='区域' name='area'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='产业链' name='industry'>
          <Input disabled />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
      {isShow && (
        <div>
          <Paragraph>
            <Text strong>
              1. <Text underline>西安</Text> 在 <Text underline>新能源汽车</Text> 区域内企业数据的资源分布
            </Text>
          </Paragraph>
          {/* <div className={styles.atlasArea}> */}
          <img src={EcoImg} />
          {/* </div> */}
          <Paragraph>
            <Text strong>
              2. <Text underline>西安</Text> 在 <Text underline>新能源汽车</Text> 内政策引导对产业的影响
            </Text>
          </Paragraph>
          <LineAndBar
            xdata={xdata}
            ydata1={ydata1}
            ydata2={ydata2}
            yname1={'产量（万辆）'}
            yname2={'增速（%）'}
            yAxisName1={'万辆'}
            yAxisName2={'%'}
            isSmooth={true}
          />
        </div>
      )}
    </div>
  )
}
