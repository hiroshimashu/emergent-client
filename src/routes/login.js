import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Input, Container, Header, Button } from "semantic-ui-react";

export default observer(class Login extends Component {
  constructor(props) {
      super(props);

      extendObservable(this, {
          email: '',
          password: '',
      });
  }

  onSubmit = async (login) => {
      const { email, password } = this;
      const response = await login({
          variables: { email, password},
      });
      console.log(response);
      const { ok, token, refreshToken } = response.data.login;
      if (ok) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
      }
  }

  onChange = e => {
      const { name, value } = e.target;
      this[name] = value;
  }

  render() {
      const { email, password } = this

      return (
        <Mutation mutation =  { loginMutation }>
          {(login, { data }) => (
            <Container text>
            <Header as = "h2">Login</Header>
            <Input name = "email" onChange = { this.onChange } value = {email} placeholder = "Email" fluid />
            <Input name = 'password' onChange = { this.onChange } value = {password} type =  'password' placeholder = "password" fluid />
            <Button onClick = { () => this.onSubmit(login) }>Submit</Button>
          </Container>
          )}
        </Mutation>  
      );
  }
});

const loginMutation = gql` 
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok 
      token
      errors {
        path
        message
      }
    }
  }
`;