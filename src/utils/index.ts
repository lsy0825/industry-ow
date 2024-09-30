/**
 * 工具函数封装
 */

// 格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-')
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString().replaceAll('/', '-')
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
    // fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
  return fmt
}

// 用户状态转换
export const formatState = (state: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

// 递归获取路由对象

export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) return result
    }
  }
  return ''
}

/**
 * 手机号加密
 * @example
 * 17611000011 => 176****0011
 */
export const formateMobile = (mobile?: number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params: any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

/**
 * get请求参数处理
 * @param query 参数
 */
export function queryToString(query: Record<string, any> = {}) {
  const encode = encodeURIComponent
  return Object.keys(query)
    .map(key => `${encode(key)}=${encode(query[key])}`)
    .join('&')
}

/**
 * 树形数据处理
 * @param tree 原数据
 */
export function addLabelToTree(tree: any, type: string) {
  return tree?.map((node: any) => ({
    ...node,
    title: node?.name,
    value: type === 'hasId' ? node?.id : node?.name,
    key: type === 'hasId' ? node?.id : node?.name,
    children: node?.children ? addLabelToTree(node?.children, type) : []
  }))
}

/**
 * 计算两端点之间的list数据
 *@param start 起始值
 * @param end 结束值
 * @returns 数组
 */
const numList = (start: number, end: number) => {
  const result = []
  for (let i = start + 1; i < end; i++) {
    result.push(i)
  }
  return result
}

/**
 * 改写起点，终点合并数组（菜单名称）
 * @param obj 重复次数
 * @returns 数组
 */
const getCompareList = (obj: any) => {
  const list = []
  const keys: any = Object.values(obj)
  let total = 0
  for (let i = 0; i < keys?.length; i++) {
    total += keys[i]
    list.push({
      start: i === 0 ? 0 : total - keys[i],
      end: total,
      span: keys[i]
    })
  }
  return list
}

/**
 * 合并表格
 * @param index 表格索引值
 * @param data 扁平化数据
 * @returns 对象
 */
export const mergeIdList = (index: number, data: any, sameId: string) => {
  // 计算重复次数
  const num = data
    ?.map((v: any) => v[sameId])
    ?.reduce((obj: any, key: number) => {
      if (key in obj) {
        obj[key]++
      } else {
        obj[key] = 1
      }
      return obj
    }, {})
  const indexList = getCompareList(num)
  for (let i = 0; i < indexList?.length; i++) {
    if (index === indexList[i]?.start) {
      return {
        rowSpan: indexList[i].span
      }
    }
    if (numList(indexList[i].start, indexList[i].end).includes(index)) {
      return {
        rowSpan: 0
      }
    }
  }
  return {}
}

/**
 * 扁平化菜单树
 * @param data 树形结构数据
 * @returns 数组
 */
export const flattenTree = (data: any[]) => {
  const obj: any[] = []
  data?.map((item: any) => {
    const { children, id, investedNum, ...params } = item
    if (children) {
      item.children?.forEach((it: any) => {
        obj.push({
          ...it,
          ...params
        })
      })
    } else {
      obj.push({ ...item })
    }
  })
  return obj
}

/**
 * 根据地区编码查找地区名称
 * @param obj 地区编码数据
 * @param val 需要匹配的地区编码
 * @returns 匹配的地区名称
 */
export const getName = (obj: Record<string, number>, val: number) => {
  const keys = Object.keys(obj)
  const key = keys.find(k => obj[k] === val)
  return key
}
