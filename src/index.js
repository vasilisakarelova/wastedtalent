import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import DataActions from 'flux/actions/DataActions.js'
import registerServiceWorker from './registerServiceWorker'

DataActions.getPages((response)=>{
  ReactDOM.render(<App />, document.getElementById('app'))
})
registerServiceWorker()
