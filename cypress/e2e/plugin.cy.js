describe('plugin page', () => {
  it('navigates to plugin and has services displayed', () => {
    //handling this application error so tests run
    cy.on('uncaught:exception', (err, runnable) => {
      if(err.message.includes('SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED')){
         return false;
      }
      return true
  })
    //saving graphql request as an alias
    cy.intercept('graphql').as('graphql')
    cy.visit('/graphiql')
    cy.wait('@graphql')
    cy.get('[aria-label="Show Federation info explorer"]').click()
    cy.contains('Federation Info')
    cy.contains('Services')
    cy.contains('Welcome to GraphiQL')
  })
})
