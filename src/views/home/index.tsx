import React, { useEffect, useState } from 'react'
import { Layout, Menu, theme } from 'antd'
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

const { Header, Content } = Layout

enum PageKeys {
  Page1 = '1',
  Page2 = '2',
  Page3 = '3',
  Page4 = '4',
  Page5 = '5',
  Page6 = '6'
}

export default function LoginFC() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()
  const [current, setCurrent] = useState('1')
  const { getAreas } = useStore()

  useEffect(() => {
    getAreaData()
  }, [])
  const getAreaData = async () => {
    const data = await api.getAreaTree()
    getAreas(data)
  }

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const items = [
    { key: '1', label: '首页' },
    { key: '2', label: '企业' },
    { key: '3', label: '产业链' },
    { key: '4', label: '企业互动数据' },
    { key: '5', label: '产品流通数据' },
    { key: '6', label: '政策数据' }
  ]

  const contentMap = {
    [PageKeys.Page1]: <Home />,
    [PageKeys.Page2]: <Enterprise />,
    [PageKeys.Page3]: <Industry />,
    [PageKeys.Page4]: <div>页面 4 的内容</div>,
    [PageKeys.Page5]: <div>页面 5 的内容</div>,
    [PageKeys.Page6]: <Policy />
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
          <img src={Avatar} width={25} height={25} className={styles.avatarStyle} />
          <span className={styles.user}>米小宝</span>
          <span className={styles.logout}>退出</span>
        </span>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            minHeight: 742,
            padding: 24,
            borderRadius: borderRadiusLG
          }}
        >
          {contentMap[current as keyof typeof contentMap]}
        </div>
      </Content>
    </Layout>
  )
}
