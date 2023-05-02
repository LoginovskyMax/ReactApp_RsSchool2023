import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from './redux/store';
import { Provider } from 'react-redux';

hydrateRoot(
  document.getElementById('root') as Element,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
