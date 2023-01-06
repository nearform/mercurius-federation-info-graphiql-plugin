describe('plugin page', () => {
  it('navigates to plugin and has services displayed', () => {
    cy.visit('/graphiql')
    cy.resolve('React').wait(1000)
    cy.resolve('GraphiQL').wait(1000)
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
