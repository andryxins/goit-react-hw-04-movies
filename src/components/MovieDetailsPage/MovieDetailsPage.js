import React, { useState, useEffect } from 'react';
import * as fetchFilms from '../../services/fetchFilms';
import Styles from './MovieDetailsPage.module.css';
import MovieDetails from '../MovieDetails/MovieDetails';

const MovieDetailsPage = ({ match }) => {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    if (!match.params.id) return;

    const { id } = match.params;
    fetchFilms.getFilmById(id).then(film => setFilm(film));
  }, [match]);

  return (
    <div className={Styles.container}>
      {film && <MovieDetails filmDetails={film} />}
    </div>
  );
};

export default MovieDetailsPage;
