// enum TypeKind from GraphQL-JS repo: /src/type/introspection.ts
export const TYPE_KIND = {
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  INPUT_OBJECT: 'INPUT_OBJECT',
  LIST: 'LIST',
  NON_NULL: 'NON_NULL'
}

// introspectionTypes from GraphQL-JS repo: /src/type/introspection.ts
export const INTROSPECTION_TYPES = [
  '__Schema',
  '__Directive',
  '__DirectiveLocation',
  '__Type',
  '__Field',
  '__InputValue',
  '__EnumValue',
  '__TypeKind'
]

// specifiedScalarTypes from GraphQL-JS repo: /src/type/scalars.ts
export const SCALAR_TYPES = ['String', 'Int', 'Float', 'Boolean', 'ID']

// Observed from examples
export const GRAPH_QL_QUERY_NAMES = ['_entities', '_service']
export const GRAPH_QL_OBJECT_NAMES = ['_Service']
