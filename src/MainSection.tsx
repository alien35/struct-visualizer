import { Box, Button, Divider, Paper, TextareaAutosize, TextField } from '@mui/material';
import React from 'react';
import './App.css';
import IteratorSelection from './components/IteratorSelection';
import { SumAllValuesBetween } from './components/sumAllValuesBetween';
import Variables from './components/Variables';
import VisualArrayContainer from './components/VisualArrayContainer';
import StateContext from './contexts/StateContext';

function MainSection() {

  const [input, setInput] = React.useState("");
  const [selectedIterator, setSelectedIterator] = React.useState("i");
  const [iIndex, setIIndex] = React.useState(0);
  const [jIndex, setJIndex] = React.useState(0);
  const [modifiedInput, setModifiedInput] = React.useState("");
  const [addingLoop, setAddingLoop] = React.useState(false);
  const [addingInnerLoop, setAddingInnerLoop] = React.useState(false);
  const [iIteratorName, setIIteratorName] = React.useState("i");
  const [jIteratorName, setJIteratorName] = React.useState("j");
  // const [hasIIterator, setHasIIterator] = React.useState(false);
  // const [hasJIterator, setHasJIterator] = React.useState(false);
  const [clearingSumRef, setClearingSumRef] = React.useState(false);

  const state = React.useContext(StateContext);

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;

  const getInputArrays = () => {
    try {
      const splits = modifiedInput.split("\n");
      if (splits.length > 1) {
        const res = splits.map((each) => JSON.parse(each));
        return res;
      }
      return [JSON.parse(splits[0])]
    } catch (err) {
      return []
    }
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

  const onChangeIIteratorName = (e: any) => {
    setIIteratorName(e.target.value);
  }

  const onChangeJIteratorName = (e: any) => {
    setJIteratorName(e.target.value);
  }

  const applyIIterator = () => {
    // setHasIIterator(true);
    setAddingLoop(false);
  }

  const applyJIterator = () => {
    // setHasJIterator(true);
    setAddingInnerLoop(false);
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
      <div>
      <TextareaAutosize
         value={input} onChange={(e) => updateInput(e.target.value)} 
        aria-label="minimum height"
        minRows={3}
        placeholder="Input"
        style={{ width: 200 }}
      />
      </div>
      <div style={{display: "flex", marginTop: 8, flexDirection: "column"}}>
        {
          getInputArrays().map((each) => (
            <div style={{display: "flex"}}>
              <VisualArrayContainer hasJIterator={hasJIterator} hasIIterator={hasIIterator} onClick={onSelectFromOutput} iIndex={iIndex} jIndex={jIndex} value={each} />
            </div>
          ))
        }
      </div>
      <br />
      <br />
      <Divider />
      <br />
      <Variables />
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
      <IteratorSelection />
      
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

        </div>
      </div>
    </div>
  )

}

export default MainSection;
