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
  const [isEditing, setIsEditing] = React.useState(false);
  const [variableEditId, setVariableEditId] = React.useState("");
  const onChangeVariableName = (e: any) => {
    setVariableName(e.target.value);
  }

  const applyCreateVariable = () => {
    if (isEditing) {
      setVariables(variables.map((variable: any) => {
        if (variable.id !== variableEditId) {
          return variable
        }
        return {
          ...variable,
          name: variableName,
          value: defaultVariableValue
        }
      }))
    } else {
      setVariables([...variables.filter((variable: any) => variable.id !== variableEditId), {
        name: variableName,
        value: defaultVariableValue,
        id: new Date().toISOString()
      }])
    }
    
    setVariableEditId("");
    setVariableName("");
    setDefaultVariableValue("");
    setCreatingVariable(false);
  }

  const onChangeDefaultVariableValue = (e: any) => {
    setDefaultVariableValue(e.target.value);
  }

  const clearVariable = (id: string) => {
    setVariables(variables.filter((variable: any) => variable.id !== id));
  }

  const onCancel = () => {
    setCreatingVariable(false);
    setVariableName("");
    setDefaultVariableValue("");
    setIsEditing(false);
  }

  const onRequestEdit = (variable: any) => {
    setIsEditing(true);
    setCreatingVariable(true);
    setVariableName(variable.name);
    setDefaultVariableValue(variable.value);
    setVariableEditId(variable.id);
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
          <Variable
            onRequestEdit={() => onRequestEdit(variable)}
            onRemove={() => clearVariable(variable.id)} variable={variable} />
        ))
      }
      {
        !creatingVariable && (
          <button onClick={() => setCreatingVariable(true)}>{isEditing ? "Edit" : "Create"} variable</button>
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
              <h4>{isEditing ? "Edit" : "Create"} Variable</h4>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={variableName} onChange={onChangeVariableName} id="standard-basic" label="Variable name" variant="standard" />
              </div>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={defaultVariableValue} onChange={onChangeDefaultVariableValue} id="standard-basic" label="Default value" variant="standard" />
              </div>
              <Button onClick={onCancel} size="small" variant="outlined">Cancel</Button>
              <Button onClick={applyCreateVariable} size="small" variant="contained">{isEditing ? "Edit" : "Create"}</Button>
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
