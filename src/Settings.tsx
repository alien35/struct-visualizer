import React from "react";
import SettingsAppBar from "./components/SettingsAppBar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StateContext from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";

function Settings() {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext)

  console.log(state, 'state')

  const onChangeState = (which: string) => {
    dispatch({
      type: "update-settings",
      val: {
        ...state.settings,
        [which]: !state.settings[which]
      }
    })
  }

  return (<div>
    <SettingsAppBar />
    <FormGroup>
      <FormControlLabel control={<Checkbox onClick={() => onChangeState("keyValueStore")} checked={state?.settings?.keyValueStore} />} label="Key-value store" />
      <FormControlLabel control={<Checkbox onClick={() => onChangeState("variables")} checked={state?.settings?.variables} />} label="Variables" />
      <FormControlLabel control={<Checkbox onClick={() => onChangeState("primaryIterator")} checked={state?.settings?.variables} />} label="Primary Iterator" />
      <FormControlLabel control={<Checkbox onClick={() => onChangeState("secondaryIterator")} checked={state?.settings?.variables} />} label="Secondary Iterator" />
    </FormGroup>
  </div>)
}

export default Settings;