import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  alpha
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'

import { usePluginState } from '../../context/PluginState'

/**
 * The component takes as input the same props of the [Material UI Accordion](https://mui.com/material-ui/api/accordion-summary/#props)
 *
 * @returns {JSX.Element}
 */
const StyledAccordionSummary = props => {
  const theme = useTheme()
  return (
    <AccordionSummary
      {...props}
      expandIcon={<ExpandCircleDownOutlinedIcon />}
      sx={{
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper': {
          paddingX: 1,
          transform: 'rotate(270deg)'
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          color: 'primary.main',
          transform: 'rotate(360deg)'
        },
        '& h3': {
          fontWeight: 'normal'
        },
        '&.Mui-expanded h3': {
          fontWeight: 'bold'
        },
        '&.Mui-expanded': {
          backgroundColor: alpha(theme.palette.primary.main, 0.05)
        }
      }}
    />
  )
}

/**
 * @param {String} props.id the ID of the table
 * @param {String} props.name the name of the table displayed in the accordion
 * @param {Array} props.fields the list of data to display in the table
 * @param {boolean} props.nested `true` if it is a nested table, `false` otherwise (default)
 * @param {boolean} props.showReference show the "Referenced by" column if it is `true`
 * @param {Function} props.headerRender function to render the header's components
 * @param {Function} props.rowRender function to render the row's components
 *
 * @returns {JSX.Element}
 */
const SchemaOperationTable = ({
  id,
  name,
  fields,
  nested = false,
  showReference,
  headerRender,
  rowRender
}) => {
  const theme = useTheme()
  const { openSchemaTables, setSchemaTableOpen, setSchemaTableClosed } =
    usePluginState()

  if (!fields || fields?.length === 0) {
    return null
  }

  const accordionId = id || name
  const isExpanded = openSchemaTables.includes(accordionId)

  const handleAccordionChange = (event, expanded) => {
    expanded
      ? setSchemaTableOpen(accordionId)
      : setSchemaTableClosed(accordionId)
  }

  return (
    <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
      {name && (
        <StyledAccordionSummary>
          <h3 style={{ margin: 0 }}>{name}</h3>
        </StyledAccordionSummary>
      )}
      <AccordionDetails sx={{ ...(nested ? { paddingY: 0 } : { padding: 0 }) }}>
        <Table>
          <TableHead
            sx={{
              textTransform: 'uppercase',
              backgroundColor: alpha(theme.palette.primary.main, 0.1)
            }}
          >
            <TableRow>{headerRender({ showReference })}</TableRow>
          </TableHead>

          <TableBody>
            {fields.map(field => rowRender({ field, showReference }))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default SchemaOperationTable
