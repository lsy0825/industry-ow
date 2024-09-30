import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import router from './router'
import AntdGlobal from './utils/AntdGlobal'
import './App.less'
import locale from 'antd/es/locale/zh_CN'

function App() {
  return (
    <ConfigProvider locale={locale}>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
