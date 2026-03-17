import { create } from 'zustand'

interface UserState {
  name: string
  isLoggedIn: boolean
  setName: (name: string) => void
}

const useUser = create<UserState>()(
  (set) => ({
    name: '',
    isLoggedIn: false,
    setName: (name: string) => set(() => ({ name, isLoggedIn: true })),
  })
)

export default useUser