import { testHook, act, cleanup } from 'react-testing-library'
import useAuth from 'hooks/useAuth'

afterEach(cleanup)

describe('useAuth hook', () => {
  test('initial value is false', () => {
    const userLoggedIn = false

    expect(userLoggedIn).toBe(false)
  })
})
