// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
}
export namespace Login {
  export interface params {
    username: string
    password: string
  }
}
