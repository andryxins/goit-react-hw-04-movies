import React, { Component, lazy, Suspense } from 'react';
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

export default class MoviesPage extends Component {
  state = {
    searchQuery: '',
    searchFilmList: [],
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchQuery: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;

    if (!searchQuery) {
      return;
    }
    this.props.history.push(
      `${this.props.match.path}/?query=${this.state.searchQuery}`,
    );
  };

  getFilms = currentQuery => {
    fetchFilms
      .getFilmByQuery(currentQuery)
      .then(data => this.setState({ searchFilmList: [...data] }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.location.search;
    const currentQuery = this.props.location.search;

    const parsedQuery = queryString.parse(currentQuery).query;

    if (currentQuery && prevQuery !== currentQuery) {
      this.setState({ searchQuery: parsedQuery });
      this.getFilms(parsedQuery);
    }
  }

  componentDidMount() {
    const { search } = this.props.location;

    if (search) {
      const parsedQuery = queryString.parse(search).query;
      if (!parsedQuery) return;

      this.getFilms(parsedQuery);
      this.setState({ searchQuery: parsedQuery });
    }
  }

  render() {
    const { searchQuery, searchFilmList } = this.state;

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
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
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
  }
}
