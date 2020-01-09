import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from './configureStore';
import Routes from "./container/Routes";

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

ReactDOM.render(
    <App />, document.getElementById('app')
);
