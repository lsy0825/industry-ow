import { create } from 'zustand'
import { User } from '@/types/api'
import storage from '@/utils/storage'

export const useStore = create<{
  token: string
  userInfo: any
  collapsed: boolean
  isDark: boolean
  area: any
  industryOpts: any
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: any) => void
  getAreas: (area: any) => void
  getIndustruOpts: (industryOpts: any) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}>(set => ({
  token: '',
  userInfo: {},
  collapsed: false,
  area: [],
  industryOpts: {},
  isDark: storage.get('isDark') || false,
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
  updateUserInfo: (userInfo: any) => set({ userInfo }),
  getAreas: area => set({ area }),
  getIndustruOpts: industryOpts => set({ industryOpts }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
}))
