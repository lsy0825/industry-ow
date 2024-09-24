import { useState } from 'react'
import { Anchor, Button, Cascader, Col, DatePicker, Form, InputNumber, List, Modal, Row, Space, Tag } from 'antd'
import styles from './index.module.less'
import Detail from './detail'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const { CheckableTag } = Tag
const { RangePicker } = DatePicker
const firmData = [
  { label: '不限', key: '1' },
  { label: '存续（在营，开业，在业）', key: '2' },
  { label: '吊销，未注销', key: '3' },
  { label: '吊销，已注销', key: '4' },
  { label: '注销', key: '5' },
  { label: '撤销', key: '6' },
  { label: '迁出', key: '7' }
]
const aptitudeData = [
  { label: '不限', key: '1' },
  { label: '上市企业', key: '2' },
  { label: '新三版', key: '3' },
  { label: '国家级专精特新', key: '4' },
  { label: '省级专精特新', key: '5' },
  { label: '国家级单项冠军', key: '6' },
  { label: '省级单项冠军', key: '7' },
  { label: '高新技术企业', key: '8' },
  { label: '科技型中小企业', key: '9' },
  { label: '中国企业500强', key: '10' },
  { label: '独角兽', key: '11' },
  { label: '央企', key: '12' },
  { label: '民营', key: '13' },
  { label: '外资', key: '14' }
]
const amountData = [{ label: '不限', key: '1' }]
const data = [
  {
    title: '隆基绿能科技股份有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上市',
    desc3: '大宗商品'
  },
  {
    title: '北京国沣汇泽科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '数字政府',
    desc2: '主版上',
    desc3: '专精特新'
  },
  {
    title: '中国联合网络通信有限公司北京市分公司昌平北七家营业厅',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    amount: '1000',
    desc1: '新能源',
    desc2: '主版上',
    desc3: '大宗商品'
  }
]

const options: Option[] = [
  {
    label: '信息技术',
    value: 'IT',
    children: [
      {
        label: '物联网',
        value: 'webofthings'
      },
      {
        label: '云计算',
        value: 'cloudComputing'
      },
      {
        label: '网络安全',
        value: 'networkSecurity'
      }
    ]
  },
  {
    label: '未来产业',
    value: 'futureIndustry',
    children: [
      {
        label: '人工智能',
        value: 'AI'
      },
      {
        label: '储能',
        value: 'storedEnergy'
      }
    ]
  }
]

const optionsArea: Option[] = [
  {
    label: '全国',
    value: '全国',
    children: [
      {
        label: '陕西省',
        value: '陕西省',
        children: [
          {
            label: '西安市',
            value: '西安市',
            children: [
              {
                label: '长安区',
                value: '长安区'
              }
            ]
          }
        ]
      },
      {
        label: '广东省',
        value: '广东省',
        children: [
          {
            label: '广州市',
            value: '广州市',
            children: [
              {
                label: '天河区',
                value: '天河区'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default function EnterpriseFC() {
  const [form] = Form.useForm()
  const [selectedFirms, setSelectedFirms] = useState<string[]>(['1'])
  const [selectedApts, setSelectedApts] = useState<string[]>(['1'])
  const [selectedAmount, setSelectedAmount] = useState<string[]>(['1'])
  const [isModalOpen, setIsModalOpen] = useState<any>({ type: false, record: {} })

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedFirms.filter(t => t !== tag)
    console.log('111111111 ', nextSelectedTags)
    setSelectedFirms(nextSelectedTags)
  }

  const handleChange2 = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedApts.filter(t => t !== tag)
    console.log('22222222222 ', nextSelectedTags)
    setSelectedApts(nextSelectedTags)
  }

  const handleChange3 = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedAmount.filter(t => t !== tag)
    console.log('333333 ', nextSelectedTags)
    setSelectedAmount(nextSelectedTags)
  }

  const showTotal = (total: number) => `共 ${total} 条`

  const showDetail = (record: any) => {
    console.log(record, '====')
  }

  return (
    <div>
      <div className={styles.topStyle}>
        <div style={{ marginBottom: 24 }}>
          <span style={{ marginRight: 12 }}>企业状态 :</span>
          {firmData.map(item => (
            <CheckableTag
              key={item.key}
              checked={selectedFirms.indexOf(item.key) > -1}
              onChange={checked => handleChange(item.key, checked)}
            >
              {item.label}
            </CheckableTag>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <span style={{ marginRight: 12 }}>资质类别 :</span>
          {aptitudeData.map(item => (
            <CheckableTag
              key={item.key}
              checked={selectedApts.indexOf(item.key) > -1}
              onChange={checked => handleChange2(item.key, checked)}
            >
              {item.label}
            </CheckableTag>
          ))}
        </div>
        <Form form={form}>
          <Row>
            <Col span={12}>
              <Form.Item label='注册资本' style={{ marginBottom: 0 }}>
                {amountData.map(item => (
                  <CheckableTag
                    key={item.key}
                    checked={selectedAmount.indexOf(item.key) > -1}
                    onChange={checked => handleChange3(item.key, checked)}
                  >
                    {item.label}
                  </CheckableTag>
                ))}
                <Form.Item style={{ display: 'inline-block', marginLeft: 8 }} name='minAmount'>
                  <InputNumber placeholder='最低金额' />
                </Form.Item>
                <span
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    fontSize: 12
                  }}
                >
                  {' '}
                  至{' '}
                </span>
                <Form.Item style={{ display: 'inline-block' }} name='maxAmount'>
                  <InputNumber placeholder='最高金额' />
                </Form.Item>
                <span style={{ fontSize: 12, paddingLeft: 8 }}> 万元人民币 </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='industry' label='产业'>
                <Cascader
                  style={{ width: 500 }}
                  options={options}
                  // onChange={onChange}
                  multiple
                  maxTagCount='responsive'
                  placeholder='请选择产业'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='date' label='成立日期'>
                <RangePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='area' label='区域'>
                <Cascader
                  style={{ width: 500 }}
                  options={optionsArea}
                  // onChange={onChange}
                  multiple
                  maxTagCount='responsive'
                  placeholder='请选择区域'
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: 'right' }}>
            <Space size='small'>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button type='primary'>查询</Button>
            </Space>
          </div>
        </Form>
      </div>
      <div className={styles.bottomStyle}>
        <List
          itemLayout='horizontal'
          dataSource={data}
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 10,
            total: data.length,
            showTotal,
            showSizeChanger: true,
            showQuickJumper: true
          }}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <span className={styles.rightTitle}>{`成立时间：${item.time}`}</span>,
                <span className={styles.rightTitle}>{`注册资本：${item.amount}万元`}</span>
              ]}
              onClick={() => setIsModalOpen({ type: true, record: item })}
            >
              <List.Item.Meta
                title={<span className={styles.leftTitle}>{item.title}</span>}
                description={
                  <>
                    <Tag color='#f50'>{item.desc1}</Tag>
                    <Tag color='#2db7f5'>{item.desc2}</Tag>
                    <Tag color='#fcb138'>{item.desc3}</Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={isModalOpen?.record?.title}
        open={isModalOpen.type}
        footer={null}
        onCancel={() => setIsModalOpen({ type: false, record: {} })}
        width={1200}
        centered={true}
      >
        <Detail />
      </Modal>
    </div>
  )
}
