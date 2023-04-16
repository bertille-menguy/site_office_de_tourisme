import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Connexion from './Connexion'
import Accueil from './Accueil.js'
import ListeSorties from './ListeSorties.js'
import ListeMembres from './ListeMembres'
import ListeOptions from './ListeOptions'
import ListeInscriptions from './ListeInscriptions'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Accueil />} />
          <Route exact path="/Connexion" element={<Connexion/>} />
          <Route exact path="/ListeSorties" element={<ListeSorties/>} />
          <Route exact path="/ListeMembres" element={<ListeMembres/>} />
          <Route exact path="/ListeOptions" element={<ListeOptions/>} />
          <Route exact path="/ListeInscriptions" element={<ListeInscriptions/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
