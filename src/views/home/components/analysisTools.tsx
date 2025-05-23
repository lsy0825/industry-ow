import { Button, Descriptions, Divider, Form, Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import styles from './index.module.less'
import { useCharts } from '@/hook/useCharts'
import SpecialBarChart from '../charts/specialBarChart'

export default function AnalysisTools() {
  const [isShow, setIsShow] = useState(false)

  const handleClick = (fieldsValue: any) => {
    setIsShow(true)
  }

  const objValues: Record<string, Array<{ label: string; children: any }>> = {
    产业链全景分析工具: [
      {
        label: '功能',
        children: '支持产业链、区域、产品和企业四大视角的数据整合，实现企业数据、市场数据、政策数据的多维度关联分析。'
      },
      {
        label: '应用场景',
        children: '帮助企业在全球产业链中定位自身的供应链上下游关系，识别关键节点和依赖风险，形成全局性供应链图谱。'
      },
      {
        label: '案例',
        children: (
          <div>
            <Form
              layout='inline'
              initialValues={{ factor: '2021年印度关税政策调整', impactFirm: 'BOSCH' }}
              onFinish={handleClick}
              style={{ marginBottom: 24 }}
            >
              <Form.Item label='影响因子' name='factor'>
                <Input disabled />
              </Form.Item>
              <Form.Item label='影响企业' name='impactFirm'>
                <Input disabled />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  确定
                </Button>
              </Form.Item>
            </Form>
            {isShow && <SpecialBarChart />}
          </div>
        )
      }
    ],
    风险预警与监控工具: [
      {
        label: '功能',
        children: '基于政策、市场和供应链的实时变化，通过智能算法识别潜在风险，及时发出预警信号。'
      },
      {
        label: '应用场景',
        children: '在政策或市场环境发生变化时，通过实时预警帮助用户提前制定应对策略，确保供应链的安全性。'
      },
      {
        label: '案例',
        children:
          '一家跨国零售公司计划应对某国政策调整带来的市场风险。通过该工具，公司可以实时监控政策的变化，并在政策调整可能影响某些产品进口时提前收到预警信号，及时调整库存和物流安排，确保供应链安全。'
      }
    ],
    智能决策支持工具: [
      {
        label: '功能',
        children: '结合机器学习和数据挖掘，为用户提供供应链优化、库存管理和市场策略的智能化决策支持。'
      },
      {
        label: '应用场景',
        children: '根据需求预测和数据分析，为企业提供最优的库存配置、供应链布局和市场推广策略。'
      },
      {
        label: '案例',
        children:
          '一家快速消费品公司希望在节假日季节优化库存。通过该工具，企业基于需求预测和历史数据分析，获得库存配置的智能化建议，既避免库存积压，又确保供货充足，提升运营效率。'
      }
    ],
    政策影响分析工具: [
      {
        label: '功能',
        children: '深入分析政策变动对市场和供应链的影响，尤其是关税、补贴、环保政策等方面的变化。'
      },
      {
        label: '应用场景',
        children: '帮助企业评估新政策对供应链和市场的影响，支持政策合规性和市场适应性策略的制定。'
      },
      {
        label: '案例',
        children:
          '一家化工企业计划进入欧盟市场。通过分析欧盟环保政策和进口关税，平台评估政策变化对化工产品的影响，帮助企业在市场准入、环保合规性和供应链调整上做出适应性决策。'
      }
    ],
    产品生命周期与市场竞争分析工具: [
      {
        label: '功能',
        children: '基于产品的市场占有率、生命周期阶段和价格波动数据，帮助企业评估产品的市场竞争力。'
      },
      {
        label: '应用场景',
        children: '企业可以判断产品所处的生命周期阶段，分析竞争态势，从而调整价格和推广策略。'
      },
      {
        label: '案例',
        children:
          '一家智能手机公司正在评估其最新型号的市场表现。通过该工具，公司可以分析新产品的生命周期阶段和市场竞争力，实时监测市场份额及价格变化，决定是否调整产品定价或加大市场推广力度。'
      }
    ],
    企业综合竞争力评估工具: [
      {
        label: '功能',
        children: '结合企业财务状况、专利、市场表现等数据，评估企业的市场竞争力和供应链中的核心地位。'
      },
      {
        label: '应用场景',
        children: '支持企业进行内部竞争力分析和外部市场定位，识别行业中的地位及增长潜力。'
      },
      {
        label: '案例',
        children:
          '一家科技企业想要分析其核心竞争力并提升在行业中的地位。该工具结合企业的财务、专利数据和市场份额，为企业提供一份综合竞争力评估报告，帮助其识别自身的优势和改进领域。'
      }
    ],
    供应链流向与协同分析工具: [
      {
        label: '功能',
        children: '动态展示供应链流向图，分析企业与上下游合作伙伴的依赖关系和协同情况。'
      },
      {
        label: '应用场景',
        children: '帮助企业识别关键节点和薄弱环节，优化上下游协同，确保供应链的稳定性。'
      },
      {
        label: '案例',
        children:
          '一家服装品牌公司希望提升供应链透明度和协作效率。通过该工具，公司可以识别服装面料和成衣供应商的流向图，优化与供应商和客户的协同关系，确保在生产高峰期的供货连续性。'
      }
    ],
    区域资源配置与协同分析工具: [
      {
        label: '功能',
        children: '分析区域内的企业、资源分布、市场需求和区域政策，优化区域资源配置，支持跨区域协同。'
      },
      {
        label: '应用场景',
        children: '帮助政府和企业实现资源高效利用，促进区域经济均衡发展和产业协同。'
      },
      {
        label: '案例',
        children:
          '某省政府计划在其辖区内优化资源配置。通过该工具，政府可以分析区域内资源分布和产业结构，制定区域产业发展策略，并推动跨区域协作，促进区域经济均衡发展。'
      }
    ],
    供应链韧性与断点分析工具: [
      {
        label: '功能',
        children: '通过关键节点和资源依赖分析，评估供应链韧性并预测可能的断点。'
      },
      {
        label: '应用场景',
        children: '为企业识别供应链中可能的薄弱环节，提高应对突发事件和供应链中断的恢复能力。'
      },
      {
        label: '案例',
        children:
          '一家制药企业担心关键原料供应链的中断风险。该工具识别供应链中的关键节点并分析断点风险，帮助企业找到替代供应商，提升供应链韧性，以应对市场变化或突发事件。'
      }
    ],
    市场需求预测与趋势分析工具: [
      {
        label: '功能',
        children: '基于历史数据、市场趋势和季节性波动预测市场需求，支持企业的战略规划。'
      },
      {
        label: '应用场景',
        children: '企业可提前进行市场规划，优化库存和销售策略，满足市场需求波动。'
      },
      {
        label: '案例',
        children:
          '一家零售公司希望预测节日销售旺季的需求变化。通过该工具，企业基于历史销售数据和市场趋势预测需求，调整采购计划和库存安排，最大限度地满足市场需求。'
      }
    ],
    产品创新与技术投资分析工具: [
      {
        label: '功能',
        children: '结合企业的专利、技术进步和研发投入，评估产品创新潜力和技术投资回报。'
      },
      {
        label: '应用场景',
        children: '支持企业在创新管理和研发投资决策中找到最佳策略，提升技术竞争力。'
      },
      {
        label: '案例',
        children:
          '一家电动汽车制造商想要投资新电池技术。该工具分析技术创新趋势和行业投资回报，帮助企业评估该技术在未来市场的潜力，从而决定投资的优先级和研发方向。'
      }
    ],
    可持续发展与政策合规性评估工具: [
      {
        label: '功能',
        children: '分析企业在环境保护、资源利用效率和政策合规性方面的表现，支持可持续发展。'
      },
      {
        label: '应用场景',
        children: '帮助企业实现环保合规、降低政策风险，支持长期可持续发展战略。'
      },
      {
        label: '案例',
        children:
          '一家电子产品制造商计划提升环保合规性并实现可持续发展目标。该工具分析企业在资源消耗和环保合规方面的现状，预测新政策对生产的影响，并建议环保改进措施，确保企业的长期政策合规和绿色发展。'
      }
    ]
  }

  const renderDes = useCallback((items: any, title: string) => {
    return (
      <div>
        <Descriptions column={1} bordered title={title} style={{ marginBottom: 24 }}>
          {items?.map((item: any) => (
            <Descriptions.Item label={item.label} key={item.label} labelStyle={{ width: '110px' }}>
              {item.children}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Divider style={{ borderColor: '#791db6' }} />
      </div>
    )
  }, [])
  return <div className={styles.topStyle}>{Object.keys(objValues)?.map(val => renderDes(objValues[val], val))}</div>
}
