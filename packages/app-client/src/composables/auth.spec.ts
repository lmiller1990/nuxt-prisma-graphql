import { Auth0Client } from '@auth0/auth0-spa-js'
import { useAuth } from './auth'

jest.mock('../environ.ts')

const mockClient: Partial<Auth0Client> = {
  loginWithRedirect: jest.fn(),
  getUser: jest.fn(() => ({} as any))
}

jest.mock(
  "@auth0/auth0-spa-js",
  () => (): Promise<Partial<Auth0Client>> => {
      return Promise.resolve(mockClient)
    }
)

describe('useAuth', () => {
  it('logs in', async () => {
    const auth = useAuth()
    await auth.login()
    expect(mockClient.loginWithRedirect).toHaveBeenCalled()
  })
})