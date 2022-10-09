import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Settings from './Settings';
import MainApp from './MainApp';
import DispatchContext from './contexts/DispatchContext';
import StateContext from './contexts/StateContext';
import RichTextEditor from 'react-rte';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const initialState = {
  settings: {
    variables: true,
    keyValueStore: true,
    primaryIterator: true,
    secondaryIterator: true,
    scratchpad: true,
    sort: true
  },
  iteratorMode: "iterate",
  indexes: [{i: 0, j: 0}],
  slidingJIndexes: [{m: -1, n: -1}],
  selectedIterator: "i",
  input: "",
  modifiedInput: "",
  scratchpadInput: RichTextEditor.createValueFromString("", 'html')
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'update-settings':
      return {
        settings: {...action.val},
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput
      };
    case 'update-iterator-mode':
      return {
        settings: state.settings,
        iteratorMode: action.val,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-indexes':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: action.val,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-sliding-j-indexes':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: action.val,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-selected-iterator':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: action.val,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-input':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: action.val,
        modifiedInput: action.val,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-modified-input':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: action.val,
        scratchpadInput: state.scratchpadInput
      }
    case 'update-scratchpad-input':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: action.val
      }
    default:
      throw new Error();
  }
}

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
