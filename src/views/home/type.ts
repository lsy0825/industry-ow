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
