import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { tasks } from './consts/data';
import { Card } from './components/Card';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './components/Container';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
}

export default App;
