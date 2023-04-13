import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import './index.scss';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
