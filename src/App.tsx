import React from 'react';
import logo from './logo.svg';
import './App.css';

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
    return <span style={{background: color}} className="each-array-integer">{each}</span>
  })
}

function App() {

  const [input, setInput] = React.useState("");
  const [selectedIterator, setSelectedIterator] = React.useState("i");
  const [iIndex, setIIndex] = React.useState(0);
  const [jIndex, setJIndex] = React.useState(0);
  const [mode, setMode] = React.useState("for-loop");
  const [modifiedInput, setModifiedInput] = React.useState("");

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

  const onProceedIterator = () => {
    if (selectedIterator === "i") {
      const newVal = iIndex + 1;
      setIIndex(() => newVal);
      setJIndex(newVal);
      return;
    }
    setJIndex(() => jIndex +1);
  }

  const onRegressIterator = () => {
    if (selectedIterator === "i") {
      setIIndex(() => iIndex -1);
      setJIndex(-1);
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
    const tempI = iIndex;
    const tempJ = jIndex;
    // setIIndex(tempJ);
    // setJIndex(tempI);
  }

  const updateInput = (val: string) => {
    setInput(val);
    setModifiedInput(val);
  }

  const onReset = () => {
    setJIndex(0);
    setIIndex(0);
  }

  return (
    <div style={{margin: "16px"}}>
      <label htmlFor="input">Input</label>
      <div>
        <textarea value={input} onChange={(e) => updateInput(e.target.value)} id="input" />
      </div>
      {
        hasValidInput() && (
          <VisualArray iIndex={iIndex} jIndex={jIndex} value={JSON.parse(modifiedInput)} />
        )
      }
      <br />
      <div>MODE:</div>
      <button onClick={() => setMode("for-loop")}>For loop</button>
      <button onClick={() => setMode("swap")}>Swap</button>
      <br />
      {
        mode === "for-loop" && (
          <>
            <div>Select iterator</div>
            <button style={{background: selectedIterator === "i" ? "lightgreen" : "initial"}} onClick={() => setSelectedIterator("i")}>i</button>&nbsp;
            <button style={{background: selectedIterator === "j" ? "lightgreen" : "initial"}} onClick={() => setSelectedIterator("j")}>j</button>
            <br />
            <br />
            <button onClick={onProceedIterator}>{selectedIterator} ++</button>
            <button onClick={onRegressIterator}>{selectedIterator} --</button>
          </>
        )
      }
      {
        mode === "swap" && (
          <>
            <br />
            <button onClick={triggerSwap}>Trigger swap</button>
          </>
        )
      }
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default App;
