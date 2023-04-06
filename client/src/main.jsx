import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <ErrorBoundary fallback={<h2>Error occurred while rendering</h2 >} >
          <App />
        </ErrorBoundary >
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
