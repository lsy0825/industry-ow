import { useState } from 'react'
import { Button, Cascader, Col, Form, List, Modal, Row, Select, Space, Tag } from 'antd'
import styles from './index.module.less'
import Detail from '@/assets/policyDetail.png'

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }

const { CheckableTag } = Tag;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const declareData = [
    {label:'不限', key:'1'},
    {label:'非申报类', key:'2'},
    {label:'申报类', key:'3'},
];
const policyLevelData = [
    {label:'不限', key:'1'},
		{label:'国家级', key:'2'},
    {label:'省级', key:'3'},
    {label:'市级', key:'4'},
    {label:'区级', key:'5'},
    {label:'园区级', key:'6'},
];
const data = [
    {
      title: '隆基绿能科技股份有限公司',
      time:'2020-04-12',
      source:'科技合作处（区域创新处）',
			desc:['市级','其他通知','陕西省','非申报类'],
    },
    {
      title: '北京国沣汇泽科技有限公司',
      time:'2020-04-12',
      source:'科技合作处（区域创新处）',
			desc:['市级','其他通知','陕西省','非申报类'],
    },
    {
      title: '中国联合网络通信有限公司北京市分公司昌平北七家营业厅',
      time:'2020-04-12',
      source:'科技合作处（区域创新处）',
			desc:['市级','其他通知','陕西省','非申报类'],
    },
    {
      title: '山西嘉鹏佳科技有限公司',
      time:'2020-04-12',
      source:'科技合作处（区域创新处）',
			desc:['市级','其他通知','陕西省','非申报类'],
    },
  ];

  const options: Option[] = [
    {
      label: '信息技术',
      value: 'IT',
      children: [
        {
          label: '物联网',
          value: 'webofthings',
        },
        {
            label: '云计算',
            value: 'cloudComputing',
        },
        {
            label: '网络安全',
            value: 'networkSecurity',
        },
      ],
    },
    {
      label: '未来产业',
      value: 'futureIndustry',
      children: [
        {
          label: '人工智能',
          value: 'AI',
        },
        {
            label: '储能',
            value: 'storedEnergy',
          },
      ],
    },
  ];

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
                        value: '长安区',
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
                          value: '天河区',
                      }
                  ]
              }
            ]
          },
      ],
    },
  ];

	const optionsPolicy: Option[] = [
		{
			value: 'jack',
			label: 'Jack',
		},
		{
			value: 'lucy',
			label: 'Lucy',
		},
		{
			value: 'tom',
			label: 'Tom',
		},
	]

export default function PolicyFC() {
    const [form] = Form.useForm();
    const [selectedDeclare, setSelectedDeclare] = useState<string[]>(['1']);
    const [selectedPolicy, setSelectedPolicy] = useState<string[]>(['1']);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChangeDeclare = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [ tag] : selectedDeclare.filter(t => t !== tag);
        console.log('22222222222 ', nextSelectedTags);
        setSelectedDeclare(nextSelectedTags);
    };

    const handleChangePolicy = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [tag] : selectedPolicy.filter(t => t !== tag);
        console.log('333333 ', nextSelectedTags);
        setSelectedPolicy(nextSelectedTags);
    };

    const showTotal = (total:number) => `共 ${total} 条`;

  return (
    <div>
        <div className={styles.topStyle}>
        <Form form={form} {...layout}>
            <Row>
                <Col span={12}>
                    <Form.Item label="政策级别" style={{ marginBottom: 0 }}>
                        {policyLevelData?.map(item => (
                            <CheckableTag
															key={item.key}
															checked={selectedPolicy.indexOf(item.key) > -1}
															onChange={checked => handleChangePolicy(item.key, checked)}
                            >
                            	{item.label}
                            </CheckableTag>
                        ))}
                    </Form.Item>
                </Col>
                <Col span={12}>
									<Form.Item label="申报类型">
											{declareData.map(item => (
												<CheckableTag
													key={item.key}
													checked={selectedDeclare.indexOf(item.key) > -1}
													onChange={checked => handleChangeDeclare(item.key, checked)}
												>
													{item.label}
												</CheckableTag>
											))}
									</Form.Item>
                </Col>
								<Col span={12}>
									<Form.Item name="policyType" label="政策类型">
											<Select
												showSearch
												style={{ width: 500 }}
												placeholder="请选择政策类型"
												filterOption={(input, option) =>
													(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
												}
												options={optionsPolicy}
											/>
									</Form.Item>
                </Col>
								<Col span={12}>
									<Form.Item name="supportedPerson" label="支持对象">
											<Select
												showSearch
												style={{ width: 500 }}
												placeholder="请选择支持对象"
												filterOption={(input, option) =>
													(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
												}
												options={optionsPolicy}
											/>
									</Form.Item>
                </Col>
								<Col span={12}>
									<Form.Item name="supportedAct" label="支持行为">
											<Select
												showSearch
												style={{ width: 500 }}
												placeholder="请选择支持行为"
												filterOption={(input, option) =>
													(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
												}
												options={optionsPolicy}
											/>
									</Form.Item>
                </Col>
								<Col span={12}>
									<Form.Item name="supportedWay" label="支持方式">
											<Select
												showSearch
												style={{ width: 500 }}
												placeholder="请选择支持方式"
												filterOption={(input, option) =>
													(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
												}
												options={optionsPolicy}
											/>
									</Form.Item>
                </Col>
                <Col span={12}>
									<Form.Item name="industry" label="产业">
											<Cascader
													style={{ width: 500 }}
													options={options}
													// onChange={onChange}
													multiple
													maxTagCount="responsive"
													placeholder='请选择产业'
											/>
									</Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="area" label="区域">
                        <Cascader
                            style={{ width: 500 }}
                            options={optionsArea}
                            // onChange={onChange}
                            multiple
                            maxTagCount="responsive"
                            placeholder='请选择区域'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <div style={{ textAlign: 'right' }}>
                <Space size="small">
                <Button onClick={() => form.resetFields()}>
                    重置
                </Button>
                <Button type="primary">
                    查询
                </Button>
                </Space>
            </div>
        </Form>
        </div>
        <div className={styles.bottomStyle}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                pagination={{
                    onChange: (page) => {
                    console.log(page);
                    },
                    pageSize: 10,
                    total:data.length,
                    showTotal,
                    showSizeChanger:true,
                    showQuickJumper:true,
                }}
                renderItem={(item) => (
                <List.Item actions={[<span className={styles.rightTitle}>{`时间：${item.time}`}</span>, <span className={styles.rightTitle}>{`来源：${item.source}`}</span>]} onClick={()=>setIsModalOpen(true)}>
                    <List.Item.Meta
                        title={<span className={styles.leftTitle}>{item.title}</span>}
                        description={item.desc?.map(it=><Tag color="orange">{it}</Tag>)}
                    />
                </List.Item>
                )}
            />
        </div>
        <Modal title={null} open={isModalOpen} footer={null} onCancel={()=> setIsModalOpen(false)} width={1200} centered={true}>
            <img src={Detail} width='100%' height='100%'/>
        </Modal>
    </div>
  )
}
