import React, { useEffect } from 'react'
import { Layout, theme, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'
import TabsFC from '@/components/Tabs'
const { Content, Sider } = Layout

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo } = useStore()
  const { pathname } = useLocation()
  // useEffect(() => {
  //   getUserInfo()
  // }, [])
  // const getUserInfo = async () => {
  //   const data = await api.getUserInfo()
  //   updateUserInfo(data)
  // }
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/home', '/403', '/404']
    if (!data?.menuPathList?.includes(pathname) && !staticPath?.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return (
    <div className={styles.wrapper}>
      <Outlet></Outlet>
    </div>
  )
}

export default App
