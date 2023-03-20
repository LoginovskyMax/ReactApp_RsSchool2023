import { NavLink } from 'react-router-dom';
import { Component } from 'react';
import styles from './Header.module.scss';

interface Iprops {
  is404: boolean;
}

interface IState {
  location: string;
}

export default class Header extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props);
    this.state = { location: '' };
  }

  changeLocation() {
    let loc = location.href;
    loc = loc.slice(loc.lastIndexOf('/'));
    if (loc === '/') this.setState({ location: 'Main page' });
    if (loc === '/about') this.setState({ location: 'About' });
    if (loc !== '/' && loc !== '/about') this.setState({ location: '404' });
  }
  componentDidUpdate(prevProps: Readonly<Iprops>): void {
    if (this.props.is404 !== prevProps.is404) {
      this.changeLocation();
    }
  }
  componentDidMount() {
    this.changeLocation();
  }
  render() {
    return (
      <div className={styles.header}>
        <h2>{this.state.location}</h2>
        <div>
          <NavLink
            to={'/'}
            onClick={() => {
              this.setState({ location: 'Main page' });
            }}
          >
            Main
          </NavLink>{' '}
          |
          <NavLink
            to={'/about'}
            onClick={() => {
              this.setState({ location: 'About' });
            }}
          >
            About
          </NavLink>
        </div>
      </div>
    );
  }
}
