import { useMemo } from 'react'
import { useTheme } from '@graphiql/react'

import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * The hook gets the theme from the GraphiQL hook.
 * This hook returns null when the system theme is selected.
 * In this case, it gets the value from the media query.
 */
const useGraphiqlTheme = () => {
  const isSystemThemeDark = useMediaQuery('(prefers-color-scheme: dark)')
  const { theme: graphiqlTheme } = useTheme()

  const theme = useMemo(() => {
    let mode
    if (graphiqlTheme) {
      // If defined, use GraphiQL theme
      mode = graphiqlTheme === 'dark' ? 'dark' : 'light'
    } else {
      // otherwise use system color scheme
      mode = isSystemThemeDark ? 'dark' : 'light'
    }
    return mode
  }, [graphiqlTheme, isSystemThemeDark])

  return theme
}

export default useGraphiqlTheme
