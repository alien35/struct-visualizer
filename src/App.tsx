import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Settings from './Settings';
import MainApp from './MainApp';
import DispatchContext from './contexts/DispatchContext';
import StateContext from './contexts/StateContext';

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
    secondaryIterator: true
  },
  iteratorMode: "iterate",
  indexes: [{i: 0, j: 0}],
  selectedIterator: "i",
  input: "",
  modifiedInput: ""
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'update-settings':
      return {
        settings: {...action.val},
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput
      };
    case 'update-iterator-mode':
      return {
        settings: state.settings,
        iteratorMode: action.val,
        indexes: state.indexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput
      }
    case 'update-indexes':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: action.val,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput
      }
    case 'update-selected-iterator':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        selectedIterator: action.val,
        input: state.input,
        modifiedInput: state.modifiedInput
      }
    case 'update-input':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        selectedIterator: state.selectedIterator,
        input: action.val,
        modifiedInput: action.val
      }
    case 'update-modified-input':
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: action.val
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
