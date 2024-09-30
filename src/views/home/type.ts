export interface HomeProps {
  setCurrent: (v: string) => void
}

export interface ListProps {
  dataList: any
  searchValue?: any
  setSearchValue?: any
  title: string
}

export interface DataType {
  id: string
  province: string
  city: string
  investedNum: number
}

export type RespProps = {
  list?: any[]
  total: number
}

export type FirmAndQuaDict = {
  companyQualification: string[]
  enterpriseStatus: string[]
}

export type IsOpenProps = {
  type: boolean
  record: Record<string, any>
}

export type PolicyDict = {
  policyLevel: string[]
  policyDeclarationType: string[]
  policyType: string[]
  supportObject: string[]
  supportBehavior: string[]
  supportMethod: string[]
}

export interface OptionsProps {
  title: string
  value: string | number
  key: string | number
  children: OptionsProps[]
}

export type PreOptionsProps = {
  id: string | number
  name: string
  children: PreOptionsProps[]
}

export type SearchResultProps = {
  informationRespOpenVOList: any[]
  policyDataRespVOList: any[]
}

export type DetailProps = {
  isModalOpen: any
}

export interface EnterpriseParams {
  pageNo: number
  pageSize: number
  registeredOfficeIdList?: number[]
  industryClassTextList?: string
  annualIncomeStart?: number
  annualIncomeEnd?: number
  dateEstablishmentStart?: any
  dateEstablishmentEnd?: any
  statusText?: string
  qualificationsTextList?: string[]
}

export type EnterpriseDetailParams = {
  id: number
}

export type SearchResultParams = {
  keywords: string
}

export interface PolicyParams {
  pageNo: number
  pageSize: number
  policyLevelText?: string
  declarationTypeText?: string
  policyTypeTextList?: string[]
  supportObjectTextList?: string[]
  supportBehaviorTextList?: string[]
  supportMethodTextList?: string[]
  industryTypeTextList?: string[]
  areaIdList?: number[]
}
