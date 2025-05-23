import { Button, Form, Input, Typography } from 'antd'
import styles from './index.module.less'
import RadarChart from '../charts/radarChart'
import RotationBar from '../charts/rotationBar'
import { useState } from 'react'

const { Paragraph, Text } = Typography
const radarData = [
  { name: '原材料供应', max: 6500 },
  { name: '生产制造', max: 16000 },
  { name: '物流与配送', max: 30000 },
  { name: '市场需求', max: 38000 },
  { name: '国内政策', max: 52000 },
  { name: '国际形势', max: 25000 }
]
const radarData1 = [4200, 3000, 20000, 35000, 50000, 18000]
const radarData2 = [5000, 14000, 28000, 26000, 42000, 21000]
const atlasData: Record<string, string[]> = {
  上游: ['华中数控', '埃夫特', '美的集团', '亚威股份', '远光软件', '远光软件', '科大智能', '智云股份', '华工科技'],
  中游: ['海图科技', '鲲云科技', '优诺', '......'],
  下游: [
    '广汽埃安第二智造中心',
    '苏州璨曜光电有限公司',
    '格力电器（杭州）有限公司',
    '中信戴卡六号厂',
    '捷普电子（广州）有限公司',
    '北京福田康明斯发动机有限公司',
    '中策橡胶集团股份有限公司',
    '杭州海康威视数字技术股份有限公司',
    '......'
  ]
}

export default function IndustryAnalyse() {
  const [form] = Form.useForm()
  const [isShow, setIsShow] = useState(false)

  // useEffect(() => {
  //   form.setFieldsValue({ firm: '鲲云科技', industry: '智慧工厂' })
  // }, [])

  const handleClick = (fieldsValue: any) => {
    setIsShow(true)
  }
  return (
    <div className={styles.industryAnalyse}>
      <Form
        layout='inline'
        form={form}
        initialValues={{ firm: '鲲云科技', industry: '智慧工厂' }}
        onFinish={handleClick}
        style={{ marginBottom: 24 }}
      >
        <Form.Item label='企业' name='firm'>
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
              1. <Text underline>鲲云科技</Text> 在 <Text underline>智慧工厂</Text> 行业产业链图谱中的位置
            </Text>
          </Paragraph>
          <div className={styles.atlasArea}>
            {Object.keys(atlasData)?.map(item => (
              <div className={styles.itemArea}>
                <div className={styles.itemTitle}>{item}</div>
                <div className={styles.itemText}>
                  {atlasData[item]?.map(it => (
                    <div className={it === '鲲云科技' ? styles.textSpecial : styles.text}>{it}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Paragraph>
            <Text strong>
              2. <Text underline>鲲云科技</Text> 在 <Text underline>智慧工厂</Text> 行业中的断点风险分布图
            </Text>
          </Paragraph>
          <RadarChart
            title='鲲云科技断点风险分布图'
            data={radarData}
            radarName1='管理学院数据源'
            radarName2='网络公开数据源'
            radarData1={radarData1}
            radarData2={radarData2}
          />
          <Paragraph>
            <Text strong>
              3. <Text underline>鲲云科技</Text> 在 <Text underline>智慧工厂</Text> 行业中的风险预警变化趋势
            </Text>
          </Paragraph>
          <RotationBar />
        </div>
      )}
    </div>
  )
}
