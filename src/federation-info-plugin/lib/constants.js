// introspectionTypes from GraphQL-JS repo: /src/type/introspection.ts
import { introspectionTypes, specifiedScalarTypes } from 'graphql'
export const INTROSPECTION_TYPES = introspectionTypes.map(({ name }) => name)

// specifiedScalarTypes from GraphQL-JS repo: /src/type/scalars.ts
export const SCALAR_TYPES = specifiedScalarTypes.map(({ name }) => name)

// Observed from examples
export const IGNORED_FIELDS = ['_entities', '_service']

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
export const IGNORED_TYPES = [
  ...INTROSPECTION_TYPES,
  ...BASE_FEDERATION_SCALARS,
  ...SCALAR_TYPES
]
