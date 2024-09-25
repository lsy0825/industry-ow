import axios from 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

declare module g {
  type Object<V = unknown> = Record<string | number, V>
  type Func = (...args: unknown[]) => unknown
  type Extend<A, B> = B & Omit<A, keyof B>

  /**
   * @description 通用的泛对象类型
   */
  type O<V = unknown> = g.Object<V>

  /**
   * @description 通用的函数类型
   */
  type F = g.Func

  /**
   * @description 从A中删除B中已定义的属性，再与其联合
   */
  type E<A, B> = g.Extend<A, B>
}
