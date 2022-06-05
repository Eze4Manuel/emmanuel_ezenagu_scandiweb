import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import './index.scss';
import reportWebVitals from './reportWebVitals';
import { QueryCategories } from './queryHOC/query';
import { Provider } from 'react-redux';
import store from './redux/store';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>

        <QueryCategories />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
