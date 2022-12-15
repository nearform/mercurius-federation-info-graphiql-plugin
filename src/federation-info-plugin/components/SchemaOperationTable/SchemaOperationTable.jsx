import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  alpha
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'
import { accordionSummaryClasses } from '@mui/material/AccordionSummary'

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
        '& h3': {
          fontWeight: 'normal'
        },
        [`&.${accordionSummaryClasses.expanded}`]: {
          backgroundColor: theme.status.expanded
        },
        [`&.${accordionSummaryClasses.expanded} h3`]: {
          fontWeight: 'bold'
        },
        [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
          paddingX: 1,
          transform: 'rotate(270deg)'
        },
        [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
          {
            color: 'primary.main',
            transform: 'rotate(360deg)'
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
 * @param {JSX.Element} props.header the table header component
 * @param {Function} props.rowRender function to render the row's components
 *
 * @returns {JSX.Element}
 */
const SchemaOperationTable = ({
  id,
  name,
  fields,
  nested = false,
  header,
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
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead
              sx={{
                textTransform: 'uppercase',
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }}
            >
              <TableRow>{header}</TableRow>
            </TableHead>

            <TableBody>
              {fields.map((field, index) => rowRender({ field, index }))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}

export default SchemaOperationTable
