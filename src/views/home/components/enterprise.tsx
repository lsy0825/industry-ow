import { useState } from 'react'
import { Button, Col, DatePicker, Form, InputNumber, Row, Space, Tag, TreeSelect } from 'antd'
import type { InputNumberProps } from 'antd'
import styles from './index.module.less'
import { useRequest } from 'ahooks'
import api from '@/api'
import moment from 'moment'
import CommonFirmList from './commonFirmList'
import { addLabelToTree } from '@/utils'
import { useStore } from '@/store'
import { FirmAndQuaDict, RespProps } from '../type'

const { CheckableTag } = Tag
const { RangePicker } = DatePicker
const { SHOW_PARENT } = TreeSelect
const amountData = ['不限']

export default function EnterpriseFC(props:any) {
	const {setCurrent} = props
  const [form] = Form.useForm()
  const [searchValue, setSearchValue] = useState({ pageNo: 1, pageSize: 10 })
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [selectedApts, setSelectedApts] = useState<string[]>([])
  const [selectedAmount, setSelectedAmount] = useState<string[]>(['不限'])
  const { area, industryOpts } = useStore()

  const { data: dataList } = useRequest(
    async () => {
      const resp: RespProps = (await api.getEnterpriseInfo({ ...searchValue })) as RespProps
      return (resp && resp?.list) || []
    },
    {
      manual: false,
      refreshDeps: [searchValue]
    }
  )

  // 企业状态和资质类别字典
  const { data: dictList } = useRequest(
    async () => {
      const resp: FirmAndQuaDict = (await api.getStatusAndQualify()) as FirmAndQuaDict
      setSelectedFirms([resp?.enterpriseStatus?.[0] === '不限' ? resp?.enterpriseStatus?.[0] : ''])
      setSelectedApts([resp?.companyQualification?.[0] === '不限' ? resp?.companyQualification?.[0] : ''])
      return resp
    },
    {
      manual: false
    }
  )

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedFirms.filter(t => t !== tag)
    setSelectedFirms(nextSelectedTags)
  }

  const handleChange2 = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedApts.filter(t => t !== tag)
    setSelectedApts(nextSelectedTags)
  }

  const handleChange3 = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedAmount.filter(t => t !== tag)
    setSelectedAmount(nextSelectedTags)
  }

  const handleSearch = () => {
    const { registeredOfficeIdList, date, industryClassTextList, annualIncomeStart, annualIncomeEnd } =
      form.getFieldsValue()
    const dateEstablishmentStart = date ? moment(new Date(date?.[0])).format('YYYY-MM-DD HH:mm:ss') : ''
    const dateEstablishmentEnd = date ? moment(new Date(date?.[1])).format('YYYY-MM-DD HH:mm:ss') : ''
    const status = selectedFirms?.join(',') === '不限' ? '' : selectedFirms?.join(',')
    const qualification = selectedApts?.join(',') === '不限' ? '' : selectedApts
    const params = {
      registeredOfficeIdList: registeredOfficeIdList ?? [],
      industryClassTextList:
        industryClassTextList?.join(',') === '全部' || !industryClassTextList ? [] : industryClassTextList,
      annualIncomeStart: annualIncomeStart ?? '',
      annualIncomeEnd: annualIncomeEnd ?? '',
      dateEstablishmentStart: dateEstablishmentStart ?? '',
      dateEstablishmentEnd: dateEstablishmentEnd ?? '',
      statusText: status,
      qualificationsTextList: qualification
    }
    setSearchValue({ ...searchValue, ...params })
  }

  const handleReset = () => {
    form.resetFields()
    setSelectedFirms([dictList?.enterpriseStatus?.[0] === '不限' ? dictList?.enterpriseStatus?.[0] : ''])
    setSelectedApts([dictList?.companyQualification?.[0] === '不限' ? dictList?.companyQualification?.[0] : ''])
    setSelectedAmount(['不限'])
    setSearchValue({ pageNo: 1, pageSize: 10 })
  }

  const getAmount: InputNumberProps['onChange'] = num => {
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
          {dictList?.enterpriseStatus?.map((item: string) => (
            <CheckableTag
              key={item}
              checked={selectedFirms.indexOf(item) > -1}
              onChange={checked => handleChange(item, checked)}
            >
              {item}
            </CheckableTag>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <span style={{ marginRight: 12 }}>资质类别 :</span>
          {dictList?.companyQualification?.map((item: string) => (
            <CheckableTag
              key={item}
              checked={selectedApts.indexOf(item) > -1}
              onChange={checked => handleChange2(item, checked)}
            >
              {item}
            </CheckableTag>
          ))}
        </div>
        <Form form={form}>
          <Row>
            <Col span={12}>
              <Form.Item label='注册资本' style={{ marginBottom: 0 }}>
                {amountData.map((item: string) => (
                  <CheckableTag
                    key={item}
                    checked={selectedAmount.indexOf(item) > -1}
                    onChange={checked => handleChange3(item, checked)}
                  >
                    {item}
                  </CheckableTag>
                ))}
                <Form.Item style={{ display: 'inline-block', marginLeft: 8 }} name='annualIncomeStart'>
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
                <Form.Item style={{ display: 'inline-block' }} name='annualIncomeEnd'>
                  <InputNumber placeholder='最高金额' onChange={getAmount} />
                </Form.Item>
                <span style={{ fontSize: 12, paddingLeft: 8 }}> 万元人民币 </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='industryClassTextList' label='产业'>
                <TreeSelect
                  treeData={addLabelToTree([industryOpts], 'noId')}
                  style={{ width: 500 }}
                  treeCheckable
                  placeholder='请选择产业'
                  showCheckedStrategy={SHOW_PARENT}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='date' label='成立日期'>
                <RangePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='registeredOfficeIdList' label='区域'>
                <TreeSelect
                  treeData={addLabelToTree([area], 'hasId')}
                  style={{ width: 500 }}
                  treeCheckable
                  placeholder='请选择区域'
                  showCheckedStrategy={SHOW_PARENT}
                  treeNodeFilterProp='title'
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: 'right' }}>
            <Space size='small'>
              <Button onClick={handleReset}>重置</Button>
              <Button type='primary' onClick={handleSearch}>
                查询
              </Button>
            </Space>
          </div>
        </Form>
      </div>
      <div className={styles.bottomStyle}>
        <CommonFirmList dataList={dataList} title='firm' searchValue={searchValue} setSearchValue={setSearchValue} setCurrent={setCurrent}/>
      </div>
    </div>
  )
}
