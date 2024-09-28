import request from '@/utils/request'
import { Dashboard, Dept, Login, Menu, ResultData, User } from '@/types/api'
export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/system/auth/login', params, { showLoading: false })
  },
  // 获取企业基本信息
  getEnterpriseInfo(params: any) {
    return request.get('/open/Information/page', params)
  },
  // 获取企业详情
  getEnterpriseDetail(params: any) {
    return request.get('/open/Information/get', params)
  },
  // 获取地区树
  getAreaTree() {
    return request.get('/open/tree')
  },
  // 通过企业id查询企业产业链信息
  getAreaInfo(params: any) {
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
  getSearchResult(params: any) {
    return request.get('/open/Search', params)
  },
  // 获得政策数据信息分页
  getPolicyData(params: any) {
    return request.get('/open/Policy-data/get', params)
  },
  // 获得 地区名称：地区编码 字典
  getAreaName() {
    return request.get('/open/AreaName-to-areaCode/get')
  },

  // 获取权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  // 获取城市分布数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  // 获取年龄分布数据
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取折线图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },
  // 获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  // 创建用户
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },
  // 部门管理
  // 部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  // 获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 修改部门
  eidtDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  // 创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  // 编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  // 删除菜单
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  }
}
