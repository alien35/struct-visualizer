import { Box, Paper } from "@mui/material"
import { useDrop } from "react-dnd";
import React from "react";

export const Variable = ({ variable, onRemove, onRequestEdit }: any) => {

  const [val, setVal] = React.useState(variable.value);

  React.useEffect(() => {
    setVal(variable.value);
  }, [variable]);

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
  <Paper style={{display: "flex"}} square elevation={3}>
    <div style={{color: "darkred", cursor: "pointer"}} onClick={onRemove}>X</div>&nbsp;
    <div onClick={onRequestEdit} key={variable.id}>
      {variable.name}: {val}
    </div>
  </Paper>
</Box>
}