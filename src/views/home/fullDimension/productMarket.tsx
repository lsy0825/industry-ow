import { Button, Form, Input, Typography } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import LineAndBar from '../charts/lineAndBar'
import PieChart from '../charts/pieChart'

const { Paragraph, Text } = Typography
const xdata = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
const ydata1Global = [2450, 9390, 9680, 9560, 9042, 7797, 8105, 8105, 8918]
const ydata2Global = [2.2, 0.8, 1.3, 2.1, 2.4, 4.0, 8.0, 12.5, 22]

const ydata1Domestic = [873.76, 2802.8, 2888, 2808.1, 2576.9, 2531.1, 2627, 2750, 3009.4]
const ydata2Domestic = [4.3, 1.8, 2.7, 4.5, 4.7, 5.4, 13.4, 25, 31.62]

const pieData = [
  { value: 32.7, name: '比亚迪' },
  { value: 8.3, name: '特斯拉中国' },
  { value: 6.2, name: '上汽通用五菱' },
  { value: 6.1, name: '广汽埃安' },
  { value: 5.2, name: '理想' },
  { value: 4.3, name: '吉利' },
  { value: 3.8, name: '长安' },
  { value: 2.8, name: '长城' },
  { value: 2.2, name: '蔚来' },
  { value: 1.8, name: '小鹏' }
]

export default function ProductMarket() {
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
        initialValues={{ industry: '汽车产业', subIndustry: '新能源汽车' }}
        onFinish={handleClick}
        style={{ marginBottom: 24 }}
      >
        <Form.Item label='产业' name='industry'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='细分产业' name='subIndustry'>
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
              1. <Text underline>新能源汽车</Text> 细分产业在 <Text underline>汽车产业</Text> 的供应链流分析
            </Text>
          </Paragraph>
          <LineAndBar
            xdata={xdata}
            ydata1={ydata1Global}
            ydata2={ydata2Global}
            yname1={'全球汽车销量（万辆）'}
            yname2={'新能源汽车渗透率（%）'}
            yAxisName1={'万辆'}
            yAxisName2={'%'}
            isSmooth={true}
          />
          <LineAndBar
            xdata={xdata}
            ydata1={ydata1Domestic}
            ydata2={ydata2Domestic}
            yname1={'国内汽车销量（万辆）'}
            yname2={'新能源汽车渗透率（%）'}
            yAxisName1={'万辆'}
            yAxisName2={'%'}
            isSmooth={true}
          />
          <Paragraph>
            <Text strong>
              2. <Text underline>新能源汽车</Text> 细分产业的竞争分析
            </Text>
          </Paragraph>
          <PieChart legend={pieData?.map(item => item.name)} pieData={pieData} />
        </div>
      )}
    </div>
  )
}
