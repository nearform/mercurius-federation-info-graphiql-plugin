import React from 'react'

export const fieldArgsToValue = args =>
  args
    ? args.map(({ type, name }) => `${name}: ${type.toString()}`).join(', ')
    : ''

export const fieldTypeToValue = type => type.toString()

export const fieldOwnerServicesToValue = ownerServices =>
  ownerServices.join(',')

export const fieldReferencedByToValue = referencedBy => referencedBy.join(',')

export const typeOwnerServicesToValue = ownerServices => ownerServices.join(',')

export const typeReferencedByToValue = referencedBy =>
  referencedBy
    .map(({ serviceName, key }) => `${serviceName} @key(${key[0].value})`)
    .join(<br />)
