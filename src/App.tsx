import { Routes, Route, NavLink } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import About from './Pages/About';
import NotFound from './Pages/NotFound';

import './App.scss';

function App() {
  return (
    <div className="App">
      <NavLink to={'/'}>Main </NavLink> | <NavLink to={'/about'}>About</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
