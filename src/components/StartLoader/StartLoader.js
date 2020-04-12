import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Styles from './StartLoader.module.css';

const StartLoader = () => (
  <div className={Styles.container}>
    <Loader type="TailSpin" color="#00BFFF" height={80} width={80} visible />
  </div>
);

export default StartLoader;
