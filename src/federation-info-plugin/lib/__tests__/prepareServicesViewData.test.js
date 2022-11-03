import { IGNORED_FIELDS } from '../constants'
import { buildSchema, introspectionFromSchema } from 'graphql'
import {
  indexServiceFields,
  prepareServicesViewData
} from '../prepareServicesViewData'

const fieldsFromNames = names =>
  names.map(name => ({
    name,
    type: {
      name: 'String'
    }
  }))

describe('indexServiceFields', () => {
  it('returns indexed fields', () => {
    const fields = fieldsFromNames([...IGNORED_FIELDS, 'test'])

    expect(indexServiceFields(fields, 'dummyService')).toEqual({
      test: {
        name: 'test',
        type: { name: 'String' },
        serviceName: 'dummyService',
        typeString: 'String'
      }
    })
  })
})

describe('prepareServicesViewData', () => {
  it('Checks correct result', () => {
    const testService = introspectionFromSchema(
      buildSchema(
        `
          type Query {
            test(customInput: CustomInput): CustomType
          }

          type CustomType {
            id: ID
            name: String
          }

          input CustomInput {
            names: [String]!
          }
          
          type _Entity {
            name: String
          }

          enum TestEnum {
            one
            two
            three
          }
        `
      )
    )
    const servicesResult = { services: { testService } }
    expect(prepareServicesViewData(servicesResult)).toMatchSnapshot()

    // Potential replacements for snapshot test
    // Object.keys(itemsMap) equals ['Query', 'CustomType', 'CustomInput', 'TestEnum']

    // itemsMap.Query.itemsMap.test

    // itemsMap.CustomInput.itemsMap.names
    // itemsMap.CustomInput.itemsMap.names.typeString": "[String]!"
  })
})
