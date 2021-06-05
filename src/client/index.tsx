import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { App, AppProps } from "./app";

function renderApp(){
    ReactDOM.render(
        <App></App>
        ,
        document.getElementById('app-placehold')
    );
}

renderApp()