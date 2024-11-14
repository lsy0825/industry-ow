import { useEffect, useState } from 'react'
import { Button, Layout, Menu, theme } from 'antd'
import styles from './index.module.less'
import Logo from '@/assets/logo.gif'
import Avatar from '@/assets/avatar.svg'
import type { MenuProps } from 'antd'
import Home from './components/home'
import Enterprise from './components/enterprise'
import Industry from './components/industry'
import Policy from './components/policy'
import api from '@/api'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import SearchResult from './components/searchResult'
import FirmDetail from './components/detail'
import IndustryDetail from './components/industryDetail'
import Infomation from './components/infomation'
import WhitePaper from './components/whitePaper'
import IndustryAnalyse from './fullDimension/industryAnalyse'
import AreaEco from './fullDimension/areaEco'
import ProductMarket from './fullDimension/productMarket'
import FirmCompete from './fullDimension/firmCompete'

const { Header, Content } = Layout

enum PageKeys {
  Page1 = '1',
  Page2 = '2',
  Page3 = '3',
  Page4 = '4',
  Page5 = '5',
  Page6 = '6',
  Page7 = '7',
  Page8 = '8',
  Page9 = 'info',
  Page10 = 'industry',
  Page11 = 'areaEco',
  Page12 = 'product',
  Page13 = 'firmCompete',
  Page14 = '9'
}

const items = [
  { key: '1', label: '平台概况' },
  {
    key: 'data',
    label: '数据',
    children: [
      { label: '企业', key: '2' },
      { label: '产业链', key: '3' },
      { label: '政策', key: '6' },
      { label: '产品', key: '9' }
    ]
  },
  {
    key: 'dimension',
    label: '全维智链分析',
    children: [
      { label: '产业链全景与多维分析', key: 'industry' },
      { label: '区域经济动态与资源整合', key: 'areaEco' },
      { label: '产品市场竞争与供应链流向', key: 'product' },
      { label: '企业竞争力与上下游协同', key: 'firmCompete' }
    ]
  },
  { key: '4', label: '分析工具' },
  { key: '5', label: '研究报告与白皮书' },
  { key: 'info', label: '政策与咨讯' },
  { key: '7', label: '', disabled: true }, //产业链详情页
  { key: '8', label: '', disabled: true } //企业详情页
]

export default function LoginFC() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()
  const [current, setCurrent] = useState<string>('1')
  const { getAreas, userInfo, getIndustruOpts, getAreaNames, rowFirm, rowIndustry } = useStore()

  useEffect(() => {
    getAreaData()
    getIndustryData()
    getAreaList()
  }, [])
  const getAreaData = async () => {
    const data = await api.getAreaTree()
    getAreas(data)
  }

  const getIndustryData = async () => {
    const data = await api.getIndustryOpts()
    getIndustruOpts(data)
  }

  const getAreaList = async () => {
    const data = await api.getAreaName()
    getAreaNames(data)
  }

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
  }

  const contentMap = {
    [PageKeys.Page1]: <Home setCurrent={setCurrent} />,
    [PageKeys.Page2]: <Enterprise setCurrent={setCurrent} />,
    [PageKeys.Page3]: <Industry setCurrent={setCurrent} />,
    [PageKeys.Page4]: <div>敬请期待...</div>,
    [PageKeys.Page5]: <WhitePaper />,
    [PageKeys.Page6]: <Policy />,
    [PageKeys.Page7]: <IndustryDetail record={rowIndustry} setCurrent={setCurrent} />,
    [PageKeys.Page8]: <FirmDetail record={rowFirm} setCurrent={setCurrent} />,
    [PageKeys.Page9]: <Infomation />,
    [PageKeys.Page10]: <IndustryAnalyse />,
    [PageKeys.Page11]: <AreaEco />,
    [PageKeys.Page12]: <ProductMarket />,
    [PageKeys.Page13]: <FirmCompete />,
    [PageKeys.Page14]: <Enterprise setCurrent={setCurrent} />
  }

  const onClickMenu = () => {
    storage.remove('token')
    location.href = '/login?callback=' + encodeURIComponent(location.href)
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#fff' }}>
        <img src={Logo} width={170} height={50} />
        <span className={styles.title}>产业链供应链数据平台</span>
        <Menu
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClick}
          selectedKeys={[current]}
        />
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {/* <img src={Avatar} width={25} height={25} className={styles.avatarStyle} /> */}
          <Button type='text' onClick={onClickMenu}>
            <span>{userInfo?.nickname}</span>【退出】
          </Button>
          <span className={styles.user}>互动反馈</span>
          <span>中英文</span>
        </span>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            // minHeight: 742,
            padding: '24px 0',
            borderRadius: borderRadiusLG
          }}
        >
          {contentMap[current as keyof typeof contentMap]}
        </div>
      </Content>
    </Layout>
  )
}
