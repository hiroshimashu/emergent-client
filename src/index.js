import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
    uri: 'http://localhost:8081/graphql'
});
const App = () => (
  <ApolloProvider client = { client }>
      <Routes />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
