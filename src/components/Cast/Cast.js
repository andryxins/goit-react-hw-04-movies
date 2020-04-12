import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as fetchFilms from '../../services/fetchFilms';
import getImageSrcString from '../../helpers/getImageSrcString';
import Styles from './Cast.module.css';

export default class Cast extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  state = {
    filmCast: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetchFilms
      .getCastOfFilmById(id)
      .then(data => data.cast.slice(0, 10))
      .then(cast => this.setState({ filmCast: cast }));
  }

  render() {
    const { filmCast } = this.state;
    return (
      <div className={Styles.castContainer}>
        {filmCast && (
          <ul className={Styles.castList}>
            {filmCast.map(({ id, name, profile_path }) => (
              <li className={Styles.castListItem} key={id}>
                <img
                  src={getImageSrcString(profile_path)}
                  alt="some alt"
                  width="100"
                  height="125"
                />
                <p className={Styles.castListItemName}>{name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
