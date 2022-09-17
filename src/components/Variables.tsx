import { Box, Button, Divider, Paper, TextField } from '@mui/material';
import React from 'react';
import StateContext from '../contexts/StateContext';
import { Variable } from './variable';

function Variables() {

  const state = React.useContext(StateContext);

  const [creatingVariable, setCreatingVariable] = React.useState(false);
  const [variableName, setVariableName] = React.useState("");
  const [variables, setVariables] = React.useState<any>([]);
  const [defaultVariableValue, setDefaultVariableValue] = React.useState("");
  const onChangeVariableName = (e: any) => {
    setVariableName(e.target.value);
  }

  const applyCreateVariable = () => {
    setVariables([...variables, {
      name: variableName,
      value: defaultVariableValue,
      id: new Date().toISOString()
    }])
    setVariableName("");
    setCreatingVariable(false);
  }

  const onChangeDefaultVariableValue = (e: any) => {
    setDefaultVariableValue(e.target.value);
  }

  if (!state.settings.variables) {
    return null;
  }

  return (
    <>
      <h4>Variables</h4>
      <br />
      {
        variables.map((variable: any) => (
          <Variable variable={variable} />
        ))
      }
      {
        !creatingVariable && (
          <Button onClick={() => setCreatingVariable(true)} size="small" variant="outlined">Create variable</Button>
        )
      }
      {
        creatingVariable && (
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 204,
                height: 164,
                padding: 1
              },
            }}
          >
            <Paper square elevation={3}>
              <h4>Create Variable</h4>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={variableName} onChange={onChangeVariableName} id="standard-basic" label="Variable name" variant="standard" />
              </div>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={defaultVariableValue} onChange={onChangeDefaultVariableValue} id="standard-basic" label="Default value" variant="standard" />
              </div>
              <Button onClick={() => setCreatingVariable(false)} size="small" variant="outlined">Cancel</Button>
              <Button onClick={applyCreateVariable} size="small" variant="contained">Create</Button>
            </Paper>
          </Box>
        )
      }
      <br />
      <br />
      <Divider />
    </>
  )

}

export default Variables;
