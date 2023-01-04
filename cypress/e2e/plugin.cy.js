import graphqlFixture from './../fixtures/graphql'
import federationSchemaFixture from './../fixtures/federation-schema'

describe('plugin page', () => {
  // TODO: Extract this into a reusable utils function
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3001/graphql', req => {
      req.reply({
        status: 200,
        body: graphqlFixture
      })
    })

    cy.intercept('GET', 'http://localhost:3001/federation-schema', req => {
      req.reply({
        status: 200,
        body: federationSchemaFixture
      })
    })
  })

  it('navigates to plugin and has services displayed', () => {
    cy.visit('http://localhost:5173')
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
