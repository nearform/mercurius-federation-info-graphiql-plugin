Cypress.Commands.add('resolve', (name, options = {}) => {
  const getValue = () => {
    const win = cy.state('window')
    console.log(' win[name]', win[name])
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
