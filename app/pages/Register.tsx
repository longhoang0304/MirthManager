import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { register } from "~/usecases/register"
import { TextInput } from "~/elements"

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
          <div className="card card-border rounded-3xl p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Mirth Manager Register
            </h1>
            <div className="space-y-4">
              <TextInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm text-warning text-center font-medium">
                Please remember your password and keep it safe, password is non-recoverable.
              </p>
              <button
                className="btn btn-primary w-full"
                onClick={() => onRegister(name, password)}
              >
                Register
              </button>
            </div>
            <div className="pt-2">
              <p className="text-sm text-error text-center font-medium">
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