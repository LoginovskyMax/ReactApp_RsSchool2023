import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import About from './Pages/About/About';
import AddCard from './Pages/AddCard/AddCard';
import NotFound from './Pages/404/NotFound';
import './App.scss';
import Header from './Components/Header/Header';
import { useState } from 'react';

const App = () => {
  const [isNotFound, setNotFound] = useState(false);

  const is404 = (mount: boolean) => {
    setNotFound(mount);
  };

  return (
    <div className="App">
      <Header is404={isNotFound}></Header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddCard />} />
        <Route path="*" element={<NotFound is404={is404} />} />
      </Routes>
    </div>
  );
};

export default App;
