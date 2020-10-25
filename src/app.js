import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, SigninPage, RegisterProspectPage } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegisterProspectPage} />
        <Route path="/signin" component={SigninPage} />
      </Switch>
    </Router>
  );
}

export default App;
