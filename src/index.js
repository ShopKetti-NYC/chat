import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App'
import LogIn from './Pages/LogIn'
import SignupForm from './Components/SignupForm'


// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'https://dev-chatapp.herokuapp.com/' });
const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    {/* <App /> */}
    <LogIn/>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));