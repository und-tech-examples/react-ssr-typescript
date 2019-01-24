import * as React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { Counter } from './Counter';
import store from './../store';

const H1 = styled.h1`
    color: red;
`;

export const App: React.SFC<{}> = () => (
    <Provider store={store}>
        <H1>Hello React</H1>
        <Counter />
    </Provider>
);
export const finalStore = store;