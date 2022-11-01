import { IGNORED_FIELDS } from '../constants'
import { buildSchema, introspectionFromSchema } from 'graphql'
import { indexNodeFields, prepareNodesViewData } from '../prepareNodesViewData'

const fieldsFromNames = names =>
  names.map(name => ({
    name,
    type: {
      name: 'String'
    }
  }))

describe('indexNodeFields', () => {
  it('returns indexed fields', () => {
    const fields = fieldsFromNames([...IGNORED_FIELDS, 'test'])

    expect(indexNodeFields(fields, 'dummyNode')).toEqual({
      test: {
        name: 'test',
        type: { name: 'String' },
        nodeName: 'dummyNode',
        typeString: 'String'
      }
    })
  })
})

describe('prepareNodesViewData', () => {
  it('Checks correct result', () => {
    const testNode = introspectionFromSchema(
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
    const nodesResult = { nodes: { testNode } }
    expect(prepareNodesViewData(nodesResult)).toMatchSnapshot()

    // Potential replacments for snapshot test
    // Object.keys(itemsMap) equals ['Query', 'CustomType', 'CustomInput', 'TestEnum']

    // itemsMap.Query.itemsMap.test

    // itemsMap.CustomInput.itemsMap.names
    // itemsMap.CustomInput.itemsMap.names.typeString": "[String]!"
  })
})
