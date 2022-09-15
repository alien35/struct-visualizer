import { Box, Button, Divider, Grid, Paper, TextField } from '@mui/material';
import React from "react";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

function KeyValueStore() {

  const [keyVals, setKeyVals] = React.useState([]);

  const [inputs, setInputs] = React.useState<any>({
    start: {
      key: "",
      value: ""
    }
  });

  const setKey = (e: any, which: string) => {
    setInputs({
      ...inputs,
      [which]: {
        key: e.target.value,
        value: inputs[which].value
      }
    })
  }

  const checkNeedsNewPair = () => {
    const keys = Object.keys(inputs)
    console.log(inputs, 'inputs')
    for (let i = 0; i < keys.length; i ++) {
      if (!inputs[keys[i]].key && !inputs[keys[i]].value) {
        return;
      }
    }
    console.log("DONE MATCH")
    setInputs({
      ...inputs,
      [new Date().toISOString()]: {
        key: "",
        value: ""
      }
    })
  }

  const setValue = (e: any, which: string) => {
    setInputs({
      ...inputs,
      [which]: {
        key: inputs[which].key,
        value: e.target.value
      }
    })
    checkNeedsNewPair();
  }

  return (
    <Item>
      <h4>Key-value store</h4>
      <div style={{marginTop: 16}}>
        {
          Object.keys(inputs).map((each: string) => (
            <Grid container>
              <Grid xs={2} md={6}>
                <TextField value={inputs[each].key} onChange={(v) => setKey(v, each)} id="outlined-basic" label="Key" variant="outlined" />
              </Grid>
              <Grid xs={2} md={6}>
                <TextField value={inputs[each].value} onChange={(v) => setValue(v, each)} id="outlined-basic" label="Value" variant="outlined" />
              </Grid>
            </Grid>
          ))
        }
      </div>
      
    </Item>
  )
}

export default KeyValueStore;