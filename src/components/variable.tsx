import { Box, Paper } from "@mui/material"
import { useDrop } from "react-dnd";
import React from "react";

export const Variable = ({ variable }: any) => {

  const [val, setVal] = React.useState(variable.value);

  // eslint-disable-next-line
  const [collectedProps, dropRef] = useDrop({
      accept: 'something',
      drop: (item: any) => {
        console.log(item, 'item ma')
        setVal(item?.value)
      },
      collect: (monitor) => ({
          isOver: monitor
      })
  })

  return <Box
  id="variable.id"
  ref={dropRef}
  sx={{
    display: 'flex',
    '& > :not(style)': {
      m: 1,
      padding: 1
    },
  }}
>
  <Paper square elevation={3}>
    <div key={variable.id}>
      {variable.name}: {val}
    </div>
  </Paper>
</Box>
}