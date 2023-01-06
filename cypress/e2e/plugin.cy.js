describe('plugin page', () => {
  it('navigates to plugin and has services displayed', () => {
    cy.visit('/graphiql')
    cy.wait(2000)
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
