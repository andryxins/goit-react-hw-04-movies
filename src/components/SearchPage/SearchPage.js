import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import * as fetchFilms from '../../services/fetchFilms';
import SearchForm from '../SearchForm/SearchForm';
import FilmList from '../FilmList/FilmList';
import StartLoader from '../StartLoader/StartLoader';

const asyncMovieDetailsPage = lazy(() =>
  import(
    '../MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movieDetails-page" */
  ),
);

const asyncCast = lazy(() =>
  import('../Cast/Cast' /* webpackChunkName: "movie-cast" */),
);

const asyncReviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "movie-reviews" */),
);

const MoviesPage = ({ location, history, match }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeQuery = useCallback(e => {
    const { value } = e.target;
    setSearchQuery(value);
  }, []);

  const handleSubmitSearchQuery = e => {
    e.preventDefault();

    if (searchQuery) history.push(`${match.path}/?query=${searchQuery}`);
  };

  const [searchFilmList, setSearchFilmsList] = useState([]);

  const getFilms = currentQuery => {
    fetchFilms
      .getFilmByQuery(currentQuery)
      .then(data => setSearchFilmsList(data));
  };

  useEffect(() => {
    if (location.search) {
      const parsedQuery = queryString.parse(location.search).query;
      if (parsedQuery) {
        getFilms(parsedQuery);
        setSearchQuery(parsedQuery);
      }
    }
  }, [location.search]);

  return (
    <section className="container">
      <Route
        path="/movies"
        exact
        render={props => (
          <>
            <SearchForm
              {...props}
              value={searchQuery}
              onSubmit={handleSubmitSearchQuery}
              onChange={handleChangeQuery}
            />
            <FilmList films={searchFilmList} />
          </>
        )}
      />
      <Suspense fallback={<StartLoader />}>
        <Route path="/movies/:id" component={asyncMovieDetailsPage} />
        <Route path="/movies/:id/cast" component={asyncCast} />
        <Route path="/movies/:id/reviews" component={asyncReviews} />
      </Suspense>
    </section>
  );
};

export default MoviesPage;
