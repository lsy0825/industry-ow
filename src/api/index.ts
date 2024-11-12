import request from '@/utils/request'
import { Login } from '@/types/api'
import {
  EnterpriseDetailParams,
  EnterpriseParams,
  PolicyParams,
  SearchResultParams,
  PatentParams
} from '@/views/home/type'
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
  },
  //获得企业专利信息分页
  getPatentList(params: PatentParams) {
    return request.get('/open/Patent-information/get', params)
  },
  // 获得首页动态数据统计信息
  getDataDynamics() {
    return request.get('/open/Main-data-dynamics/get')
  },
  // 获得所有产业链图表
  getAllIndustrialChain() {
    return request.get('/open/IndustrialChain-picture/getAll')
  },
  //通过企业id查询财务数据和研发投入数据,按日期升序
  getFinancial(params: { firmId: number }) {
    return request.get('/open/Financial-information/getByFirmId', params)
  },
  //通过企业id查询企业交易数据，按企业数降序
  getTransactionData(params: { firmId: number }) {
    return request.get('/open/Enterprise-transaction-data/getByFirmId', params)
  },
  //通过企业id查询产品流通信息，按日期升序
  getProductionData(params: { firmId: number }) {
    return request.get('/open/Product-Circulation-Information/getByFirmId', params)
  },
  // 获得产业链左侧导航信息
  getChainNav() {
    return request.get('/open/Chain-details-navigation/get')
  },
  //通过产业链导航关键字获取内容
  getChainInfo(params: { chainNav: string }) {
    return request.get('/open/Chain-Details-Information/getByNavKey', params)
  },
  // 白皮书下载文件流
  getDownloadFile(fileName: string) {
    return request.getDownloadFile(`/open/Download?fileName=${fileName}`, fileName)
  },
  //通过企业id获得分页的推荐相关政策
  getPolicyInfo(params: PatentParams) {
    return request.get('/open/Recommended-Policy/getByFirmId', params)
  },
  //通过企业id查询企业交易数据，按企业数降序
  getProvinceFirm(params: { firmId: number }) {
    return request.get('/open/Enterprise-transaction-data/getByFirmId', params)
  },
  //获取企业资质分布的企业数,默认为企业数量降序
  getFirmQualification() {
    return request.get('/open/Firm-Qualification/get')
  },
  //获取等级企业分布统计,默认为企业数量降序
  getFirmLevel() {
    return request.get('/open/Firm-Level/get')
  },
  //分页获取地区分布的企业数统计，粒度：省（直辖市）,默认为企业数量降序
  getProvinceData() {
    return request.get('/open/Province-Firm-Sum/get')
  },
  //获取年限企业分布统计,默认为企业数量降序
  getYearsData() {
    return request.get('/open/Firm-Years/get')
  },
  //获取注册金额企业分布统计,默认为企业数量降序
  getRegisterData() {
    return request.get('/open/Firm-Register-Money/get')
  },
  //分页获取专利数排行, 按专利数逆序
  getPatentSort() {
    return request.get('/open/Patent-Sum-Sort/get')
  },
  //分页获取企业潜力排行, 按国际级>国家级>省级>市级排序
  getPotentialSort() {
    return request.get('/open/Information-Potential-Sort/get')
  },
  //分页获取专利评分排行, 按专利平分总数逆序
  getRateSort() {
    return request.get('/open/Patent-Rate-Sort/get')
  },
  //分页获取产业链相关政策
  getIndustrialPolicy(params: { industrialChain: string }) {
    return request.get('/open/Industrial-Chain-Policy/get', params)
  },
  //对某个产业链在国内的区域分组的企业数量进行排行, 按企业数量逆序
  getIndustrialArea(params: { industrialChain: string }) {
    return request.get('/open/IndustrialChain-Area-Firm-Sort/get', params)
  }
}
