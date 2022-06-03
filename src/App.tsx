import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
