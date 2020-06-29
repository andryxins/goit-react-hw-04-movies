import React, { useState, useEffect } from 'react';
import * as fetchFilms from '../../services/fetchFilms';
import FilmList from '../FilmList/FilmList';
import Styles from './HomePage.module.css';

const HomePage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms
      .getPopularFilms()
      .then(films => setFilms(films))
      .catch(e => console.log(e));
  }, []);

  return (
    <section className="container">
      <h1 className={Styles.title}>Popular Movies</h1>
      <FilmList films={films} />
    </section>
  );
};

export default HomePage;
