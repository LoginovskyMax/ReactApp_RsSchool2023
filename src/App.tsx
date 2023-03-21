import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import About from './Pages/About/About';
import AddCard from './Pages/AddCard/AddCard';
import NotFound from './Pages/404/NotFound';

import './App.scss';
import Header from './Components/Header/Header';
import { Component } from 'react';

interface IState {
  is404: boolean;
}

class App extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { is404: false };
  }
  is404 = (mount: boolean) => {
    if (mount) {
      this.setState({ is404: true });
    } else {
      this.setState({ is404: false });
    }
  };
  render() {
    return (
      <div className="App">
        <Header is404={this.state.is404}></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddCard />} />
          <Route path="*" element={<NotFound is404={this.is404} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
