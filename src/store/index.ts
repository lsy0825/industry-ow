import { create } from 'zustand'

export const useStore = create<{
  token: string
  userInfo: any
  area: any
  areaNames: any
  industryOpts: any
  enterValue: string
  getEnterValue: (enterValue: string) => void
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: any) => void
  getAreas: (area: any) => void
  getAreaNames: (areaNames: any) => void
  getIndustruOpts: (industryOpts: any) => void
}>(set => ({
  token: '',
  userInfo: {},
  area: [],
  areaNames: {},
  industryOpts: {},
  enterValue: '',
  getEnterValue: enterValue => set({ enterValue }),
  updateToken: token => set({ token }),
  updateUserInfo: (userInfo: any) => set({ userInfo }),
  getAreas: area => set({ area }),
  getAreaNames: areaNames => set({ areaNames }),
  getIndustruOpts: industryOpts => set({ industryOpts })
}))
