import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import Settings from './Settings';
import MainApp from './MainApp';
import DispatchContext from './contexts/DispatchContext';
import StateContext from './contexts/StateContext';
import RichTextEditor from 'react-rte';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Something went wrong. Please refresh the screen. The error is in the console.</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorBoundary />
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
  scratchpadInput: RichTextEditor.createValueFromString("", 'html'),
  editingTextBlock: false
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: state.editingTextBlock
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
        scratchpadInput: action.val,
        editingTextBlock: state.editingTextBlock
      }
    case "set-editing-text-block":
      return {
        settings: state.settings,
        iteratorMode: state.iteratorMode,
        indexes: state.indexes,
        slidingJIndexes: state.slidingJIndexes,
        selectedIterator: state.selectedIterator,
        input: state.input,
        modifiedInput: state.modifiedInput,
        scratchpadInput: state.scratchpadInput,
        editingTextBlock: action.val
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
