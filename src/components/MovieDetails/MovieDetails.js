import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import getImageSrcString from '../../helpers/getImageSrcString';
import Styles from './MovieDetails.module.css';

const MovieDetails = ({ filmDetails, location }) => {
  const { id, title, release_date, overview, poster_path } = filmDetails;

  return (
    <>
      <Link className={Styles.backToSearchBtn} to={location.state || '/'}>
        Back to search
      </Link>
      <div className={Styles.wrapper}>
        <div className={Styles.descWrapper}>
          <h2 className={Styles.title}>{title}</h2>
          <p className={Styles.releaseDate}>Release date:{release_date}</p>
          <p className={Styles.description}>{overview}</p>
        </div>
        <div>
          <img
            className={Styles.img}
            src={getImageSrcString(poster_path)}
            alt=""
            width="250"
          />
        </div>
      </div>
      <div className={Styles.infoBtn}>
        <Link
          className={Styles.castLink}
          to={{ pathname: `/movies/${id}/cast`, state: { ...location.state } }}
        >
          Cast
        </Link>
        <Link
          className={Styles.reviewsLink}
          to={{
            pathname: `/movies/${id}/reviews`,
            state: { ...location.state },
          }}
        >
          Reviews
        </Link>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  filmDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};

export default withRouter(MovieDetails);
