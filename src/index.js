import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ulazni file u React dio aplikacije, uvijek se mora zvati index.js jer je tako definirano u Reactu. Citav <App />
// se postavlja u div sa id-em "root" koji se nalazi u /public/index.html fileu koji je zapravo ulazni file citave
// aplikacije ukoliko aplikaciju gledamo iz perspektive browsera. Zasto se rendera preko ReactDOM-a? Jer ReactDOM sluzi
// za render React aplikacije u DOM https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
