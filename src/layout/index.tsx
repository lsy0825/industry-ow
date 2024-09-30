import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'
import storage from '@/utils/storage'

const App: React.FC = () => {
  const { updateUserInfo } = useStore()
  const token = storage.get('token')
  const { pathname } = useLocation()
  // 获取用户名信息
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data: any = await api.getUserInfo({ id: token?.userId })
    updateUserInfo(data)
  }
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/home', '/403', '/404']
    if (!staticPath?.includes(pathname)) {
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
