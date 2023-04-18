import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router, BrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <Provider store={store}>
       <BrowserRouter>
         <App />
      </BrowserRouter>
    </Provider>

);
