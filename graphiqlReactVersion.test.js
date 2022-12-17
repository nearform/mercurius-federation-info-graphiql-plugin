import rootPackage from './package.json'

import graphiqlPackage from '@graphiql/react/package.json'
import testingLibraryPackage from '@testing-library/react/package.json'

import semverIntersects from 'semver/ranges/intersects'
function versionIntersect(actual, expected) {
  if (semverIntersects(actual, expected)) {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          actual
        )} to not be compatible with version ${this.utils.printExpected(
          expected
        )}`,
      pass: true
    }
  } else {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          actual
        )} to be compatible with version ${this.utils.printExpected(expected)}`,
      pass: false
    }
  }
}
expect.extend({
  versionIntersect
})

describe('External dependencies version check', () => {
  it('react version in graphiql', () => {
    expect(rootPackage?.devDependencies?.react).versionIntersect(
      graphiqlPackage?.devDependencies?.react
    )
  })

  it('react-dom version in graphiql', () => {
    expect(rootPackage?.devDependencies['react-dom']).versionIntersect(
      graphiqlPackage?.devDependencies['react-dom']
    )
  })

  it('react version in @testing-library/react', () => {
    expect(rootPackage?.devDependencies['react']).versionIntersect(
      testingLibraryPackage?.devDependencies['react']
    )
  })
})
