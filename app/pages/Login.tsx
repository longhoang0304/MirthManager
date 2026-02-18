import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { login } from "~/usecases/login"
import useUser from "~/stores/users"
import { TextInput } from "~/elements"

interface ILoginProps {
  onLogin: (password: string) => void
  onRegister: () => void
  error: Error | null
}

export const Login: React.FC<ILoginProps> = ({ onLogin, onRegister, error }) => {
  const [password, setPassword] = useState("")
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-100 w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Mirth Manager Login
            </h1>
            <div className="space-y-4">
              <TextInput
                type="password"
                placeholder="Mirth manager password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => onLogin(password)}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={onRegister}
              >
                Register
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const setName = useUser((state) => state.setName)
  const [error, setError] = useState<Error | null>(null)
  const handleOnLogin = useCallback(async (password: string) => {
    setError(null)

    if (!password) {
      setError(new Error("Passwords cannot be empty!"))
      return
    }

    try {
      const data = await login(password)
      setName(data.user ?? "")
      navigate("/dashboard")
    } catch (e: any) {
      setError(e)
    }

  }, [navigate, setName])

  return <Login
    onLogin={handleOnLogin}
    onRegister={() => navigate("/register")}
    error={error}
  />
}