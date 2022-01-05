import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './app/components/App/App';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';
import { fetchCurrentUser } from './features/currentUser/slices/currentUserSlice';
import ErrorBoundary from './app/components/ErrorBoundary/ErrorBoundary';

store.dispatch(fetchCurrentUser());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
