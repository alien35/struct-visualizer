import React from "react";
import RichTextEditor from 'react-rte';
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

function Scratchpad({ scratchValue }: any) {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [value, setValue] = React.useState(state.scratchpadInput);

  const onChange = (val: any) => {
    setValue(val);
    dispatch({
      type: "update-scratchpad-input",
      val
    })
  }

  if (!state.settings?.scratchpad) {
    return null;
  }

  return (
    <div style={{overflow: 'scroll', position: "absolute", height: "100%"}}>
      <br />
      <h4>Scratchpad</h4>
      <RichTextEditor
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Scratchpad;
