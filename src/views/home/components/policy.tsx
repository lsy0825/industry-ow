import { useState } from 'react'
import { Button, Col, Form, Row, Space, Tag, TreeSelect } from 'antd'
import styles from './index.module.less'
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
const { SHOW_PARENT } = TreeSelect

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

export default function PolicyFC() {
  const [form] = Form.useForm()
  const [selectedDeclare, setSelectedDeclare] = useState<string[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState({ pageNo: 1, pageSize: 10 })
  const { area, industryOpts } = useStore()

  // 字典
  const { data: dictList } = useRequest(
    async () => {
      const resp: any = await api.getPolicyDic()
      setSelectedDeclare([resp?.policyLevel?.[0] === '不限' ? resp?.policyLevel?.[0] : ''])
      setSelectedPolicy([resp?.policyDeclarationType?.[0] === '不限' ? resp?.policyDeclarationType?.[0] : ''])
      return resp
    },
    {
      manual: false
    }
  )

  // 查询数据
  const { data: policyData } = useRequest(
    async () => {
      const resp: any = await api.getPolicyData({ ...searchValue })
      return resp.list
    },
    {
      manual: false,
      refreshDeps: [searchValue]
    }
  )

  const handleChangeDeclare = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedDeclare.filter(t => t !== tag)
    setSelectedDeclare(nextSelectedTags)
  }

  const handleChangePolicy = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedPolicy.filter(t => t !== tag)
    setSelectedPolicy(nextSelectedTags)
  }

  const handleSearch = () => {
    const {
      policyTypeTextList,
      supportObjectTextList,
      supportBehaviorTextList,
      supportMethodTextList,
      industryTypeTextList,
      areaIdList
    } = form.getFieldsValue()
    const policyLevel = selectedPolicy?.join(',') === '不限' ? '' : selectedPolicy?.join(',')
    const declare = selectedDeclare?.join(',') === '不限' ? '' : selectedDeclare?.join(',')
    const params = {
      policyLevelText: policyLevel,
      declarationTypeText: declare,
      policyTypeTextList: policyTypeTextList?.join(',') === '全部' || !policyTypeTextList ? [] : policyTypeTextList,
      supportObjectTextList:
        supportObjectTextList?.join(',') === '全部' || !supportObjectTextList ? [] : supportObjectTextList,
      supportBehaviorTextList:
        supportBehaviorTextList?.join(',') === '全部' || !supportBehaviorTextList ? [] : supportBehaviorTextList,
      supportMethodTextList:
        supportMethodTextList?.join(',') === '全部' || !supportMethodTextList ? [] : supportMethodTextList,
      industryTypeTextList:
        industryTypeTextList?.join(',') === '全部' || !industryTypeTextList ? [] : industryTypeTextList,
      areaIdList: areaIdList ?? []
    }
    setSearchValue({ ...searchValue, ...params })
  }

  const handleReset = () => {
    form.resetFields()
    setSelectedDeclare([dictList?.policyLevel?.[0] === '不限' ? dictList?.policyLevel?.[0] : ''])
    setSelectedPolicy([dictList?.policyDeclarationType?.[0] === '不限' ? dictList?.policyDeclarationType?.[0] : ''])
    setSearchValue({ pageNo: 1, pageSize: 10 })
  }

  const commonCase = useCallback(
    (options: any, placeholder: string) => (
      <TreeSelect
        treeData={options}
        style={{ width: 500 }}
        treeCheckable
        placeholder={placeholder}
        showCheckedStrategy={SHOW_PARENT}
        treeNodeFilterProp='title'
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
                {dictList?.policyLevel?.map((item: string) => (
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
                {dictList?.policyDeclarationType?.map((item: string) => (
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
              <Form.Item name='policyTypeTextList' label='政策类型'>
                {commonCase(addLabelToTree([dictList?.policyType], 'noId'), '请选择政策类型')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportObjectTextList' label='支持对象'>
                {commonCase(addLabelToTree([dictList?.supportObject], 'noId'), '请选择支持对象')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportBehaviorTextList' label='支持行为'>
                {commonCase(addLabelToTree([dictList?.supportBehavior], 'noId'), '请选择支持行为')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='supportMethodTextList' label='支持方式'>
                {commonCase(addLabelToTree([dictList?.supportMethod], 'noId'), '请选择支持方式')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='industryTypeTextList' label='产业'>
                {commonCase(addLabelToTree([industryOpts], 'noId'), '请选择产业')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='areaIdList' label='区域'>
                {commonCase(addLabelToTree([area], 'hasId'), '请选择区域')}
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
        <CommonPolicyList
          dataList={policyData}
          title='policy'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </div>
  )
}
