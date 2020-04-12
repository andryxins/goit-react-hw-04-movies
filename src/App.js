import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import StartLoader from './components/StartLoader/StartLoader';

const asyncHomePage = lazy(() =>
  import('./components/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const asyncMoviesPage = lazy(() =>
  import(
    './components/SearchPage/SearchPage' /* webpackChunkName: "movies-page" */
  ),
);

const App = () => (
  <div>
    <Navigation />
    <Suspense fallback={<StartLoader />}>
      <Switch>
        <Route path="/" exact component={asyncHomePage} />
        <Route path="/movies" component={asyncMoviesPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </div>
);

export default App;
