import { create } from 'zustand'
import type { UserModel } from '~/models'

interface UserState extends UserModel {
  isLoggedIn: boolean | undefined
  setName: (name: string) => void
  setLoggedIn: (isLoggedIn: boolean) => void
}

const useUser = create<UserState>()(
  (set) => ({
    name: '',
    username: '',
    isLoggedIn: undefined,
    setName: (name: string) => set(() => ({ name, isLoggedIn: true })),
    setLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
  })
)

export default useUser