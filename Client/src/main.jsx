import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from '../src/App/store.js'
import { Provider } from 'react-redux'

const RootComponent = () => {
  return (
    <Provider store={store}>
    <App />
    </Provider>
          
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent/>
  </StrictMode>,
)
