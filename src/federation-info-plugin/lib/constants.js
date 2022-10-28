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
// could use import { introspectionTypes } from 'graphql'
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

// https://github.com/mercurius-js/mercurius/blob/57ff23ab97c8dec1b2f6fa0f6d0439b22cdb9377/lib/federation.js#L46 //_Any and _FieldSet
// https://github.com/mercurius-js/mercurius/blob/57ff23ab97c8dec1b2f6fa0f6d0439b22cdb9377/lib/federation.js#L174 //_Entity
// https://github.com/mercurius-js/mercurius/blob/57ff23ab97c8dec1b2f6fa0f6d0439b22cdb9377/lib/federation.js#L56 // _Service
export const BASE_FEDERATION_SCALARS = [
  '_Any',
  '_FieldSet',
  '_Entity',
  '_Service'
]

//rollup needs upgrading to support spread it seems
export const IGNORED_TYPES = INTROSPECTION_TYPES.concat(
  BASE_FEDERATION_SCALARS
).concat(SCALAR_TYPES)

export const IGNORED_FIELDS = [...GRAPH_QL_QUERY_NAMES]
