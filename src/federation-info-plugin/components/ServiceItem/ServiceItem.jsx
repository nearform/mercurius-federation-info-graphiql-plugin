import React from 'react'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import { Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import ExternalLabel from '../ExternalLabel/ExternalLabel'
import FieldInput from '../FieldInput/FieldInput'
import KeyLabel from '../KeyLabel/KeyLabel'
import ExtendsLabel from '../ExtendsLabel/ExtendsLabel'

const FieldFlexbox = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 0.5
    }}
  >
    {children}
  </Box>
)

const ServiceGraphqlField = ({ field }) => (
  <FieldFlexbox>
    {field.name}
    <FieldInput field={field} />
    <ExternalLabel field={field} />
  </FieldFlexbox>
)

const ServiceGraphqFieldTypeName = ({ type }) => (
  <FieldFlexbox>
    {type.name}
    <KeyLabel type={type} />
    <ExtendsLabel type={type} />
  </FieldFlexbox>
)

const ServiceItemTree = props => (
  <TreeItem {...props} sx={{ paddingTop: 0.5, paddingBottom: 0.5 }} />
)

const ServiceGraphqlType = ({ type, serviceName }) => {
  const itemValues = Object.values(type.itemsMap)
  return (
    <ServiceItemTree
      nodeId={`${serviceName}-${type.name}`}
      label={<ServiceGraphqFieldTypeName type={type} />}
    >
      {itemValues.map((field, index) => {
        const nodeId = `${serviceName}-${type.name}-${index}`
        return (
          <ServiceItemTree
            nodeId={nodeId}
            key={index}
            label={<ServiceGraphqlField field={field} />}
          >
            <ServiceItemTree
              nodeId={`${nodeId}-${field.typeString}`}
              label={field.typeString}
            />
          </ServiceItemTree>
        )
      })}
    </ServiceItemTree>
  )
}

const ServiceItem = ({ supportedItemsMap, serviceName, sx }) => {
  return (
    <TreeView
      defaultCollapseIcon={<RemoveCircleOutlineIcon />}
      defaultExpandIcon={<AddCircleOutlineIcon />}
      defaultEndIcon={<RadioButtonUncheckedIcon />}
      sx={sx}
    >
      {supportedItemsMap.map(type => (
        <ServiceGraphqlType
          key={type.name}
          type={type}
          serviceName={serviceName}
        />
      ))}
    </TreeView>
  )
}

export default ServiceItem
