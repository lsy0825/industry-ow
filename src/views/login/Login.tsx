import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useStore } from '@/store'
export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/home'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
            label='用户名'
          >
            <Input />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]} label='密码'>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
