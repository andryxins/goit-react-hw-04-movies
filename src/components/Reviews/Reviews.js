import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as fetchFilms from '../../services/fetchFilms';
import Styles from './Reviews.module.css';

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchFilms
      .getReviewsOfFilmById(match.params.id)
      .then(data => setReviews(data.results));
  }, [match]);

  return reviews.length === 0 ? (
    <div className={Styles.NoReviews}>
      <h3>¯\(°_o)/¯</h3>
      <h3>Sorry, we have no any reviews for this movie</h3>
    </div>
  ) : (
    <div className={Styles.reviewsContainer}>
      <ul className={Styles.reviewsList}>
        {reviews.map(({ author, content, id }) => (
          <li className={Styles.reviewsListItem} key={id}>
            <h3 className={Styles.reviewsListItemUserName}>{author}</h3>
            <p className={Styles.reviewsListItemReview}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Reviews.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default Reviews;
