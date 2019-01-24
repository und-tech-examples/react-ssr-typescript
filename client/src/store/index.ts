
import { createStore } from 'redux';
import { counterApp } from './reducer';

if (process.env.SERVER_ENV) {
    global.window = {}; // Temporarily define window for server-side
}

const reduxDevTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = (window as any).__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete (window as any).__PRELOADED_STATE__;

// Create Redux store with initial state
export default createStore(counterApp, preloadedState, reduxDevTool);
