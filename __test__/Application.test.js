import React from 'react'
import { testHook, act, cleanup, render } from 'react-testing-library'
import Application from 'root/comps/Application'

afterEach(cleanup)

describe('Application component', () => {
  it('should render', () => {
    const { container } = render(<Application />)
    console.log(container.firstChild)
  })
})
