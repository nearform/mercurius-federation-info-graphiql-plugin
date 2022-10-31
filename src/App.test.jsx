import React from 'react'
import { createGraphiQLFetcher } from '@graphiql/toolkit'
import { render } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'
jest.mock('@graphiql/toolkit')

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

//TODO: Write some more visual tests
test('Render the Graphiql component', async () => {
  createGraphiQLFetcher.mockReturnValue(() => {})
  const { getByTestId } = render(<App />, {
    container
  })

  await act(async () => {
    expect(getByTestId('graphiql-container')).toBeInTheDocument()
    expect(getByTestId('plugin-icon')).toBeInTheDocument()
    expect(createGraphiQLFetcher).toHaveBeenCalledWith({
      url: 'http://localhost:3001/graphql'
    })
  })
})
