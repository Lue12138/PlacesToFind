import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

// here the root component to render to to index.js is <App /> 
// App.js is your App component, whereas index.js is the "entry point" for your application.
// The index.js contains the logic for rendering your App component and provides it with any 
// necessary props (either directly, or via contexts). You can think of them as: App.js is 
// the main method in C program And Index js is the compiled EXE
ReactDOM.render(<App />, document.getElementById('root'));
