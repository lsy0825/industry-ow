import { Button, message, Popconfirm, Typography } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import ChainChart from '../charts/chainChart'
import BarChart from '../charts/barChart'
import MuchBarChart from '../charts/muchBarChart'
import api from '@/api'

const { Paragraph, Text } = Typography
const data = {
  name: '储能',
  children: [
    {
      name: '机械储能',
      children: [
        {
          name: '抽水蓄能'
        },
        {
          name: '压缩空气储能'
        },
        {
          name: '飞轮蓄能'
        }
      ]
    },
    {
      name: '电池储能',
      children: [{ name: '超导储能' }, { name: '超级电容储能' }]
    },
    {
      name: '电化学储能',
      children: [
        { name: '铅酸电池' },
        { name: '铅碳电池' },
        { name: '锂离子电池' },
        { name: '钠硫电池' },
        { name: '液流电池' }
      ]
    },
    {
      name: '热储能',
      children: [{ name: '储热' }, { name: '储冷' }]
    },
    {
      name: '化学储能',
      children: [{ name: '电解水制氢' }, { name: '合成天然气' }]
    }
  ]
}

const bigDataTop = {
  name: '数据资源 105199',
  children: [
    {
      name: '行业数据资源 21120',
      children: [
        {
          name: '金融数据 7271'
        },
        {
          name: '医疗数据 13632'
        },
        {
          name: '航空数据 167'
        },
        {
          name: '航运数据 66'
        }
      ]
    },
    {
      name: '公共数据资源 80294',
      children: [
        { name: '交通数据 30166' },
        { name: '水务数据 20952' },
        { name: '燃气数据 17311' },
        { name: '电力数据 11957' }
      ]
    },
    {
      name: '通信数据资源 3033'
    },
    {
      name: '互联网数据资源 815'
    }
  ]
}

const bigDataMiddle = {
  children: [
    {
      name: '大数据技术服务 19619',
      children: [
        {
          name: '图分析 840'
        },
        {
          name: '数智融合 613'
        },
        {
          name: '数据安全 10414'
        },
        {
          name: '基础技术与工具 9126',
          children: [
            {
              name: '计算引擎 241'
            },
            {
              name: '数据建模 432'
            },
            {
              name: '数据可视化 7079'
            },
            {
              name: '数据库 616'
            },
            {
              name: '元数据管理 722'
            },
            {
              name: '数据集成 667'
            }
          ]
        }
      ]
    },
    {
      name: '数据交付 4309',
      children: [{ name: '隐私计算 567' }, { name: '云计算 3779' }]
    },
    {
      name: '硬件设施 11692',
      children: [{ name: '因特网数据中心服务 10484' }, { name: '服务器 1317' }]
    },
    {
      name: '软件平台 2276',
      children: [{ name: '大数据平台 2276' }]
    }
  ]
}

const bigDataBottom = {
  children: [
    {
      name: '大数据衍生服务 760',
      children: [
        {
          name: '数据合规 192'
        },
        {
          name: '数据经纪人 66'
        },
        {
          name: '数据交易 513'
        }
      ]
    },
    {
      name: '大数据融合应用 58006',
      children: [
        { name: '医疗健康大数据 847' },
        { name: '能源大数据 1555' },
        { name: '政务大数据 19962' },
        { name: '金融大数据 1445' },
        { name: '工业大数据 867' },
        { name: '交通大数据 4094' },
        { name: '建筑大数据 108' },
        { name: '其他大数据服务及应用 33219' }
      ]
    }
  ]
}

const xdata = ['其他大数据服务及应用', '交通数据', '水务数据', '政务大数据', '燃气数据']
const ydata = [33175, 30136, 20935, 19955, 17289]
const lowAltitudeXdata = ['消费级无人机', '工业无人机', '民用直升机', '航空发动机', '轻型通用飞机']
const ydata1 = [2300, 700, 180, 160, 170]
const ydata2 = [100, 199, 8, 15, 4]
const pvxdata = ['2021', '2022', '2023', '2024']
const pvydata = [474.2, 714.5, 1291.5, 1600]
const materialsxdata = ['2019', '2020', '2021', '2022', '2023']
const materialsydata = [9.96, 10.65, 10.33, 10.13, 10.19]
const aixdata = ['2019', '2020', '2021', '2022', '2023']
const aiydata = [269, 312.6, 433.9, 493.2, 531.2, 584.2]

