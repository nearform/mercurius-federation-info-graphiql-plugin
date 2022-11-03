import { buildSchema } from 'graphql'
import { fromServices, prepareSchemaViewData } from '../prepareSchemaViewData'
describe('fromServices', () => {
  const correct = { correct: true }
  it('Finds the correct items in services array', () => {
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

    expect(fromServices('correct', toCheck)).toEqual([correct, correct])
  })
})

describe('prepareSchemaViewData', () => {
  it('Returns empty object if schema or serviceViewData is undefined', () => {
    expect(prepareSchemaViewData(null)).toEqual({})
    expect(prepareSchemaViewData({}, null)).toEqual({})
    expect(prepareSchemaViewData(null, {})).toEqual({})
  })

  it('Returns correct result', () => {
    const serviceViewData = [
      {
        serviceName: 'service1',
        itemsMap: {
          User: {
            kind: 'OBJECT',
            serviceName: 'service1',
            name: 'User',
            itemsMap: {
              id: {
                serviceName: 'service1',
                isExternal: false
              }
            }
          }
        }
      },
      {
        serviceName: 'service2',
        itemsMap: {
          User: {
            isExtension: true,
            key: [{ value: 'id' }],
            serviceName: 'service2',
            name: 'User',
            kind: 'OBJECT',
            itemsMap: {
              id: {
                serviceName: 'service2',
                isExternal: true
              },
              service2Field: {
                serviceName: 'service2',
                isExternal: false
              }
            }
          },
          Service2Type: {
            isExtension: false,
            serviceName: 'service2',
            name: 'Service2Type',
            itemsMap: {
              id: {
                name: 'id',
                serviceName: 'service2'
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
          service2Field: String
          _entities: String
        }
       
        type Service2Type {
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

    expect(prepareSchemaViewData(serviceViewData, schema)).toMatchSnapshot()
  })
})
