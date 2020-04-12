import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import getImageSrcString from '../../helpers/getImageSrcString';
import Styles from './FilmList.module.css';

const FilmList = ({ films, location }) => (
  <ul className={Styles.list}>
    {films.length > 0 &&
      films.map(({ title, id, original_name, poster_path }) => (
        <li className={Styles.listItem} key={id}>
          <Link to={{ pathname: `/movies/${id}`, state: location }}>
            <img src={getImageSrcString(poster_path)} width="250" alt={title} />
            <p className={Styles.listItemTitle}>{title || original_name}</p>
          </Link>
        </li>
      ))}
  </ul>
);

FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number.isRequired,
      original_name: PropTypes.string,
      poster_path: PropTypes.string,
    }),
  ),
};

export default withRouter(FilmList);
