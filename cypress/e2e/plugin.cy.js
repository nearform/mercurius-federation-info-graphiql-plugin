describe('plugin page', () => {
  it('navigates to plugin and has services displayed', () => {
    cy.intercept('graphql').as('graphql')
    cy.visit('/graphiql')
    cy.wait('@graphql')
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
