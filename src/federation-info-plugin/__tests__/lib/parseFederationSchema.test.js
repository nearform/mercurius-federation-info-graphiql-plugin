import parseFederationSchema from '../../lib/parseFederationSchema'

const blankNodeSchema = { __schema: { types: [] } }

describe('parseFederationSchema', () => {
  it('returns undefined if federationSchema.nodes is falsy', () => {
    const result = parseFederationSchema({ someText: 'text' })

    expect(result).toBeUndefined()
  })

  it('excludes nodes without a __schema', () => {
    const input = {
      nodes: {
        withSchema: blankNodeSchema,
        withOutSchema: {}
      }
    }

    const result = parseFederationSchema(input)

    expect(result).toEqual([expect.objectContaining({ name: 'withSchema' })])
  })

  it('returns nodes in alphabetical order', () => {
    const input = {
      nodes: {
        b: blankNodeSchema,
        c: blankNodeSchema,
        a: blankNodeSchema
      }
    }

    const expectation = [
      expect.objectContaining({ name: 'a' }),
      expect.objectContaining({ name: 'b' }),
      expect.objectContaining({ name: 'c' })
    ]

    const result = parseFederationSchema(input)

    expect(result).toEqual(expectation)
  })

  it('filters out built in GraphQL opbject types and queries by names', () => {
    const input = {
      nodes: {
        post: {
          __schema: {
            queryType: {
              name: 'Query'
            },
            mutationType: {
              name: 'Mutation'
            },
            types: [
              {
                kind: 'SCALAR',
                name: 'Boolean'
              },
              {
                kind: 'OBJECT',
                name: '__Schema'
              },
              {
                kind: 'ENUM',
                name: '__TypeKind'
              },
              {
                kind: 'OBJECT',
                name: 'Query',
                fields: [
                  {
                    name: 'topPosts',
                    type: {
                      name: 'String'
                    }
                  },
                  {
                    name: '_entities',
                    type: {
                      name: 'String'
                    }
                  },
                  {
                    name: '_service',
                    type: {
                      name: 'String'
                    }
                  }
                ]
              },
              {
                kind: 'OBJECT',
                name: 'User',
                fields: []
              },
              {
                kind: 'OBJECT',
                name: 'Post',
                fields: []
              }
            ]
          }
        }
      }
    }

    const expectation = [
      {
        name: 'post',
        schema: {
          entities: [
            {
              attributes: [],
              isExtension: false,
              key: undefined,
              name: 'Post'
            },
            { attributes: [], isExtension: false, key: undefined, name: 'User' }
          ],
          mutations: [],
          queries: [{ name: 'topPosts', returnType: 'String' }]
        }
      }
    ]

    const result = parseFederationSchema(input)

    expect(result).toEqual(expectation)
  })

  it('returns the queries for the node with their return types', () => {
    const input = {
      nodes: {
        post: {
          __schema: {
            queryType: {
              name: 'Query'
            },
            types: [
              {
                kind: 'OBJECT',
                name: 'Query',
                fields: [
                  {
                    name: 'topPosts',
                    type: {
                      kind: 'LIST',
                      name: null,
                      ofType: {
                        kind: 'OBJECT',
                        name: 'Post',
                        ofType: null
                      }
                    }
                  },
                  {
                    name: 'allPostsInYear',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: {
                        kind: 'LIST',
                        name: null,
                        ofType: {
                          kind: 'OBJECT',
                          name: 'Post',
                          ofType: null
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }

    const expectation = [
      {
        name: 'post',
        schema: {
          entities: [],
          mutations: [],
          queries: [
            { name: 'allPostsInYear', returnType: 'NON_NULL<LIST<Post>>' },
            { name: 'topPosts', returnType: 'LIST<Post>' }
          ]
        }
      }
    ]

    const result = parseFederationSchema(input)

    expect(result).toEqual(expectation)
  })

  it('returns the mutations for the node with their return types', () => {
    const input = {
      nodes: {
        post: {
          __schema: {
            mutationType: { name: 'Mutation' },
            types: [
              {
                kind: 'OBJECT',
                name: 'Mutation',
                fields: [
                  {
                    name: 'createPost',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: {
                        kind: 'INPUT_OBJECT',
                        name: 'PostInput',
                        ofType: null
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }

    const expectation = [
      {
        name: 'post',
        schema: {
          entities: [],
          mutations: [
            {
              name: 'createPost',
              returnType: 'NON_NULL<PostInput>'
            }
          ],
          queries: []
        }
      }
    ]

    const result = parseFederationSchema(input)

    expect(result).toEqual(expectation)
  })

  it('returns the entities for the node with their attributes with extends flags', () => {
    const input = {
      nodes: {
        post: {
          __schema: {
            types: [
              {
                kind: 'OBJECT',
                name: 'User',
                fields: [
                  {
                    name: 'id',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: {
                        kind: 'SCALAR',
                        name: 'ID',
                        ofType: null
                      }
                    },
                    isExternal: true
                  },
                  {
                    name: 'name',
                    description: null,
                    args: [],
                    type: {
                      kind: 'SCALAR',
                      name: 'String',
                      ofType: null
                    },
                    isExternal: true
                  },
                  {
                    name: 'posts',
                    description: null,
                    args: [],
                    type: {
                      kind: 'LIST',
                      name: null,
                      ofType: {
                        kind: 'OBJECT',
                        name: 'Post',
                        ofType: null
                      }
                    }
                  }
                ],
                isExtension: true
              },
              {
                kind: 'OBJECT',
                name: 'Post',
                fields: [
                  {
                    name: 'id',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: {
                        kind: 'SCALAR',
                        name: 'ID',
                        ofType: null
                      }
                    }
                  },
                  {
                    name: 'name',
                    description: null,
                    args: [],
                    type: {
                      kind: 'SCALAR',
                      name: 'String',
                      ofType: null
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }

    const expectation = [
      {
        name: 'post',
        schema: {
          entities: [
            {
              attributes: [
                { isExternal: false, name: 'id', type: 'NON_NULL<ID>' },
                { isExternal: false, name: 'name', type: 'String' }
              ],
              isExtension: false,
              key: undefined,
              name: 'Post'
            },
            {
              attributes: [
                { isExternal: true, name: 'id', type: 'NON_NULL<ID>' },
                { isExternal: true, name: 'name', type: 'String' },
                { isExternal: false, name: 'posts', type: 'LIST<Post>' }
              ],
              isExtension: true,
              key: undefined,
              name: 'User'
            }
          ],
          mutations: [],
          queries: []
        }
      }
    ]

    const result = parseFederationSchema(input)

    expect(result).toEqual(expectation)
  })
})
