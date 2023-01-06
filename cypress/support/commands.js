Cypress.Commands.add('resolve', (name, options = {}) => {
  const getValue = () => {
    const win = cy.state('window')
    return win[name]
  }
  const resolveValue = () => {
    return Cypress.Promise.try(getValue).then(value => {
      return cy.verifyUpcomingAssertions(value, options, {
        onRetry: resolveValue
      })
    })
  }

  return resolveValue()
})
