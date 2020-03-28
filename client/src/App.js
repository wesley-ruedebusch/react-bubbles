import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./"
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage"

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => (
          <Login {...props} />
        )} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path="/bubble-page" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;