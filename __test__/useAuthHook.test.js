import {testHook, act, cleanup} from 'react-testing-library'
import useAuth from 'hooks/useAuth'

afterEach(cleanup)

describe('useAuth hook', () => {
  test('initial value is false', () => {
    let userLoggedIn
    testHook(() => ({ userLoggedIn } = useAuth(false)))

    expect(userLoggedIn).toBe(false)
  })
})
