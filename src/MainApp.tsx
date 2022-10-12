import { Grid } from '@mui/material';
import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MainSection from './MainSection';
import RightSection from './RightSection';
import MenuAppBar from './components/MenuAppBar';
import Version2 from './Version2';

function MainApp() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Version2 />
    </DndProvider>
  )
}

export default MainApp;
