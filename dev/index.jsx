import React from 'react'
import ReactDOM from 'react-dom'

import App from './App/App'

import './index.css'

const rootNode = document.getElementById('root')
ReactDOM.render(<App />, rootNode)

//Use this when react version is upgraded:
// const root = createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
