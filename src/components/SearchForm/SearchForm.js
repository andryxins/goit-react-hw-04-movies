import React from 'react';
import PropTypes from 'prop-types';
import Styles from './SearchForm.module.css';

const SearchForm = ({ onSubmit, value, onChange }) => (
  <form className={Styles.formContainer} onSubmit={onSubmit}>
    <input
      placeholder="Put the name of film!"
      className={Styles.formField}
      type="text"
      value={value}
      onChange={onChange}
    />
    <button className={Styles.formBtn} type="submit">
      Search!
    </button>
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