export default function WhitePaperFC() {
  const confirm = (name: string) => {
    api.getDownloadFile(name)
  }

  return (
    <div className={styles.detailStyle}>
      {/* 金融产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>金融产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>行业主要上市公司：</Text>
        中国银行(601988.SH)、工商银行(601398.SH)、中国人保(601319.SH)、中国平安(601318.SH)、渤海租赁(000415.SZ)、江苏金租(600901.SH)等
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>本文核心数据：</Text>
        产业金融产业链;产业金融产业全景图谱
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>产业金融产业链全景梳理</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        产业金融的运作逻辑是，上游的资金供应方利用产业资本和金融资本为产业金融平台提供资金，依托产业金融平台，打造产业金融生态圈，通过产业链进行下游客户获取，为下游产业客户提供金融信贷、融资租赁、担保、企业财务、保理业务以及新衍生其他新型形态业务。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        具体来看，上游的资金供应方包括政府部门、实体企业、投资机构等，中游的产业金融平台包括银行、保险、租赁等业务形态，下游的资金需求方为各行各业的企业，例如科技企业、环保企业、能源企业等。
      </Paragraph>
      <div className={styles.area}>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>上游环节</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>资金供给方</div>
            <div className={styles.text2}>政府部门</div>
            <div className={styles.text2}>实体企业</div>
            <div className={styles.text2}>投资机构</div>
            <div className={styles.text2}>......</div>
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>中游环节</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>产业金融平台</div>
            <div className={styles.text2}>银行</div>
            <div className={styles.text2}>保险</div>
            <div className={styles.text2}>租赁</div>
            <div className={styles.text2}>......</div>
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>下游环节</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>资金需求方</div>
            <div className={styles.text2}>科技企业</div>
            <div className={styles.text2}>环保企业</div>
            <div className={styles.text2}>能源企业</div>
            <div className={styles.text2}>......</div>
          </div>
        </div>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        从产业链生态图谱来看，在中游的产业金融平台中，银行主体的代表性企业有中国银行、工商银行、建设银行等，保险主体的代表性企业有中国人保、中国平安、中国太保等，融资租赁主体的代表性企业有渤海租赁、江苏金租、国银金租等，财务公司的代表性企业有中油财务、中国电财、上汽财务等。
      </Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年产业金融产业链研究分析报告.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多金融资讯，请点击查看</Button>
      </Popconfirm>
      {/* 宠物行业产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>宠物行业产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>行业主要上市公司：</Text>
        乖宝宠物(301498)、路斯股份(832419)、中宠股份(002891)、佩蒂股份(300673)、源飞宠物(001222)、天元宠物(301335)等
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>本文核心数据：</Text>
        产业链生态图谱;代表性企业营收
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>产业链剖析：中游环节覆盖广泛</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        从产业链角度出发，宠物行业可分为上游的宠物繁殖和宠物交易;中游的主要为宠物食品、用品和宠物服务供应企业;下游主要宠物终端消费市场及其相关环节，包括宠物主(即最终消费者)以及他们与宠物相关的一切消费场景，如通过线上或线下渠道购买宠物食品、用品，以及为宠物选择和使用各种服务。
      </Paragraph>
      <div className={styles.area}>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>上游</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>宠物养殖和活体交易</div>
            <div className={styles.text2}>宠物养殖</div>
            <div className={styles.text3}>
              <span className={styles.text4}>养殖场</span>
              <span className={styles.text4}>猫/犬舍</span>
              <span className={styles.text4}>个人养殖商</span>
            </div>
            <div className={styles.text2}>宠物活体交易</div>
            <div className={styles.text5}>
              <span className={styles.text4}>线上渠道</span>
              <span className={styles.text4}>线下渠道</span>
            </div>
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>中游</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>宠物行业</div>
            <div className={styles.text2}>宠物食品</div>
            <div className={styles.text2}>宠物用品</div>
            <div className={styles.text2}>宠物服务</div>
            <div className={styles.text2}>......</div>
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>下游</div>
          <div className={styles.itemText}>
            <div className={styles.text1}>终端消费市场</div>
            <div className={styles.text2}>电商平台</div>
            <div className={styles.text2}>零售店/超市</div>
            <div className={styles.text2}>宠物主题店</div>
            <div className={styles.text2}>......</div>
          </div>
        </div>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>宠物行业产业链区域热力地图：江苏、广东和山东分布最集中</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        从我国宠物产业链企业区域分布来看，宠物产业链企业主要分布在沿海地区，尤其是江苏、广东和山东省，其次是在浙江、河北等地。
      </Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年宠物行业产业链梳理及区域热力地图.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多宠物行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 储能电池行业产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>储能电池行业产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>行业主要上市公司：</Text>
        宁德时代(300750);比亚迪(002594);瑞浦兰钧(0666.HK);亿纬锂能(300014);国轩高科(002074);鹏辉能源(300438);南都电源(300068);中创新航(3931.HK);普利特(002324);派能科(688063)等
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>本文核心数据：</Text>
        中国储能电池产量;中国电化学储能装机规模;中国储能电池出货量等
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>行业概况</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>1、定义</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        储能主要包括抽水蓄能、压缩空气储能、飞轮储能、超导磁储能、电池储能等，其中，电化学储能在电力系统中应用较为广泛。通过电化学储能技术，电能以化学能的形式存储下来，并适时反馈回电力网络。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        从技术路径来看，电化学储能的实现靠储能电池实现，储能电池是将化学能转化为电能的装置，主要以锂离子电池、液流电池、铅蓄电池和钠基电池等储能技术为主。
      </Paragraph>
      <ChainChart data={data} />
      <Paragraph style={{ textIndent: '2em' }}>
        通常来讲，储能电池是指电池包，即电池组和BMS等部件PACK组装后的成品储能电池系统。但结合多家企业产品及市场来看，电芯、电池(模)组、电池包均属于储能电池产品。
      </Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国储能电池行业产业链研究分析.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多储能电池行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 大数据行业产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>大数据行业产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>大数据产业</Text>
        是以数据及数据所蕴含的信息价值为核心生产要素，通过数据技术、数据产品、数据服务等形式，使数据与信息价值在各行业经济活动中得到充分释放的赋能型产业。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        基于
        <Text strong>启信产业大脑</Text>
        的海量数据与专业研判模型，本文将从<Text strong>产业图谱、区域分析、增长潜力、创新活力、重点企业、融资情况</Text>
        六个方面分析大数据产业发展现状及未来潜力。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>一、产业图谱</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>1）产业链图谱</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>大数据产业上游</Text>
        立足海量行业数据资源、公共数据资源、通信数据资源、互联网数据资源等提供辅助性的服务，包括金融数据、医疗数据、航空数据、交通数据、电力数据等。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>大数据产业中游</Text>
        是基础支撑层，提供各种大数据技术服务，包括图分析、数智融合、数据安全等，也提供因特网数据中心服务、服务器等硬件设施。此外，相关云计算、隐私计算、大数据平台建设也属于产业链中游。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>大数据产业下游</Text>
        则是大数据应用市场，随着我国大数据研究技术水平的不断提升，目前，我国大数据已广泛应用于政务、工业、金融、交通、电信和空间地理等行业。
      </Paragraph>
      <div className={styles.bigDataArea}>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>上游105199</div>
          <div className={styles.itemChain}>
            <ChainChart data={bigDataTop} />
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>中游35385</div>
          <div className={styles.itemChain}>
            <ChainChart data={bigDataMiddle} />
          </div>
        </div>
        <div className={styles.itemArea}>
          <div className={styles.itemTitle}>下游58601</div>
          <div className={styles.itemChain}>
            <ChainChart data={bigDataBottom} />
          </div>
        </div>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>数据来源:启信数据-启信产业大脑</Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>2）核心产业环节</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        全国该产业中，
        <Text strong>其他大数据服务及应用、交通数据、水务数据、政务大数据、燃气数据</Text>
        发展较好，占总数的62.88%，拥有企业数分别为33175家、30136家、20935家、19955家、17289家。
      </Paragraph>
      <BarChart xdata={xdata} ydata={ydata} yname='企业数量（家）' />
      <Paragraph style={{ textIndent: '2em' }}>数据来源:启信数据-启信产业大脑</Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国大数据产业研究报告.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多大数据行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 低空经济行业产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>低空经济行业产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>低空经济作为一个新兴领域，正逐步走进大众视野。</Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        近日，合合信息（股票代码：688615）旗下启信宝发布《2024年中国低空经济产业研究报告》，基于启信宝的海量数据与专业研判模型，从产业图谱、区域分析、增长潜力、创新活力、重点企业、融资情况六个方面分析低空经济产业发展现状及未来潜力。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>无人机领域优势明显，成为低空经济的重要“推手”</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        在低空经济的众多产业链环节中，无人机领域无疑最受关注。根据启信宝数据显示，低空经济核心产业环节中，消费级无人机以2400家企业的数量位居榜首，工业无人机则以899家企业紧随其后。这一数据充分说明了无人机产业在低空经济中的主导地位和强劲发展势头。
      </Paragraph>
      <MuchBarChart xdata={lowAltitudeXdata} ydata1={ydata1} ydata2={ydata2} />
      <Paragraph style={{ textIndent: '2em' }}>
        无人机作为低空经济产品的总装集成环节，技术难度高、综合性强，要求制造商具备深厚的技术积累与强大的资源整合能力。整机制造商通过整合上游零部件与分系统资源，实现了无人机的整体设计与制造，推动了整个产业链的协同发展。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        应用方面，在个人消费、地理测绘、影视航拍等领域，无人机的应用已经相当成熟，而在应急救援、通信中继、气象探测等新的应用场景中，无人机也正在发挥着越来越重要的作用，成为低空经济的重要推手。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        以深圳为例，无人机外卖已经在龙岗、龙华、南山等区铺设了数十条固定航线，用户下单后最快约10分钟就能拿到货。而在海南，无人机公共货运物流跨海飞行的成功实现，更是将生鲜运输的时间由原先的十几个小时缩短到了不到3小时，极大地提升了物流效率和服务质量。这一降本增效的创新模式，为城市物流配送提供了新的解决方案。
      </Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国低空经济产业研究报告.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多低空经济行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 光伏电池产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>光伏电池产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        光伏电池能将太阳的光能直接转化为电能，是光伏发电系统中的核心器件。近年来，得益于我国鼓励发展新能源的优惠政策，光伏电池片产量增长势头良好。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        光伏电池产业链上游为原材料及设备，原材料包括光伏硅片、光伏银浆、光伏胶膜、钙钛矿、砷化镓、碲化镉、TCO玻璃等，设备包括涂布机、刻蚀机、薄膜沉积设备等；中游为光伏电池，可分为PERC电池、TOPCon电池、HJT/HIT电池、钙钛矿电池、BC电池；下游通过光伏组件，应用于光伏电站、光伏供热、光伏建筑一体化、光伏交通等。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        随着硅片企业建厂扩建，我国硅片产能逐步增长，光伏硅片产能逐渐向中国集中。中商产业研究院发布的《2024-2029年中国光伏行业趋势及调研分析报告》显示，到2023年底，国内名义硅片产能已达到1291.5GW，较2022年底的产能规模增加了577GW。中商产业研究院分析师预测，2024年中国光伏硅片名义产能将进一步增长至1600GW。
      </Paragraph>
      <BarChart xdata={pvxdata} ydata={pvydata} title='2021-2024年中国光伏硅片名义产能预测趋势图' yname='GW' />
      <Paragraph style={{ textIndent: '2em' }}>数据来源：中商产业研究院整理</Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国光伏电池产业链研究分析.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多光伏电池行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 新材料产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>新材料产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        新材料产业是国民经济发展的重要基础，加快发展新材料产业对推动技术创新，支撑产业升级，建设制造强国具有重要战略意义。近日，工业和信息化部等九部门发布《原材料工业数字化转型工作方案（2024-2026年）》，提出“到2026年，我国将建设1个新材料大数据中心，为行业高质量发展提供有力支撑”。未来受政策利好，新材料产业将快速发展，聚势成链。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>一、产业链</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        新材料产业链上游包括钢铁、有色金属、化工材料、建材、纺织材料等，中游新材料主要分为先进基础材料、关键战略材料和前沿新材料三大类，下游广泛应用于电子信息、新能源汽车、航天航空、石油化工、医疗器械、节能环保、建筑等行业。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>二、上游分析</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>1.钢铁</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        粗钢是指完成了冶炼全过程、未经塑性加工的钢，是以铁为主要元素、含碳量一般在2%以下、并含有其他元素的金属材料。2020年以来，我国在“双碳”背景下，粗钢产量整体呈现下降趋势。中商产业研究院发布的《2022-2027中国粗钢市场现状及未来发展趋势》显示，2023年我国粗钢产量达10.19亿吨。
      </Paragraph>
      <BarChart xdata={materialsxdata} ydata={materialsydata} title='2019-2024年中国粗钢产量统计情况' yname='亿吨' />
      <Paragraph style={{ textIndent: '2em' }}>数据来源：中商产业研究院数据库</Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国新材料产业链研究分析.doc')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多新材料行业资讯，请点击查看</Button>
      </Popconfirm>
      {/* 智能制造产业链 */}
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>智能制造产业链</span>
      </div>
      <Paragraph style={{ textIndent: '2em' }}>
        智能制造是基于新一代信息通信技术与先进制造技术深度融合，贯穿于设计、生产、管理、服务等制造活动的各个环节，具有自感知、自学习、自决策、自执行、自适应等功能的新型生产方式。智能制造是未来制造发展的必然趋势和主攻方向。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>一、产业链</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        智能制造产业链涵盖感知层、网络层、执行层、应用层。感知层主要包括MCU芯片、智能传感器、智能控制器、激光雷达、RFID、机器视觉等领域；网络层主要实现信息传输与处理，主要包括5G、云计算、大数据、工业物联网、人工智能、工业软件等技术领域和管理软件；执行层主要为智能制造终端集成产品，包括机器人、数控机床、3D打印、增材制造装备、先进激光加工装备、工业控制装备、智能检测装备、智能物流装备等；应用层主要是通过各种自动化生产线集成后形成的智能车间、智能工厂，在汽车、3C电子、医药制造等领域得到广泛应用。
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>二、感知层</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>1.MCU芯片</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>（1）MCU芯片市场规模</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        在“国产替代”“芯片短缺”背景下，国内相关企业加快MCU芯片的研发、制造和应用能力，逐步完成了中低端MCU领域的国产化，并持续向高端领域渗透，我国MCU行业市场竞争力逐步提升。中商产业研究院发布的《2023-2029中国MCU芯片市场现状研究分析与发展前景预测报告》显示，2023年中国MCU市场规模达531.2亿元，较上年增长8%。中商产业研究院分析师预测，2024年中国MCU市场规模将达到584.2亿元。
      </Paragraph>
      <BarChart xdata={aixdata} ydata={aiydata} title='2019-2024年中国MCU市场规模趋势预测图' yname='亿元' />
      <Paragraph style={{ textIndent: '2em' }}>数据来源：弗若斯特沙利文、中商产业研究院整理</Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        <Text strong>（2）MCU芯片竞争格局</Text>
      </Paragraph>
      <Paragraph style={{ textIndent: '2em' }}>
        目前，32位MCU技术壁垒较高，国内市场仍以海外厂商为主，意法半导体、恩智浦、英飞凌、瑞萨电子、微芯科技5家企业市场份额合计达到了69.50%。国内企业中，极海半导体、兆易创新、华大半导体市场份额分别为5.5%、4.8%和2.6%。
      </Paragraph>
      <Popconfirm
        title=''
        description='是否需要下载文档?'
        onConfirm={() => confirm('2024年中国智能制造产业链研究分析.docx')}
        okText='是'
        cancelText='否'
      >
        <Button style={{ marginBottom: 24 }}>更多智能制造行业资讯，请点击查看</Button>
      </Popconfirm>
    </div>
  )
}
