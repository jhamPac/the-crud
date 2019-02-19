import { act, cleanup, testHook } from 'react-testing-library'
import useAuth from 'hooks/useAuth'

afterEach(cleanup)

describe('useAuth hook', () => {
  test('initial value is false', () => {
    let userLoggedIn

    testHook(() => {
      userLoggedIn = useAuth({ defaultValue: false })
    })

    expect(userLoggedIn).toBe(false)
  })
})
