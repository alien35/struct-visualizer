import { Grid, TextField } from '@mui/material';
import React from "react";
import { useDrop } from "react-dnd";

function Value({ inputs, setValue, each}: any) {

  const [collectedProps, dropRef] = useDrop({
      accept: 'something',
      drop: (item: any) => {
        console.log(item.value, 'valueueee')
        setValue({target: {value: item.value}}, each);
      },
      collect: (monitor) => ({
          isOver: monitor
      })
  })

  return (
    <Grid ref={dropRef} xs={2} md={6}>
      <TextField value={inputs[each].value} onChange={(v) => setValue(v, each)} id="outlined-basic" label="Value" variant="outlined" />
    </Grid>
  )
}

export default Value;