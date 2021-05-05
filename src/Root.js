import React from 'react';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import { applyMiddleware, createStore } from 'redux';
import reducers from 'reducers';

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxPromise)
  );
  return <Provider store={store}>{children}</Provider>;
};
