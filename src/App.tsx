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
  }
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'update-settings':
      return {
        settings: {...action.val}
      };
    default:
      throw new Error();
  }
}

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state, 'state22')

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
