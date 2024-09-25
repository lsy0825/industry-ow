import React, { useState } from 'react'
import { Anchor, Button, Cascader, Col, DatePicker, Form, InputNumber, List, Modal, Row, Space, Tag } from 'antd'
import styles from './index.module.less'
import Detail from './detail'
import { useRequest } from 'ahooks'
import api from '@/api'
import moment from 'moment'
import CommonFirmList from './commonFirmList'

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
  const [searchValue, setSearchValue] = useState({ pageNo: 1, pageSize: 10 })
  const [selectedFirms, setSelectedFirms] = useState<string[]>(['1'])
  const [selectedApts, setSelectedApts] = useState<string[]>(['1'])
  const [selectedAmount, setSelectedAmount] = useState<string[]>(['1'])

  const {
    data: dataList,
    loading,
    run
  } = useRequest(
    async () => {
      const resp: any = await api.getEnterpriseInfo({ ...searchValue })
      return resp.list
    },
    {
      manual: false,
      refreshDeps: [searchValue]
    }
  )

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

  const showDetail = (record: any) => {
    console.log(record, '====')
  }

  const handleSearch = () => {
    const { area, date, industry, minAmount, maxAmount } = form.getFieldsValue()
    const startTime = moment(new Date(date[0])).format('YYYY-MM-DD')
    const endTime = moment(new Date(date[1])).format('YYYY-MM-DD')
    console.log(selectedFirms, selectedApts, selectedAmount, 'date', startTime, endTime)
  }

  const getAmount = (num: any) => {
    // 输入金额取消不限按钮高亮
    if (num) {
      setSelectedAmount([])
    }
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
                  <InputNumber placeholder='最低金额' onChange={getAmount} />
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
                  至
                </span>
                <Form.Item style={{ display: 'inline-block' }} name='maxAmount'>
                  <InputNumber placeholder='最高金额' onChange={getAmount} />
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
              <Button type='primary' onClick={handleSearch}>
                查询
              </Button>
            </Space>
          </div>
        </Form>
      </div>
      <div className={styles.bottomStyle}>
        <CommonFirmList dataList={dataList} title='firm' searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </div>
  )
}
