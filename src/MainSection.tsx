import { Box, Button, Divider, Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Variable } from './components/variable';
import { SumAllValuesBetween } from './components/sumAllValuesBetween';
import { styled } from '@mui/material/styles';
import KeyValueStore from './components/KeyValueStore';

const VisualArray = (props: any) => {
  console.log(props, 'rpos')
  return props.value.map((each: any, index: number) => {
    let color = "initial";
    if (props.iIndex !== index && props.jIndex === index) {
      color = "lightblue";
    }
    if (props.iIndex === index) {
      color = "lightgreen";
    }
    console.log(color, 'color')
    return <span onClick={() => props.onClick(index)} style={{background: color, fontSize: "32px", fontWeight: "600"}} className="each-array-integer">{each}</span>
  })
}

function MainSection() {

  const [input, setInput] = React.useState("");
  const [selectedIterator, setSelectedIterator] = React.useState("i");
  const [iIndex, setIIndex] = React.useState(0);
  const [jIndex, setJIndex] = React.useState(0);
  const [mode, setMode] = React.useState("for-loop");
  const [modifiedInput, setModifiedInput] = React.useState("");
  const [addingLoop, setAddingLoop] = React.useState(false);
  const [addingInnerLoop, setAddingInnerLoop] = React.useState(false);
  const [iIteratorName, setIIteratorName] = React.useState("i");
  const [jIteratorName, setJIteratorName] = React.useState("j");
  const [hasIIterator, setHasIIterator] = React.useState(false);
  const [hasJIterator, setHasJIterator] = React.useState(false);
  const [creatingVariable, setCreatingVariable] = React.useState(false);
  const [variableName, setVariableName] = React.useState("");
  const [variables, setVariables] = React.useState<any>([]);
  const [defaultVariableValue, setDefaultVariableValue] = React.useState("");
  const [clearingSumRef, setClearingSumRef] = React.useState(false);

  const hasValidInput = (): boolean => {
    if (!modifiedInput.length) {
      return false;
    }
    try {
      if (Array.isArray(JSON.parse(modifiedInput))) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  }

  const getSumOfAllValuesInBetween = () => {
    if (!modifiedInput) {
      return "";
    }
    try {
      return JSON.parse(modifiedInput).slice(iIndex, jIndex + 1).reduce((sum: number, each: number) => sum + each, 0);
    } catch (err) {
      return "";
    }
  }

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "something",
      item: { value: getSumOfAllValuesInBetween() },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  const onProceedIterator = () => {
    if (selectedIterator === "i") {
      const newVal = iIndex + 1;
      setIIndex(() => newVal);
      return;
    }
    setJIndex(() => jIndex +1);
  }

  const onRegressIterator = () => {
    if (selectedIterator === "i") {
      setIIndex(() => iIndex -1);
      return;
    }
    setJIndex(() => jIndex -1);
  }

  const triggerSwap = () => {
    const data = JSON.parse(modifiedInput);
    const temp = data[iIndex];
    data[iIndex] = data[jIndex];
    data[jIndex] = temp;
    setModifiedInput(JSON.stringify(data));
  }

  const triggerSort = () => {
    let data = JSON.parse(modifiedInput);
    data = data.sort((a: any, b: any) => a - b);
    setModifiedInput(JSON.stringify(data));
  }

  const updateInput = (val: string) => {
    setInput(val);
    setModifiedInput(val);
  }

  const onReset = () => {
    setJIndex(0);
    setIIndex(0);
  }

  const onBreak = () => {
    if (selectedIterator === "i") {
      onReset();
      return;
    }
    setJIndex(iIndex);
  }

  const onChangeVariableName = (e: any) => {
    setVariableName(e.target.value);
  }

  const onChangeIIteratorName = (e: any) => {
    setIIteratorName(e.target.value);
  }

  const onChangeJIteratorName = (e: any) => {
    setJIteratorName(e.target.value);
  }

  const applyIIterator = () => {
    setHasIIterator(true);
    setAddingLoop(false);
  }

  const applyJIterator = () => {
    setHasJIterator(true);
    setAddingInnerLoop(false);
  }

  const onRemoveLoop = () => {
    setHasIIterator(false);
    setHasJIterator(false);
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

  const onSelectFromOutput = (v: number) => {
    if (selectedIterator === "i") {
      setIIndex(v);
    } else {
      setJIndex(v);
    }
  }

  React.useEffect(() => {
    setClearingSumRef(true);
    setTimeout(() => {
      setClearingSumRef(false);
    }, 50)
  }, [iIndex, jIndex, modifiedInput])

  const onKeyDown = (e: any) => {
    console.log(e, 'eee')
  }
  
  React.useEffect(() => {
    window.addEventListener('keydown', (i) => {
      const key = i.key.toLowerCase();
      if (key !== "i" && key !== "j") {
        return;
      }
      setSelectedIterator(key);
    });

    return () => {
      // window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [])

  return (
    <div style={{margin: "16px"}}>
      <div>
        <div>
          <label htmlFor="input">Input</label>
      <div>
        <textarea value={input} onChange={(e) => updateInput(e.target.value)} id="input" />
      </div>
      {
        hasValidInput() && (
          <VisualArray onClick={onSelectFromOutput} iIndex={iIndex} jIndex={jIndex} value={JSON.parse(modifiedInput)} />
        )
      }
      <br />
      <br />
      <Divider />
      <br />
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
      <br />
      {
        !addingLoop && !hasIIterator && (
          <Button onClick={() => applyIIterator()} size="small" variant="outlined">Add Primary Iterator</Button>
        )
      }
      {
        !addingLoop && hasIIterator && (
          <Button onClick={onRemoveLoop} size="small" variant="outlined">Remove Primary Iterator</Button>
        )
      }
      &nbsp;
      {
        hasIIterator && !hasJIterator && (
          <Button onClick={() => applyJIterator()} size="small" variant="outlined">Add Secondary Iterator</Button>
        )
      }
      {
        !addingInnerLoop && hasJIterator && (
          <Button onClick={() => setHasJIterator(false)} size="small" variant="outlined">Remove Secondary Iterator</Button>
        )
      }
      {
        addingLoop && (
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 204,
                height: 126,
                padding: 1
              },
            }}
          >
            <Paper square elevation={3}>
              <h4>Add Iterator</h4>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={iIteratorName} onChange={onChangeIIteratorName} id="standard-basic" label="Iterator name" variant="standard" />
              </div>
              <Button onClick={() => setAddingLoop(false)} size="small" variant="outlined">Cancel</Button>
              <Button onClick={applyIIterator} size="small" variant="contained">Apply</Button>
            </Paper>
          </Box>
        )
      }
      {
        addingInnerLoop && (
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 204,
                height: 126,
                padding: 1
              },
            }}
          >
            <Paper square elevation={3}>
              <h4>Add Second Iterator</h4>
              <div style={{display: "flex", alignItems: "baseline", marginBottom: "8px"}}>
                <TextField value={jIteratorName} onChange={onChangeJIteratorName} id="standard-basic" label="Iterator name" variant="standard" />
              </div>
              <Button onClick={() => setAddingInnerLoop(false)} size="small" variant="outlined">Cancel</Button>
              <Button onClick={applyJIterator} size="small" variant="contained">Apply</Button>
            </Paper>
          </Box>
        )
      }
      <br />
      <br />
      {
        (hasIIterator || hasJIterator) && (
          <h4>Select iterator</h4>
        )
      }
      {
        hasIIterator && (
          <Button variant="outlined" style={{background: selectedIterator === "i" ? "lightgreen" : "initial"}} onClick={() => setSelectedIterator("i")}>i</Button>
        )
      }
      {
        hasJIterator && (
          <>
            &nbsp;
            <Button variant="outlined" style={{background: selectedIterator === "j" ? "lightgreen" : "initial"}} onClick={() => setSelectedIterator("j")}>j</Button>
          </>
        )
      }
      {
        (hasIIterator || hasJIterator) && (
          <>
            <br />
            <br />
            <Button variant="outlined" onClick={onProceedIterator}>{selectedIterator} ++</Button>
            <Button variant="outlined" onClick={onRegressIterator}>{selectedIterator} --</Button>
            {
              selectedIterator === "j" && (
                <Button variant="outlined" onClick={onBreak}>Break</Button>
              )
            }
          </>
        )
      }
      
      {
        hasIIterator && hasJIterator && (
          <>
            <br />
            <br />
            <h4>Mutations</h4>
            <Button variant="outlined" onClick={triggerSwap}>Swap {iIteratorName} and {jIteratorName}</Button>
            <br />
            <Button variant="outlined" onClick={triggerSort}>Sort</Button>
            <br />
            <br />
            <h3>Queries</h3>
            <br />
            {
              !clearingSumRef && (
                <SumAllValuesBetween iIteratorName={iIteratorName} jIteratorName={jIteratorName} value={getSumOfAllValuesInBetween()} />
              )
            }
          </>
        )
      }

      <br />
      <br />
      <Button variant="outlined" onClick={onReset}>Reset</Button>
        </div>
      </div>
    </div>
  )

}

export default MainSection;
