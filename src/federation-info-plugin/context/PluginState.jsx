import React, { createContext, useContext } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'

export const PluginStateContext = createContext()

const LOCAL_STORAGE_KEY = 'mercuriusFederetionInfoGraphiqlPluginState'

const isArrayOrReset = value => (Array.isArray(value) ? value : [])

export const PluginStateProvider = ({ children }) => {
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_KEY, {
    openServices: [],
    openServiceTreeNodes: []
  })

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

  const providerValue = {
    ...value,
    setServiceOpen,
    setServiceClosed,
    setOpenServiceTreeNodes
  }

  return (
    <PluginStateContext.Provider value={providerValue}>
      {children}
    </PluginStateContext.Provider>
  )
}

export const usePluginState = () => useContext(PluginStateContext)
