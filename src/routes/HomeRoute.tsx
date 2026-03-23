import { useEffect } from 'react'
import { Redirect } from 'wouter'
import { Effect as Fx } from 'effect'
import useUser from '~/infras/zustard.infra/users.zustard'
import { AuthUseCase, AuthUseCaseLive } from '~/usecases'

export default function HomeRoute() {
  const isLoggedIn = useUser((state) => state.isLoggedIn)
  const setName = useUser((state) => state.setName)
  const setLoggedIn = useUser((state) => state.setLoggedIn)

  useEffect(() => {
    Fx.gen(function* () {
      const auth = yield* AuthUseCase
      return yield* auth.restoreSession()
    })
      .pipe(Fx.provide(AuthUseCaseLive), Fx.runPromise)
      .then((data) => {
        if (data?.user) setName(data.user as string)
        else setLoggedIn(false)
      })
      .catch(() => setLoggedIn(false))
  }, [setName, setLoggedIn])

  if (isLoggedIn === undefined) return <>Loading</>

  return <Redirect to={isLoggedIn ? '/dashboard' : '/login'} />
}
