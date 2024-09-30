import request from '@/utils/request'
import { Login } from '@/types/api'
import { EnterpriseDetailParams, EnterpriseParams, PolicyParams, SearchResultParams } from '@/views/home/type'
export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/system/auth/login', params, { showLoading: false })
  },
  // 获取企业基本信息
  getEnterpriseInfo(params: EnterpriseParams) {
    return request.get('/open/Information/page', params)
  },
  // 获取企业详情
  getEnterpriseDetail(params: EnterpriseDetailParams) {
    return request.get('/open/Information/get', params)
  },
  // 获取地区树
  getAreaTree() {
    return request.get('/open/tree')
  },
  // 通过企业id查询企业产业链信息
  getAreaInfo(params: EnterpriseDetailParams) {
    return request.get('/open/Industrial-chain-information/getByFirmId', params)
  },
  // 通过省、市、区区域编号查询企业产业链信息
  getByAreaCode() {
    return request.get('/open/Industrial-chain-information/getByAreaCode')
  },
  // 获取用户信息
  getUserInfo(params: any) {
    return request.get('/system/user/get', params)
  },
  // 获得企业模块下企业状态和资质类别字典
  getStatusAndQualify() {
    return request.get('/open/Enterprise-status-company-qualification/get')
  },
  // 获得产业的选择字典
  getIndustryOpts() {
    return request.get('/open/Industry_drop_down/get')
  },
  // 获得政策数据模块下政策级别、申报类型、政策类型、支持对象、支持行为、支持方式的选择字典
  getPolicyDic() {
    return request.get('/open/Policy-data-dic/get')
  },
  // 获得热点词字典
  getHotWord() {
    return request.get('/open/Hot-words/get')
  },
  // 首页搜索功能
  getSearchResult(params: SearchResultParams) {
    return request.get('/open/Search', params)
  },
  // 获得政策数据信息分页
  getPolicyData(params: PolicyParams) {
    return request.get('/open/Policy-data/get', params)
  },
  // 获得 地区名称：地区编码 字典
  getAreaName() {
    return request.get('/open/AreaName-to-areaCode/get')
  }
}
