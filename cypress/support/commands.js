Cypress.Commands.add('getByAriaLabel', ariaLabel =>
  cy.get(`[aria-label]="${ariaLabel}"`)
)
