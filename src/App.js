import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Episodes from 'routes/Episodes'
import Episode from 'routes/Episode'
import Error404 from 'routes/Error404'
import './App.scss'

require('dotenv').config()

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => 
            <Redirect to="/episodes"/>
          } />
          <Route exact path="/episodes" component={Episodes} />
          <Route path="/episodes/:id" component={Episode} />
          <Route component={Error404} />

        </Switch>
      </div>
    </Router>
  );
}

export default App
