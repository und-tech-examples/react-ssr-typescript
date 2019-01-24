import * as React from 'react';
import { App, finalStore } from './src/components/App';
import { ServerStyleSheet } from 'styled-components';

const sheetServer = new ServerStyleSheet();

export const ssrApp = sheetServer.collectStyles(<App/>);
export const sheet = sheetServer;
export const store = finalStore;