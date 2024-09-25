import { useState } from 'react'
import { Button, Cascader, Col, Form, List, Modal, Row, Select, Space, Tag } from 'antd'
import styles from './index.module.less'
import Detail from '@/assets/policyDetail.png'
import { useRequest } from 'ahooks'
import api from '@/api'
import { addLabelToTree } from '@/utils'
import { useCallback } from 'react'
import { useStore } from '@/store'
import CommonPolicyList from './commonPolicyList'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const { CheckableTag } = Tag
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const declareData = [
  { label: '不限', key: '1' },
  { label: '非申报类', key: '2' },
  { label: '申报类', key: '3' }
]
const policyLevelData = [
  { label: '不限', key: '1' },
  { label: '国家级', key: '2' },
  { label: '省级', key: '3' },
  { label: '市级', key: '4' },
  { label: '区级', key: '5' },
  { label: '园区级', key: '6' }
]
const data = [
  {
    title: '隆基绿能科技股份有限公司',
    time: '2020-04-12',
    source: '科技合作处（区域创新处）',
    desc: ['市级', '其他通知', '陕西省', '非申报类']
  },
  {
    title: '北京国沣汇泽科技有限公司',
    time: '2020-04-12',
    source: '科技合作处（区域创新处）',
    desc: ['市级', '其他通知', '陕西省', '非申报类']
  },
  {
    title: '中国联合网络通信有限公司北京市分公司昌平北七家营业厅',
    time: '2020-04-12',
    source: '科技合作处（区域创新处）',
    desc: ['市级', '其他通知', '陕西省', '非申报类']
  },
  {
    title: '山西嘉鹏佳科技有限公司',
    time: '2020-04-12',
    source: '科技合作处（区域创新处）',
    desc: ['市级', '其他通知', '陕西省', '非申报类']
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

const optionsPolicy: Option[] = [
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  },
  {
    value: 'tom',
    label: 'Tom'
  }
]

export default function PolicyFC() {
  const [form] = Form.useForm()
  const [selectedDeclare, setSelectedDeclare] = useState<string[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState({ pageNo: 1, pageSize: 10 })
  const { area, industryOpts } = useStore()

  // 字典
  const { data: dictList } = useRequest(
    async () => {
      const resp: any = await api.getPolicyDic()
      setSelectedDeclare(resp?.policyLevel?.[0])
      setSelectedPolicy(resp?.policyDeclarationType?.[0])
      return resp
    },
    {
      manual: false
    }
  )

  const handleChangeDeclare = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedDeclare.filter(t => t !== tag)
    console.log('22222222222 ', nextSelectedTags)
    setSelectedDeclare(nextSelectedTags)
  }

  const handleChangePolicy = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedPolicy.filter(t => t !== tag)
    console.log('333333 ', nextSelectedTags)
    setSelectedPolicy(nextSelectedTags)
  }

  const showTotal = (total: number) => `共 ${total} 条`

  const commonCase = useCallback(
    (options: any, placeholder: string) => (
      <Cascader
        style={{ width: 500 }}
        options={options}
        // onChange={onChange}
        multiple
        maxTagCount='responsive'
        placeholder={placeholder}
      />
    ),
    [dictList]
  )

  return (
    <div>
      <div className={styles.topStyle}>
        <Form form={form} {...layout}>
          <Row>
            <Col span={12}>
              <Form.Item label='政策级别' style={{ marginBottom: 0 }}>
                {dictList?.policyLevel?.map(item => (
                  <CheckableTag
                    key={item}
                    checked={selectedPolicy.indexOf(item) > -1}
                    onChange={checked => handleChangePolicy(item, checked)}
                  >
                    {item}
                  </CheckableTag>
                ))}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='申报类型'>
                {dictList?.policyDeclarationType?.map(item => (
                  <CheckableTag
                    key={item}
                    checked={selectedDeclare.indexOf(item) > -1}
                    onChange={checked => handleChangeDeclare(item, checked)}
                  >
                    {item}
                  </CheckableTag>
                ))}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='policyType' label='政策类型'>
                {commonCase(addLabelToTree([dictList?.policyType], 'noId'), '请选择政策类型')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportedPerson' label='支持对象'>
                {commonCase(addLabelToTree([dictList?.supportObject], 'noId'), '请选择支持对象')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportedAct' label='支持行为'>
                {commonCase(addLabelToTree([dictList?.supportBehavior], 'noId'), '请选择支持行为')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportedWay' label='支持方式'>
                {commonCase(addLabelToTree([dictList?.supportMethod], 'noId'), '请选择支持方式')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='industry' label='产业'>
                {commonCase(addLabelToTree([industryOpts], 'noId'), '请选择产业')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='area' label='区域'>
                {commonCase(addLabelToTree([area], 'hasId'), '请选择区域')}
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
        <CommonPolicyList dataList={data} title='policy' searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </div>
  )
}
