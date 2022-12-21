import React, { createContext, useContext } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'

export const PluginStateContext = createContext()

const LOCAL_STORAGE_PREFIX = 'mercuriusFederetionInfoGraphiqlPluginState'

const isArrayOrReset = value => (Array.isArray(value) ? value : [])

const initialState = {
  openServices: [],
  openServiceTreeNodes: [],
  openSchemaTables: [],
  searchServicesQuery: ''
}

export const PluginStateProvider = ({ children }) => {
  const [openServices, persistServiceOpen] = useLocalStorage(
    `${LOCAL_STORAGE_PREFIX}:openServices`,
    initialState.openServices
  )
  const [openServiceTreeNodes, persistOpenServiceTreeNodes] = useLocalStorage(
    `${LOCAL_STORAGE_PREFIX}:openServiceTreeNodes`,
    initialState.openServiceTreeNodes
  )
  const [searchServicesQuery, persistServicesSearchQuery] = useLocalStorage(
    `${LOCAL_STORAGE_PREFIX}:searchServicesQuery`,
    initialState.searchServicesQuery
  )
  const [openSchemaTables, persistSchemaTableOpen] = useLocalStorage(
    `${LOCAL_STORAGE_PREFIX}:openSchemaTables`,
    initialState.openSchemaTables
  )

  const setServiceOpen = serviceName => {
    const existingOpenServices = isArrayOrReset(openServices)

    const existingOpenServicesSet = new Set([
      ...existingOpenServices,
      serviceName
    ])

    persistServiceOpen(Array.from(existingOpenServicesSet))
  }

  const setServiceClosed = serviceName => {
    const existingOpenServices = isArrayOrReset(openServices)
    const existingOpenServicesSet = new Set([
      ...existingOpenServices,
      serviceName
    ])

    existingOpenServicesSet.delete(serviceName)
    persistServiceOpen(Array.from(existingOpenServicesSet))
  }

  const setTreeOpenState = ({ openServices, openServiceTreeNodes }) => {
    persistServiceOpen(openServices)
    persistOpenServiceTreeNodes(openServiceTreeNodes)
  }

  const setOpenServiceTreeNodes = nodeIds => {
    persistOpenServiceTreeNodes(nodeIds)
  }

  const setSchemaTableOpen = tableId => {
    const existingOpenTables = isArrayOrReset(openSchemaTables)
    const existingOpenTablesSet = new Set([...existingOpenTables, tableId])

    persistSchemaTableOpen(Array.from(existingOpenTablesSet))
  }

  const setSchemaTableClosed = tableId => {
    const existingOpenTables = isArrayOrReset(openSchemaTables)
    const existingOpenTablesSet = new Set([...existingOpenTables, tableId])

    existingOpenTablesSet.delete(tableId)

    persistSchemaTableOpen(Array.from(existingOpenTablesSet))
  }

  const setServicesSearchQuery = query => {
    persistServicesSearchQuery(query)
  }

  // Manually set the values or use the initial state.
  // This avoids the case there is a previous, old, local state
  // that does not have some fields in it.
  const providerValue = {
    openServices,
    openServiceTreeNodes,
    openSchemaTables,
    searchServicesQuery,
    setServiceOpen,
    setServiceClosed,
    setTreeOpenState,
    setOpenServiceTreeNodes,
    setSchemaTableOpen,
    setSchemaTableClosed,
    setServicesSearchQuery
  }

  return (
    <PluginStateContext.Provider value={providerValue}>
      {children}
    </PluginStateContext.Provider>
  )
}

export const usePluginState = () => useContext(PluginStateContext)
