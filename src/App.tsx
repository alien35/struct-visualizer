import { Grid } from '@mui/material';
import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MainSection from './MainSection';
import RightSection from './RightSection';

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <MainSection />
        </Grid>
        <Grid item xs={4}>
          <RightSection />
        </Grid>
      </Grid>
    </DndProvider>
  )

}

export default App;
