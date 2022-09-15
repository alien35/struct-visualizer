import { Grid, TextField } from '@mui/material';
import React from "react";
import { useDrop } from "react-dnd";

function Key({ inputs, setKey, each}: any) {

  const [collectedProps, dropRef] = useDrop({
      accept: 'something',
      drop: (item: any) => {
        setKey({target: {value: item.value}}, each);
      },
      collect: (monitor) => ({
          isOver: monitor
      })
  })

  return (
    <Grid ref={dropRef} xs={2} md={6}>
      <TextField value={inputs[each].key} onChange={(v) => setKey(v, each)} id="outlined-basic" label="Key" variant="outlined" />
    </Grid>
  )
}

export default Key;