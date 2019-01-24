import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './src/components/App';

const root = document.getElementById("root");

if(process.env.CLIENT_ENV) {
    ReactDOM.render(<App/>, root);
} else {
    ReactDOM.hydrate(<App/>, root);
}