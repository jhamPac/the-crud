import { useHook, cleanup } from 'react-hooks-testing-library'
import useAuth from 'hooks/useAuth'

afterEach(cleanup)

describe('useAuth hook', () => {
  test('initial value is false', () => {
    const { getCurrentValue } = useHook(() => useAuth(false))
    
    expect(userLoggedIn).toBe(false)
  })
})
