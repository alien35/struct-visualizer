import { Grid } from '@mui/material';
import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MainSection from './MainSection';
import RightSection from './RightSection';
import MenuAppBar from './components/MenuAppBar';

function MainApp() {

  return (
    <DndProvider backend={HTML5Backend}>
      <MenuAppBar />
      <Grid container>
        <Grid item xs={6}>
          <MainSection />
        </Grid>
        <Grid item xs={6}>
          <RightSection />
        </Grid>
      </Grid>
    </DndProvider>
  )
}

export default MainApp;
