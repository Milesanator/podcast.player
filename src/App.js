import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Episodes from './routes/Episodes'
import Episode from './routes/Episode'
import './App.scss'

require('dotenv').config()

function App() {
  console.log(process.env.PODBLASTER_SRV)
  return (
    <Router>
      <div>
        <Route exact path="/" component={Episodes} />


        <Route exact path="/episodes" component={Episodes} />
        <Route exact path="/episodes/:id" component={Episode} />
      </div>
    </Router>
  );
}

export default App
