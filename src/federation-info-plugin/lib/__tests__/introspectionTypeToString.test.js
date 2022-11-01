import introspectionTypeToString from '../introspectionTypeToString'
import { TypeKind } from 'graphql'

describe('introspectionTypeToString', () => {
  it('Returns name if name is specified', () => {
    expect(introspectionTypeToString({ name: 'Test' })).toBe('Test')
  })

  it('Returns wrapped in [] if list', () => {
    expect(
      introspectionTypeToString({
        kind: TypeKind.LIST,
        ofType: { name: 'Test' }
      })
    ).toBe('[Test]')
  })

  it('Returns ! suffix if kind NON_NULL', () => {
    expect(
      introspectionTypeToString({
        kind: TypeKind.NON_NULL,
        ofType: { name: 'Test' }
      })
    ).toBe('Test!')
  })

  it('Returns Kind if not a list or name', () => {
    expect(introspectionTypeToString({ kind: 'Test' })).toBe('Test')
  })

  it('Returns Kind<ofType>', () => {
    expect(
      introspectionTypeToString({ kind: 'Test', ofType: { name: 'Inner' } })
    ).toBe('Test<Inner>')
  })
})
