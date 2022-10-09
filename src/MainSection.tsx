import { Box, Button, Divider, Paper, TextareaAutosize, TextField } from '@mui/material';
import React from 'react';
import './App.css';
import SwapIandJ from './components/Iteration/SwapIandJ';
import IteratorSelection from './components/IteratorSelection';
import Fibonacci from './components/Recursion/Fibonacci';
import SlidingWindowOptions from './components/SlidingWindowOptions';
import Sorter from './components/Sorter';
import { SumAllValuesBetween } from './components/sumAllValuesBetween';
import OrderExamples from './components/Tree/OrderExamples';
import TreeDrawing from './components/Tree/treeDrawing';
import Variables from './components/Variables';
import VisualArrayContainer from './components/VisualArrayContainer';
import DispatchContext from './contexts/DispatchContext';
import StateContext from './contexts/StateContext';

function MainSection() {

  const state = React.useContext(StateContext);
  
  const [addingLoop, setAddingLoop] = React.useState(false);
  const [addingInnerLoop, setAddingInnerLoop] = React.useState(false);
  const [iIteratorName, setIIteratorName] = React.useState("i");
  const [jIteratorName, setJIteratorName] = React.useState("j");
  const [clearingSumRef, setClearingSumRef] = React.useState(false);

  const modifiedInput: any = state.modifiedInput;
  
  const dispatch = React.useContext(DispatchContext);

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;
  const iIndex = state.indexes?.[0]?.i;
  const jIndex = state.indexes?.[0]?.j;
  
  const getInputArrays = () => {
    try {
      const splits = modifiedInput.split("\n");
      if (splits.length > 1) {
        const res = splits.map((each: any) => JSON.parse(each));
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

  const updateInput = (val: string) => {
    // setInput(val);
    dispatch({
      type: "update-input",
      val
    })
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
      dispatch({
        type: "update-selected-iterator",
        val: key
      })
    });

    return () => {
      // window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [dispatch])

  return (
    <>
      <div style={{margin: "16px"}}>
      <div>
        <div>
      <div>
      <TextareaAutosize
         value={state.input} onChange={(e) => updateInput(e.target.value)} 
        aria-label="minimum height"
        minRows={3}
        placeholder="Input"
        style={{ width: 200 }}
      />
      </div>
      <div style={{display: "flex", marginTop: 8, flexDirection: "column"}}>
        {
          getInputArrays().map((each: any) => (
            <div style={{display: "flex"}}>
              <VisualArrayContainer hasJIterator={hasJIterator} hasIIterator={hasIIterator} iIndex={iIndex} jIndex={jIndex} value={each} />
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
      <SlidingWindowOptions />
      <IteratorSelection />
      
      <br />
      <SwapIandJ />
      <br />
      <Sorter />
      <br />
      <br />
      
      {
        !clearingSumRef && (
          <SumAllValuesBetween iIteratorName={iIteratorName} jIteratorName={jIteratorName} value={getSumOfAllValuesInBetween()} />
        )
      }
      
        </div>
      </div>
    </div>
    <TreeDrawing />
    <Fibonacci />
    </>
  )

}

export default MainSection;
