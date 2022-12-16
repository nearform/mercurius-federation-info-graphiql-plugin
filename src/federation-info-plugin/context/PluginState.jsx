import React, { createContext, useContext } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'

export const PluginStateContext = createContext()

const LOCAL_STORAGE_KEY = 'mercuriusFederetionInfoGraphiqlPluginState'

const isArrayOrReset = value => (Array.isArray(value) ? value : [])

const initialState = {
  openServices: [],
  openServiceTreeNodes: [],
  openSchemaTables: []
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

  const setSchemaTableOpen = tableId => {
    const existingOpenTables = isArrayOrReset(value.openSchemaTables)
    const existingOpenTablesSet = new Set([...existingOpenTables, tableId])

    setValue({ ...value, openSchemaTables: Array.from(existingOpenTablesSet) })
  }

  const setSchemaTableClosed = tableId => {
    const existingOpenTables = isArrayOrReset(value.openSchemaTables)
    const existingOpenTablesSet = new Set([...existingOpenTables, tableId])

    existingOpenTablesSet.delete(tableId)

    setValue({ ...value, openSchemaTables: Array.from(existingOpenTablesSet) })
  }

  // Manually set the values or use the initial state.
  // This avoids the case there is a previous, old, local state
  // that does not have some fields in it.
  const providerValue = {
    openServices: value.openServices || initialState.openServices,
    openServiceTreeNodes:
      value.openServiceTreeNodes || initialState.openServiceTreeNodes,
    openSchemaTables: value.openSchemaTables || initialState.openSchemaTables,
    setServiceOpen,
    setServiceClosed,
    setOpenServiceTreeNodes,
    setSchemaTableOpen,
    setSchemaTableClosed
  }

  return (
    <PluginStateContext.Provider value={providerValue}>
      {children}
    </PluginStateContext.Provider>
  )
}

export const usePluginState = () => useContext(PluginStateContext)
