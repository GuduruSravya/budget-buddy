import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from './context/context.js';
import { SpeechProvider } from '@speechly/react-client';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   
<SpeechProvider appId="210214ca-66ea-44c3-a0c4-fb2ee045e13e" language="en-US">
   
   <Provider>
   <App/>
</Provider>
</SpeechProvider>

);

