import { create } from 'zustand'

interface UserState {
  name: string
  isLoggedIn: boolean | undefined
  setName: (name: string) => void
  setLoggedIn: (isLoggedIn: boolean) => void
}

const useUser = create<UserState>()(
  (set) => ({
    name: '',
    isLoggedIn: undefined,
    setName: (name: string) => set(() => ({ name, isLoggedIn: true })),
    setLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
  })
)

export default useUser