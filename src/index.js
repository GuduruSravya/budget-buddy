import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from './context/context.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Provider>
   <App/>
</Provider>

);

