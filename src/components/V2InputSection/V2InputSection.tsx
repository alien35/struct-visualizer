import classes from "./V2InputSection.module.css";
import React from "react";
import RichTextEditor from 'react-rte';
import StateContext from "../../contexts/StateContext";
import ScratchpadV2 from "../ScratchpadV2/ScratchpadV2";

function V2InputSection(props: any) {

  const state = React.useContext(StateContext);

  const dropdownRef = React.useRef(null);

  const [showDropdown, setShowDropdown] = React.useState(false);

  const [scratchValue, setScratchValue] = React.useState(state.scratchpadInput);

  React.useEffect(() => {
    if (showDropdown) {
      // @ts-ignore
      dropdownRef.current?.focus();
    }
  }, [showDropdown])

  const onAddText = () => {
    setScratchValue(RichTextEditor.createValueFromString("", 'html'))
    props.addText("<p>Text</p>")
  }

  const onAddTitle = () => {
    setScratchValue(RichTextEditor.createValueFromString("", 'html'))
    props.addText("<h1>Title</h1>")
  }

  const onAddInput = () => {
    props.addText(scratchValue?.toString("html"))
    setScratchValue(RichTextEditor.createValueFromString("", 'html'))
  }

  const onAddSlidingWindow = () => {
    props.addSlidingWindow();
  }

  const onAddBinaryTree = () => {
    props.addBinaryTree();
  }

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.code === "Slash") {
        setShowDropdown(true);
      }
      if (e.code === "Enter") {
        // onAddText()
      }
    })
  }, []);


  return (
    <div className={classes.container}>
      <button className={classes.addBtn} onClick={() => setShowDropdown(true)}>+</button>
      <ScratchpadV2 scratchValue={scratchValue} updateValue={(e: any) => setScratchValue(e)} />
      <button className={classes.addBtn} onClick={onAddInput}>&nbsp;Add&nbsp;</button>
      {
        showDropdown && (
          <div className={classes.dropdown} onBlur={() => setShowDropdown(false)} tabIndex={0} ref={dropdownRef}>
            <div onClick={onAddBinaryTree} className={classes.clickable}>Binary tree</div>
            <h4>Array</h4>
            <div onClick={props.addOnePointer} className={classes.clickable}>&nbsp;&nbsp;&nbsp;&nbsp;One pointer</div>
            <div onClick={props.addIteration} className={classes.clickable}>&nbsp;&nbsp;&nbsp;&nbsp;Two pointer</div>
            <div onClick={onAddSlidingWindow} className={classes.clickable}>&nbsp;&nbsp;&nbsp;&nbsp;Sliding window</div>
            <div onClick={props.addNonIterativeArray} className={classes.clickable}>&nbsp;&nbsp;&nbsp;&nbsp;Non-iterative</div>
            <div onClick={onAddText} className={classes.clickable}>Text</div>
            <div onClick={onAddTitle} className={classes.clickable}>Title</div>
          </div>
        )
      }
    </div>
  )
}

export default V2InputSection;
