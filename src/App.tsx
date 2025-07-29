import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RenderRout } from './router';
import './App.css';
// import './dashboardstyle.css'

const App: React.FC = () => {
  return (
    <>
      <RenderRout />
      <Toaster />
    </>
  );
};

export default App;
