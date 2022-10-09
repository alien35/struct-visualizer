import React from "react";

function Fibonacci() {
  const [inputVal, setInputVal] = React.useState("");
  const [sum, setSum] = React.useState(0);

  
  const getBreakdown = () => {
    if (!inputVal) {
      return null;
    }
    const num = parseInt(inputVal, 10);
    if (isNaN(num)) {
      return null;
    }
    let result = [];

    let sumCount = 0;
    
    const traverse = (num: number): any[] => {
      if (num === 1) {
        return [<div>1</div>]
      }
      if (num <= 0) {
        return [<div>0</div>]
      }
      return [...traverse(num - 1), ...traverse(num - 2)]
    }
    const queue: number[] = [num];
    while (queue.length) {
      const length = queue.length;
      let row = [];
      for (let i = 0; i < length; i ++) {
        const curr = queue.shift();
        if (curr === 1) {
          row.push(1)
        } else if (curr === 0) {
          row.push(0)
        } else {
          row.push(curr);
          if (typeof curr === 'number') {
            queue.push(curr - 1);
            queue.push(curr - 2);
          }
        }
      }
      result.push(<div style={{display: "flex"}}>{row.map((each, index) => {
        let res = [];
        if (each === 0) {
          res.push(<div style={{padding: 4, margin: 4}}>0</div>)
        } else if (each === 1) {
          sumCount ++;
          res.push(<div style={{padding: 4, margin: 4, background: "lightgreen"}}>1</div>)
        } else {
          res.push(<div style={{padding: 4, margin: 4}}>fib({each})</div>);
        }
        if (index < row.length - 1) {
          res.push(<div style={{padding: 4, margin: 4}}>+</div>)
        }
        return res
      })}</div>)
      
    }
    // result.push(<div>fib({num})</div>)
    result.push(<div>SUM: {sumCount}</div>);
    return result;
  }

  const calcBreakdown = (e: any) => {
    setInputVal(e.target.value);
    if (!e.target.value) {
      return;
    }
    const num = parseInt(e.target.value, 10);
    if (num > 13) {
      setInputVal("");
      return alert("Only go up to 13 please");
    }
    if (isNaN(num)) {
      return;
    }
    
  }

  return (
    <div>
      <h2>Fibonacci</h2>
      <code>
        function fib(n) &#123;
          return fib(n - 1) + fib(n - 2)
          &#125;	
      </code>
      <input value={inputVal} onChange={calcBreakdown} type="text" />
      {getBreakdown()}
    </div>
  )
}

export default Fibonacci;
