import React from 'react'
import { act, cleanup, render } from 'react-testing-library'
import Application from 'root/comps/Application'

afterEach(cleanup)

describe('Application component', () => {
  it('should render', () => {
    const { container, getByText } = render(<Application />)
    const loginButton = getByText(/Login/i)

    expect(container.firstChild.id).toBe('UI')
    expect(loginButton).toBeInTheDocument()
  })
})
