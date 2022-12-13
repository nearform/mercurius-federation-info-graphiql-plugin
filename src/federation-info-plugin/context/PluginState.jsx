import React, { createContext, useContext, useEffect } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'

export const PluginStateContext = createContext()

const LOCAL_STORAGE_KEY = 'mercuriusFederetionInfoGraphiqlPluginState'

const isArrayOrReset = value => (Array.isArray(value) ? value : [])

const initialState = {
  openServices: [],
  openServiceTreeNodes: [],
  openSchemas: []
}

export const PluginStateProvider = ({ children }) => {
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_KEY, initialState)

  const setServiceOpen = serviceName => {
    const existingOpenServices = isArrayOrReset(value.openServices)
    const existingOpenServicesSet = new Set([
      ...existingOpenServices,
      serviceName
    ])

    setValue({
      ...value,
      openServices: Array.from(existingOpenServicesSet)
    })
  }

  const setServiceClosed = serviceName => {
    const existingOpenServices = isArrayOrReset(value.openServices)
    const existingOpenServicesSet = new Set([
      ...existingOpenServices,
      serviceName
    ])

    existingOpenServicesSet.delete(serviceName)

    setValue({
      ...value,
      openServices: Array.from(existingOpenServicesSet)
    })
  }

  const setOpenServiceTreeNodes = nodeIds => {
    setValue({
      ...value,
      openServiceTreeNodes: nodeIds
    })
  }

  const setSchemaOpen = schemaId => {
    const existingOpenSchemas = isArrayOrReset(value.openSchemas)
    const existingOpenSchemasSet = new Set([...existingOpenSchemas, schemaId])

    setValue({ ...value, openSchemas: Array.from(existingOpenSchemasSet) })
  }

  const setSchemaClosed = schemaId => {
    const existingOpenSchemas = isArrayOrReset(value.openSchemas)
    const existingOpenSchemasSet = new Set([...existingOpenSchemas, schemaId])

    existingOpenSchemasSet.delete(schemaId)

    setValue({ ...value, openSchemas: Array.from(existingOpenSchemasSet) })
  }

  // Manually set the values or use the initial state.
  // This avoids the case there is a previous, old, local state
  // that does not have some fields in it.
  const providerValue = {
    openServices: value.openServices || initialState.openServices,
    openServiceTreeNodes:
      value.openServiceTreeNodes || initialState.openServiceTreeNodes,
    openSchemas: value.openSchemas || initialState.openSchemas,
    setServiceOpen,
    setServiceClosed,
    setOpenServiceTreeNodes,
    setSchemaOpen,
    setSchemaClosed
  }

  return (
    <PluginStateContext.Provider value={providerValue}>
      {children}
    </PluginStateContext.Provider>
  )
}

export const usePluginState = () => useContext(PluginStateContext)
