import React from 'react';
import {createRoot} from 'react-dom/client'
import App from '../src/components/App.js'
//import store from "./redux/store.js"
import { Provider } from 'react-redux';

import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot( document.getElementById('root') )
root.render(
    
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
    </Provider>
    
);