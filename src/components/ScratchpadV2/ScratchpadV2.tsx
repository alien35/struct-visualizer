/* tslint:disable */
import React from "react";
import RichTextEditor from 'react-rte';
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";
import classes from "./ScratchpadV2.module.css";

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [],
  INLINE_STYLE_BUTTONS: [
  ],
  BLOCK_TYPE_DROPDOWN: [
  ],
  BLOCK_TYPE_BUTTONS: [
  ]
};

function ScratchpadV2({scratchValue, updateValue, ref}: any) {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const onChange = (val: any) => {
    updateValue(val);
    dispatch({
      type: "update-scratchpad-input",
      val
    })
  }

  if (!state.settings?.scratchpad) {
    return null;
  }

  return (
    <div className={classes.container}>
      <RichTextEditor
        ref={ref}
      /* @ts-ignore */
        toolbarConfig={toolbarConfig}
        value={scratchValue}
        onChange={onChange}
      />
    </div>
  )
}

export default ScratchpadV2;
