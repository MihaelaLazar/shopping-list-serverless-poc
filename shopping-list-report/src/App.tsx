import React from 'react';
import './App.css';
import configureStore from "./store.config";
import {Route, Switch} from "react-router-dom";

import {Provider} from "react-redux";
import Main from "./components/Main";

const store = configureStore({
  shoppingListReport: {
    data: [],
    errors: "",
    loading: false
  }
});

const App = () => {
  return (
      <Provider store={store}>
        <Switch>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </Provider>

  );
}

export default App;
