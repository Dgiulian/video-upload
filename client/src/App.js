import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Upload, Error, Home } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/upload" exact component={Upload} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
