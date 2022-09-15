import { Grid, TextField } from '@mui/material';
import React from "react";
import { useDrop } from "react-dnd";
import Key from './Key';
import Value from './Value';

function KeyValuePair({ inputs, setKey, setValue, each}: any) {

  return (
    <Grid container>
      <Key inputs={inputs} setKey={setKey} each={each} />
      <Value inputs={inputs} setValue={setValue} each={each} />
    </Grid>
  )
}

export default KeyValuePair;