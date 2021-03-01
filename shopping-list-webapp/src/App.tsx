import React from 'react';
import './App.css';
import configureStore from "./store.config";
import {Provider} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/Main/NavBar";
import Main from "./components/Main";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore({
    shoppingList: {
        data: [],
        errors: "",
        shoppingItemCreated: false,
        loading: false
    }
});

const App = () => {
    return (
            <Provider store={store}>
                <NavBar/>
                <Switch>

                    <Route path="/">
                        <Main/>
                    </Route>
                </Switch>
            </Provider>

    );
}
export default App;
