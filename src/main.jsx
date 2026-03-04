// main.jsx — The entry point. This mounts the React app into index.html's <div id="root">.
// ReactDOM.createRoot tells React to take over that div and manage all the UI inside it.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
