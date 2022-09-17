import { Box, Button, Divider, Grid, Paper, TextField } from '@mui/material';
import React from "react";
import { styled } from '@mui/material/styles';
import KeyValuePair from "./KeyValuePair";
import StateContext from '../contexts/StateContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

function KeyValueStore() {

  const state = React.useContext(StateContext);

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

  const sleep = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    })
  }

  const checkNeedsNewPair = async () => {
    await sleep();
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

  React.useEffect(() => {
    checkNeedsNewPair();
  }, [inputs]);

  const setValue = (e: any, which: string) => {
    setInputs({
      ...inputs,
      [which]: {
        key: inputs[which].key,
        value: e.target.value
      }
    })
  }

  if (!state.settings.keyValueStore) {
    return null;
  }
  
  return (
    <Item>
      <h4>Key-value store</h4>
      <div style={{marginTop: 16}}>
        {
          Object.keys(inputs).map((each: string) => (
            <KeyValuePair inputs={inputs} each={each} setKey={setKey} setValue={setValue} />
          ))
        }
      </div>
    </Item>
  )
}

export default KeyValueStore;