import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './AppRoutes';
import HeroInfo from './components/Hero/HeroInfo';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <AppRoutes />
      </main>

      <Footer />
    </Router>
  );
}

export default App;
