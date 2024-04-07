import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { initializeStateFromLocalStorage } from './features/userSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const storedToken = localStorage.getItem("user");

if (storedToken) {
  store.dispatch(initializeStateFromLocalStorage(storedToken));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
