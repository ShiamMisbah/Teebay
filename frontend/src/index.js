import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

