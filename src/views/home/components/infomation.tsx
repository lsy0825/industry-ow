import styles from './index.module.less'
import Info1 from '@/assets/info1.png'
import Info2 from '@/assets/info2.png'
import Info3 from '@/assets/info3.png'
import Info4 from '@/assets/info4.png'
import Info5 from '@/assets/info5.png'
import Info6 from '@/assets/info6.png'
import Info7 from '@/assets/info7.png'
import Info8 from '@/assets/info8.png'
import Info9 from '@/assets/info9.png'
import Info10 from '@/assets/info10.png'
import { Button, Input, Menu, Modal, Select, Tabs } from 'antd'
import { useCallback, useState } from 'react'

export default function InfoFC() {
  const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, type: '' })

  const items = [
    {
      key: '1',
      label: '产业链资讯',
      children: (
        <div>
          <div
            className={styles.articleArea}
            onClick={() => setIsModalOpen({ isOpen: true, type: '1' })}
            style={{ marginBottom: 36 }}
          >
            <img src={Info1} width='50%' height='50%' />
            <span className={styles.text}>
              “重点产业链韧性与安全水平提升”研讨会暨国家社科基金重大项目“大宗商品产业链供应链韧性与安全水平评估及对策研究”开题报告会成功举办
            </span>
          </div>
          <div
            className={styles.articleArea}
            onClick={() => setIsModalOpen({ isOpen: true, type: '2' })}
            style={{ marginBottom: 36 }}
          >
            <img src={Info5} width='50%' height='50%' />
            <span className={styles.text}>报告：中国产业链韧性全球第二，人才资本与创新投入仍需加强</span>
          </div>
          <div
            className={styles.articleArea}
            onClick={() => setIsModalOpen({ isOpen: true, type: '3' })}
            style={{ marginBottom: 36 }}
          >
            <img src={Info6} width='50%' height='50%' />
            <span className={styles.text}>
              陕西光子产业持续“追光”形成“聚链成群”效应 2024硬科技创新大会光子产业峰会在西安举行
            </span>
          </div>
          <div className={styles.articleArea} onClick={() => setIsModalOpen({ isOpen: true, type: '4' })}>
            <img src={Info10} width='50%' height='50%' />
            <span className={styles.text}>我国首个覆盖全产业链的铁矿石大数据平台正式发布</span>
          </div>
        </div>
      )
    },
    { key: '2', label: '产品资讯' },
    { key: '3', label: '企业资讯' },
    { key: '4', label: '政策资讯' }
  ]

  const content: any = useCallback((key: string) => {
    switch (key) {
      case '1':
        return (
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <img src={Info1} width='50%' height='50%' />
            <div className={styles.infoText}>
              4月20日，由教育部人文社科重点研究基地——东北财经大学产业组织与企业组织研究中心主办的“重点产业链韧性与安全水平提升”研讨会暨国家社科基金重大项目“大宗商品产业链供应链韧性与安全水平评估及对策研究”开题报告会在笃行楼成功举办。国家发展改革委宏观经济研究院姜长云研究员、工业和信息化部电子第五研究所李锐研究员、东北财经大学学术委员会主任唐加福教授、中国社会科学院工业经济研究所国际产业研究室主任李晓华研究员、南开大学经济与社会发展研究院副院长白雪洁教授、山东财经大学公共管理与法学学部部长张红凤教授等特邀专家，以及来自清华大学、武汉大学、南开大学、中国政法大学、大连理工大学、《改革与战略》编辑部、《财经问题研究》编辑部、《产业组织评论》编辑部等单位的专家学者和东北财经大学相关领域研究人员共计50余人参加了会议。
            </div>
            <div className={styles.infoText}>
              国家社科基金重大项目“大宗商品产业链供应链韧性与安全水平评估及对策研究”首席专家肖兴志教授从研究缘由、逻辑思路和正在开展的工作三个方面进行了项目汇报。他指出，该项目从维护国家五大安全使命的视角选择了铁矿石、油气和粮食产业作为大宗商品产业链供应链韧性评估的研究对象，从供需错配的经济层面和大国博弈、地缘政治风险的非经济层面剖析了大宗商品产业链供应链面临的风险类别，着重阐释了理论基础研究需要关注的重点领域，并强调对韧性评估方法和监测预警机制的开发是课题重点聚焦的研究内容。整个项目从理论到产业，再到政策，刻画不同冲击的影响，提出不同情景的应对政策，建立起大宗商品产业链供应链安全理论框架、评估方法和政策体系，为维护国家经济安全提供智力支持和决策参考。肖兴志强调，韧性评估依赖于可靠详实的产业链数据和评估方法，项目组筹备建设了“重点产业链安全评估与监测中心”和“重点产业链监测大数据平台”，以调试各类监测预警模型、摸清大宗商品产业链供应链韧性评估步骤为切入点，协同推进理论阐释、韧性评估和政策设计等核心任务，已取得阶段性成效。子课题负责人数字经济研究院院长于左研究员、辽宁（大连）自贸区研究院院长苏杭教授、金融学院杨默副教授分别就子课题的研究思路和内容、研究进展情况进行了汇报。
            </div>
            <div className={styles.infoText}>
              与会专家组充分肯定了课题研究的重大意义，高度评价和充分肯定了课题研究思路、研究方案和技术路线设计，并就课题的进一步研究推进提出了建设性的意见：一是建议聚焦苗头性、倾向性、潜在性的问题，抓住大宗商品产业链供应链出现的一些新情况、新问题进行研究；二是结合供应链韧性和系统韧性的视角，提出针对产业链供应链韧性的共性理论研究框架，产出一般产业链类型的韧性评估理论与方法，在国际上产生更大的影响力；三是未来可将更多的大宗商品类别纳入到研究范畴，从上下游企业能力匹配的视角研究大宗商品产业链供应链韧性提升的问题；四是在政策建议部分增加普适性的研究，从产业链供应链核心地位提升的角度研究产业链再造过程中我国扮演的角色问题。
            </div>
            <img src={Info2} width='50%' height='50%' />
            <div className={styles.infoText}>
              在“重点产业链安全评估与监测中心”揭牌仪式上，肖兴志和姜长云以及其他特邀专家为中心揭牌。产业组织与企业组织研究中心主任郭晓丹对“重点产业链安全评估与监测中心”和“重点产业链监测大数据平台”进行介绍。“重点产业链安全评估与监测中心”旨在聚焦我国产业链布局和运行过程中的理论和现实问题，及时捕捉重点产业链断链风险，为提升产业链供应链韧性和安全水平提供理论依据与决策参考。“重点产业链监测大数据平台”作为中心的核心产品，依托大数据与机器学习技术，测算并动态监控产业链韧性水平，预警产业链风险。与会专家对“重点产业链监测大数据平台”的建设表示了极大关注，一致认为该平台的建设富有创新性和现实意义，能够为动态监测我国重点产业链发展提供有力支撑。
            </div>
            <img src={Info3} width='50%' height='50%' />
            <div>
              <img src={Info4} width='50%' height='50%' />
            </div>
            <div className={styles.infoText}>
              下午，“重点产业链韧性与安全水平提升”研讨会在笃行楼七楼举办。共有12篇产业链韧性相关领域的学术论文在分论坛上得到报告和点评，与会者碰撞出了思想的火花，取得了学术交流的预期效果。
            </div>
            <div className={styles.infoText} style={{ marginBottom: 24 }}>
              本次会议的成功举办，标志着东北财经大学重点产业链韧性与安全领域的研究工作进入新阶段，将进一步推动学校应用经济学学科建设迈上新台阶。
            </div>
          </div>
        )
      case '2':
        return (
          <div style={{ padding: '24px 0', borderBottom: '1px solid #ccc' }}>
            <img src={Info5} width='50%' height='50%' />
            <div className={styles.infoText}>
              11月6日，在第六届中国国际进口博览会暨虹桥国际经济论坛“提升全球产业链供应链韧性”分论坛上，全球化智库（CCG）发布了《人才、创新与产业链韧性报告（2023）》（下称“《报告》”）。
            </div>
            <div className={styles.infoText}>
              《报告》报告选取了人才资本、创新资源、产业总体情况、制造业表现和企业活力等5个一级指标和22个二级指标，构建国家产业链韧性指数。基于国家产业链韧性指数，报告分析了中国、美国、加拿大、英国、法国、德国、澳大利亚、新西兰、日本、韩国、新加坡、印度等38个国家的产业链韧性的国际定位，以及人才资本、创新资源、产业总体情况、制造业表现、企业活力五个方面对产业链韧性贡献的国际比较。
            </div>
            <div className={styles.infoText}>
              《报告》显示，世界主要国家产业链韧性根据得分可分为若干梯队。其中，美国大幅度领先，中国列第二名，德国、日本、新加坡三国表现旗鼓相当、分列第三至第五。第六至第十名的韩国、英国、瑞典、以色列、法国。前十名中，欧美国家与亚洲国家各为5个，数量上平分秋色。可以看到，亚洲国家的产业发展也具有较强韧性。
            </div>
            <div className={styles.infoText}>
              《报告》重点对中国在5项指标上的表现进行了分析，并以新能源汽车产业链和半导体产业链为案例，分析人才与创新对相关产业链韧性的影响。《报告》认为，中国在制造业表现、产业总体情况、企业活力表现方面优势明显，但人才资本方面暂处弱势地位，创新投入仍需持续加强。
            </div>
            <div className={styles.infoText}>《报告》就提升产业链供应链韧性提出了五方面建议：</div>
            <div className={styles.infoText}>
              一是坚持开放合作，共同维护全球产业链韧性。中国需要倡议更加开放、更加平等的国际合作，确保各经济体在全球产业链供应链中享有平等的机会。一方面，要充分利用或创建合作平台与机制深化国际合作，促进知识、技术、人才等各方面的资源共享，消弭信息和技术鸿沟，降低共享成本，提高合作效率；另一方面，要打造共识并将共识具体化到行动与规则之上，降低全球产业链供应链面临的不确定。
            </div>
            <div className={styles.infoText}>
              二是搭建产业链韧性交流平台，形成常态化沟通机制。要提供信息共享和合作的平台，共享实践经验，赋能各国共同应对挑战；要为技术创新和协同研发提供机会，使不同国家和企业可以汇集和整合创新资源；要建立应对共同危机和风险管理的平台，帮助各国共同制定应对突发事件的策略；要推动全球产业链可持续发展，共同探讨环保减排等事关可持续发展的技术和商业模式；要建立信任和互信，促进各方更好地理解彼此的立场和利益。
            </div>
            <div className={styles.infoText}>
              三是推动创新链、人才链、资金链和产业链融合发展。要优化财政、金融、税收、知识产权保护等创新支持政策，引导企业与社会资本积极投入研发和创新活动，提高研发投入强度；要加强人才培育与流动，提升教育水平，加强STEM领域的教育，加强人才培养力度；要开展技能培训和职业教育，提升人才的技术水平；要鼓励人才集聚，畅通人才跨区域、跨领域、跨部门流动的通道；要推动科学技术与产业的双向互动，强化产业实践积累与创造；要破除体制障碍，更好发挥政府在“三位一体”协同发展中的统筹作用；要突破“四链”融合过程中的机制障碍，创新协作机制、激励模式和考核评价体系，增强链条主体参与融合的获得感。
            </div>
            <div className={styles.infoText}>
              四是加强数字化转型，提升产业链的可预见性与适应性。要加强数字基础设施的建设，确保高速互联网连接和数据存储能力，支持数字化转型；要产业部门建立数据收集、分析和应用的能力，以数据分析助力决策科学化；要推广物联网等技术应用，加强设备和系统的实时监控和供应链管理的数字化，实现供应链的实时可视化，提高供应链的灵活性；要增强网络安全，减少潜在的网络攻击和数据泄露风险；要加强人才的数字化培训和技能提升，确保其适应数字化转型环境。
            </div>
            <div className={styles.infoText}>
              五是以有效的宏观政策改善市场环境，强化我国在关键产业上的薄弱环节。未来，在解决“卡脖子”的战略环节问题上，除了通过货币政策和财政政策加以引导外，需要更多从立法方面出发给予引导。一方面，加强对战略产业实施有效的法治化保护；另一方面，通过营造市场化、法治化、国际化一流营商环境，优化民营和外资经济发展环境，依法保护民营企业产权和企业家权益，使各种所有制经济依法平等使用生产要素，公平参与市场竞争，以打通战略产业的研发、商业化、生产和流通相关环节。
            </div>
          </div>
        )
      case '3':
        return (
          <div style={{ padding: '24px 0', borderBottom: '1px solid #ccc' }}>
            <img src={Info6} width='50%' height='50%' />
            <div className={styles.infoText}>
              11月3日，以“追光焕新、聚链成群”为主题的2024硬科技创新大会光子产业峰会在西安高新国际会议中心举行。据介绍，陕西省于2021年底实施“追光计划”并于去年升级启动“跃迁行动”，光子产业快速发展并形成“聚链成群”生态效应，光子产业总产值连续两年以每年超过50%的速度递增，目前已超过300亿元。
            </div>
            <div className={styles.infoText}>
              会上宣布国家重大科技基础设施“先进阿秒激光设施”（西安部分）正式启动建设。中科创星创始合伙人、硬科技理念提出者米磊在峰会上介绍了“追光计划跃迁行动”最新进展。%的速度递增，目前已超过300亿元。
            </div>
            <img src={Info7} width='50%' height='50%' />
            <div className={styles.infoText}>
              据介绍，目前陕西省光子企业已由两年前的150余家增加至300余家，初步形成光子产业生态体系。通过产业园区聚集效应及光子基金牵引，已为陕西投资孵化企业114家。%的速度递增，目前已超过300亿元。
            </div>
            <div className={styles.infoText}>
              此外，米磊还发布了《硬科技ESK价值投资责任报告（2024）》。这是中科创星自2023年来发布的第二本ESK报告，再度展现中科创星在经济（E）、社会（S）和知识（K）三个领域的最新务实行动，并精选了10个投资案例进行深入分析解读，体现硬科技多领域企业对ESK理念的理解和实践。%的速度递增，目前已超过300亿元。
            </div>
            <div className={styles.infoText}>
              围绕光子产业补链、强链需求，陕西已陆续引进省外30余家光子产业重点家企业。签约仪式上，中智科仪（北京）科技有限公司、佛山纳诺特科技有限公司、东莞市中科原子精密制造科技有限公司、深圳瑞识智能科技有限公司、杭州洛微科技有限公司、徐州光引科技发展有限公司等6家陕西省外企业与西安高新区管委会签约，企业将以投入建设生产线、成立分公司或研发中心等方式落地西安。%的速度递增，目前已超过300亿元。
            </div>
            <img src={Info8} width='50%' height='50%' />
            <div className={styles.infoText}>
              光子产业链党委书记、西科控股董事长曹慧涛与10家银行代表进行现场签约。各金融投资机构持续通过“光子补链、光子强链、接力追光、中鑫先导”等光子基金矩阵以及“科技基础设施贷”、“研发贷”、“硬科技创新贷”、“光子贷”等特色化金融产品，满足光子产业链不同阶段差异化融资需求。%的速度递增，目前已超过300亿元。
            </div>
          </div>
        )
      case '4':
        return (
          <div style={{ paddingTop: '24px' }}>
            <div className={styles.text}>
              记者11月7日从第二届矿产资源供应链可持续生态开发者大会上获悉，我国首个覆盖铁矿石从勘探到冶炼全产业链供应链的矿产铁矿石大数据平台正式发布。%的速度递增，目前已超过300亿元。
            </div>
            <div className={styles.text}>
              中国矿产铁矿石大数据平台整合人工智能、区块链、工业互联网等信息技术，为全产业链供应链数据提供洞察分析，有助于行业优化资源配置效率，降低成本，助力行业数智化转型升级，为用户提供精准化、多样化的数据产品服务。%的速度递增，目前已超过300亿元。
            </div>
            <img src={Info9} width='50%' height='50%' />
            <div className={styles.text}>
              中国矿产资源集团大数据有限公司执行董事赵庆涛：平台建立了包括资源分布、生产运输、各类库存、市场行情在内的数千个数据指标，实现了对大宗商品期现货交易所动态、铁矿石专用泊位、运输船舶、钢铁生产基地实时跟踪监测，可为全球铁矿石大宗商品行业客户提供全链条多角度动态资讯和数据分析。%的速度递增，目前已超过300亿元。
            </div>
            <img src={Info10} width='50%' height='50%' />
            <div className={styles.text}>
              目前，中国矿产资源集团已与数十个钢铁、矿山、港口、贸易、金融等企业和机构建立了战略合作关系，共同打造共建、共治、共享的铁矿石产业数据生态圈。%的速度递增，目前已超过300亿元。
            </div>
            <div className={styles.text}>
              下一步，平台将继续深化与国内外矿产资源供应商、用户企业及港口航运、贸易、金融等行业龙头企业的交流合作，持续完善铁矿石产业数据生态圈，开发上线更加丰富、准确的数据产品服务，推动产业生态和谐健康可持续发展。%的速度递增，目前已超过300亿元。
            </div>
          </div>
        )

      default:
        break
    }
  }, [])

  return (
    <div className={styles.info}>
      <Tabs tabPosition='left' items={items} />
      {/* <div
        className={styles.articleArea}
        onClick={() => setIsModalOpen({ isOpen: true, type: '1' })}
        style={{ marginBottom: 36 }}
      >
        <img src={Info1} width='50%' height='50%' />
        <span className={styles.text}>
          “重点产业链韧性与安全水平提升”研讨会暨国家社科基金重大项目“大宗商品产业链供应链韧性与安全水平评估及对策研究”开题报告会成功举办
        </span>
      </div>
      <div
        className={styles.articleArea}
        onClick={() => setIsModalOpen({ isOpen: true, type: '2' })}
        style={{ marginBottom: 36 }}
      >
        <img src={Info5} width='50%' height='50%' />
        <span className={styles.text}>报告：中国产业链韧性全球第二，人才资本与创新投入仍需加强</span>
      </div>
      <div
        className={styles.articleArea}
        onClick={() => setIsModalOpen({ isOpen: true, type: '3' })}
        style={{ marginBottom: 36 }}
      >
        <img src={Info6} width='50%' height='50%' />
        <span className={styles.text}>
          陕西光子产业持续“追光”形成“聚链成群”效应 2024硬科技创新大会光子产业峰会在西安举行
        </span>
      </div>
      <div className={styles.articleArea} onClick={() => setIsModalOpen({ isOpen: true, type: '4' })}>
        <img src={Info10} width='50%' height='50%' />
        <span className={styles.text}>我国首个覆盖全产业链的铁矿石大数据平台正式发布</span>
      </div> */}
      <Modal
        open={isModalOpen.isOpen}
        footer={null}
        onCancel={() => setIsModalOpen({ isOpen: false, type: '' })}
        width={1200}
        centered={true}
      >
        {content(isModalOpen.type)}
      </Modal>
    </div>
  )
}
