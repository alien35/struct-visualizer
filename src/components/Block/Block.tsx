import React from "react";
import classes from "./Block.module.css";
import RichTextEditor from 'react-rte';
import ScratchpadV2 from "../ScratchpadV2/ScratchpadV2";
import TextBlock from "../TextBlock/TextBlock";
import SlidingWindowBlock from "../SlidingWindowBlock/SlidingWindowBlock";
import BinaryTreeBlock from "../BinaryTreeBlock/BinaryTreeBlock";
import IterationBlock from "../IterationBlock/IterationBlock";

function Block({ item, onDelete, update }: any) {


  const helperRef = React.useRef(null);
  const scratchpadRef = React.useRef(null);

  const [ showHelper, setShowHelper ] = React.useState(false);

  const [showTextEdit, setShowTextEdit] = React.useState(false);

  const [scratchValue, setScratchValue] = React.useState(RichTextEditor.createValueFromString(item.value, 'html'));

  const onSave = () => {
    update(scratchValue?.toString("html"));
    setShowTextEdit(false);
  }
  React.useEffect(() => {
    if (item.value !== scratchValue?.toString("html")) {
      setScratchValue(RichTextEditor.createValueFromString(item.value, 'html'))
    }
  }, [item.value]);
  console.log(item.value, 'item value');

  React.useEffect(() => {
    if (showHelper) {
      // @ts-ignore
      helperRef.current?.focus();
    }
  }, [showHelper])

  React.useEffect(() => {
    if (showTextEdit) {
      // @ts-ignore
      scratchpadRef.current?.focus();
    }
  }, [showTextEdit])

  if (item.type === "html") {
    return <>
      <TextBlock item={item} onDelete={onDelete} update={update} />
      <br />
      <br />
    </>
  }

  if (item.type === "html" && !showTextEdit) {
    return (
      <div onClick={() => setShowTextEdit(true)} className={classes.container}>
        <div onClick={() => setShowHelper(true)} className={classes.hamburger}>&#8801;</div>
        <div className={classes.textBlock} tabIndex={0} dangerouslySetInnerHTML={{__html: item.value}} />
        {
          showHelper && (
            <div ref={helperRef} onBlur={() => setShowHelper(false)} tabIndex={0} className={classes.helper}>
              <div onClick={() => onDelete(item.id)} className={classes.helperItem}>Delete</div>
            </div>
          )
        }
      </div>
    )
  }
  if (item.type === "html" && showTextEdit) {
    return (
      <div ref={scratchpadRef} className={classes.container}>
        <div onClick={() => setShowHelper(true)} className={classes.hamburger}>&#8801;</div>
        <ScratchpadV2 scratchValue={scratchValue} updateValue={(e: any) => setScratchValue(e)}  />
        {
          showHelper && (
            <div ref={helperRef} onBlur={() => setShowHelper(false)} tabIndex={0} className={classes.helper}>
              <div onClick={() => onDelete(item.id)} className={classes.helperItem}>Delete</div>
            </div>
          )
        }
        <button onClick={onSave}>Save</button>
      </div>
    )
  }
  if (item.type === "sliding-window") {
    return (
      <SlidingWindowBlock onClose={() => onDelete(item.id)} item={item} />
    )
  }
  if (item.type === "iteration") {
    return (
      <IterationBlock onClose={() => onDelete(item.id)} item={item} />
    )
  }
  if (item.type === "binary-tree") {
    return (
      <BinaryTreeBlock onClose={() => onDelete(item.id)} item={item} />
    )
  }
  return (
    <div>something went wrong.</div>
  )

}

export default Block;
