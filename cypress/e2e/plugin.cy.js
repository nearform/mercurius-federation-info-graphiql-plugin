import 'cypress-network-idle'

describe('plugin page', () => {
  it('navigates to plugin and has services displayed', () => {
    cy.visit('/graphiql')
    cy.waitForNetworkIdle('GET', 'https://unpkg.com/*', 1000)
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
