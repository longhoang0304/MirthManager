import React, { useCallback, useState } from 'react'
import { useLocation } from 'wouter'
import { Effect as Fx } from 'effect'
import { AuthUseCase, AuthUseCaseLive } from '~/usecases'
import useUser from '~/stores/users.store'
import { TextInput } from '~/elements'

interface ILoginProps {
  onLogin: (password: string) => void
  onRegister: () => void
  error: Error | null
}

export const Login: React.FC<ILoginProps> = ({
  onLogin,
  onRegister,
  error,
}) => {
  const [password, setPassword] = useState('')
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <div className="w-full max-w-100 space-y-6 px-4">
          <div className="card card-border space-y-6 rounded-3xl p-6">
            <h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
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
                className="btn btn-primary w-full"
                onClick={() => onLogin(password)}
              >
                Login
              </button>
              <button className="btn btn-ghost w-full" onClick={onRegister}>
                Register
              </button>
            </div>
            {error && (
              <p className="text-error text-center text-sm">{error.message}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export const LoginPage: React.FC = () => {
  const [, navigate] = useLocation()
  const setName = useUser((state) => state.setName)
  const [error, setError] = useState<Error | null>(null)
  const handleOnLogin = useCallback(
    async (password: string) => {
      setError(null)

      if (!password) {
        setError(new Error('Passwords cannot be empty!'))
        return
      }

      try {
        const data = await Fx.gen(function* () {
          const auth = yield* AuthUseCase
          return yield* auth.login(password)
        }).pipe(
          Fx.provide(AuthUseCaseLive),
          Fx.runPromise,
        )
        setName((data.user as string) ?? '')
        navigate('/dashboard')
      } catch (e: any) {
        setError(e)
      }
    },
    [navigate, setName]
  )

  return (
    <Login
      onLogin={handleOnLogin}
      onRegister={() => navigate('/register')}
      error={error}
    />
  )
}
