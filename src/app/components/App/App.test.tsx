import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../../store';

test('renders learn react link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );

  expect(getByText(/Feedback Board/i)).toBeInTheDocument();
});
