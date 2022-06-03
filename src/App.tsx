import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Header } from './Components/Header';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
