import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Home from '@/views/home'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Layout from '@/layout'

export const router = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default createBrowserRouter(router)
