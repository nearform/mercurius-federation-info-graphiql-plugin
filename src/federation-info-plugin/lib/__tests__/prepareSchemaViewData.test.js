import { buildSchema } from 'graphql'
import { fromNodes, prepareSchemaViewData } from '../prepareSchemaViewData'
describe('fromNodes', () => {
  const correct = { correct: true }
  it('Finds the correct items in nodes array', () => {
    const toCheck = [
      {
        itemsMap: {
          correct,
          incorrect: {}
        }
      },
      {
        itemsMap: {
          correct,
          incorrect: {}
        }
      }
    ]

    expect(fromNodes('correct', toCheck)).toEqual([correct, correct])
  })
})

describe('prepareSchemaViewData', () => {
  it('Returns empty object if schema or nodeViewData is undefined', () => {
    expect(prepareSchemaViewData(null)).toEqual({})
    expect(prepareSchemaViewData({}, null)).toEqual({})
    expect(prepareSchemaViewData(null, {})).toEqual({})
  })

  it('Returns correct result', () => {
    const nodeViewData = [
      {
        nodeName: 'node1',
        itemsMap: {
          User: {
            kind: 'OBJECT',
            nodeName: 'node1',
            name: 'User',
            itemsMap: {
              id: {
                nodeName: 'node1',
                isExternal: false
              }
            }
          }
        }
      },
      {
        nodeName: 'node2',
        itemsMap: {
          User: {
            isExtension: true,
            key: [{ value: 'id' }],
            nodeName: 'node2',
            name: 'User',
            kind: 'OBJECT',
            itemsMap: {
              id: {
                nodeName: 'node2',
                isExternal: true
              },
              node2Field: {
                nodeName: 'node2',
                isExternal: false
              }
            }
          },
          Node2Type: {
            isExtension: false,
            nodeName: 'node2',
            name: 'Node2Type',
            itemsMap: {
              id: {
                name: 'id',
                nodeName: 'node2'
              }
            }
          }
        }
      }
    ]

    const schema = buildSchema(
      `

        type User {
          id: ID
          node2Field: String
          _entities: String
        }
       
        type Node2Type {
          id: ID
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

    expect(prepareSchemaViewData(nodeViewData, schema)).toMatchSnapshot()
  })
})
