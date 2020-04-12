import React, { Component } from 'react';
import * as fetchFilms from '../../services/fetchFilms';
import Styles from './MovieDetailsPage.module.css';
import MovieDetails from '../MovieDetails/MovieDetails';

class MovieDetailsPage extends Component {
  state = {
    film: null,
  };

  componentDidMount() {
    if (!this.props.match.params.id) return;

    const { id } = this.props.match.params;
    fetchFilms.getFilmById(id).then(film => this.setState({ film }));
  }

  render() {
    const { film } = this.state;

    return (
      <div className={Styles.container}>
        {film && <MovieDetails filmDetails={film} />}
      </div>
    );
  }
}

export default MovieDetailsPage;
