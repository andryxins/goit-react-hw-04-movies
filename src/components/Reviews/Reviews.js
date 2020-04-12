import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as fetchFilms from '../../services/fetchFilms';
import Styles from './Reviews.module.css';

export default class Reviews extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  state = {
    reviewsOfFilm: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetchFilms
      .getReviewsOfFilmById(id)
      .then(data => this.setState({ reviewsOfFilm: [...data.results] }));
  }

  render() {
    const { reviewsOfFilm } = this.state;

    return reviewsOfFilm.length === 0 ? (
      <div className={Styles.NoReviews}>
        <h3>¯\(°_o)/¯</h3>
        <h3>Sorry, we have no any reviews for this movie</h3>
      </div>
    ) : (
      <div className={Styles.reviewsContainer}>
        <ul className={Styles.reviewsList}>
          {reviewsOfFilm.map(({ author, content, id }) => (
            <li className={Styles.reviewsListItem} key={id}>
              <h3 className={Styles.reviewsListItemUserName}>{author}</h3>
              <p className={Styles.reviewsListItemReview}>{content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
