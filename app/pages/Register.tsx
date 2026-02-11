import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { register } from "~/usecases/register"

interface IRegisterProps {
  onRegister: (name: string, password: string) => void
}

export const Register: React.FC<IRegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[400px] w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Mirth Manager Register
            </h1>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm text-amber-600 dark:text-amber-500 text-center font-medium">
                Please remember your password and keep it safe, password is non-recoverable.
              </p>
              <button
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => onRegister(name, password)}
              >
                Register
              </button>
            </div>
            <div className="pt-2">
              <p className="text-sm text-red-600 dark:text-red-500 text-center font-medium">
                By registering, you will accept that all of the previous data will be wiped and cannot be recovered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const handleOnRegister = useCallback(async (name: string, password: string) => {
    await register(name, password)
    navigate("/")
  }, [navigate])

  return <Register onRegister={handleOnRegister} />
}