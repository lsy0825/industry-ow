export interface HomeProps {
  setCurrent: (v: string) => void
}

export interface ListProps {
  dataList: any
  searchValue?: any
  setSearchValue?: any
  title: string
}
