import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './Navigation.module.css';

const Navigation = () => (
  <header className={Styles.header}>
    <ul className={Styles.navList}>
      <li className={Styles.navListItem}>
        <NavLink
          to="/"
          exact
          className={Styles.navListItemLink}
          activeClassName={Styles.navListItemActive}
        >
          home
        </NavLink>
      </li>
      <li className={Styles.navListItem}>
        <NavLink
          to="/movies"
          className={Styles.navListItemLink}
          activeClassName={Styles.navListItemActive}
        >
          search
        </NavLink>
      </li>
    </ul>
  </header>
);

export default Navigation;
