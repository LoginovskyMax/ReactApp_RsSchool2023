import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

interface IProps {
  is404: boolean;
}

const Header = ({ is404 }: IProps) => {
  const [curLocation, setLocation] = useState('');

  const changeLocation = () => {
    let loc = location.href;
    loc = loc.slice(loc.lastIndexOf('/'));
    if (loc === '/') setLocation('Main page');
    if (loc === '/about') setLocation('About');
    if (loc === '/add') setLocation('Add - Card');
    if (loc !== '/' && loc !== '/about' && loc !== '/add') setLocation('404');
  };

  useEffect(() => {
    changeLocation();
  }, [is404]);

  return (
    <div className={styles.header}>
      <h2 className={styles.header__page}>{curLocation}</h2>
      <div className={styles.header__links}>
        <NavLink
          to={'/'}
          onClick={() => {
            setLocation('Main page');
          }}
          data-testid="link-main"
        >
          Main
        </NavLink>{' '}
        |
        <NavLink
          to={'/about'}
          onClick={() => {
            setLocation('About');
          }}
          data-testid="link-about"
        >
          About
        </NavLink>
        |
        <NavLink
          to={'/add'}
          onClick={() => {
            setLocation('Add - Card');
          }}
          data-testid="link-add"
        >
          Add card
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
