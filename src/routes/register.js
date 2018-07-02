import React, { Component } from "react";
import { Message, Input, Container, Header, Button } from "semantic-ui-react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) {
          ok
          errors {
              path
              message
          }
      }
  }
`


class Register extends Component {
    state = {
        username: "",
        usernameError: '',
        email: "",
        emailError: '',
        password: '',
        passwordError: ''
    };

    onSubmit = async (register) => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: ''
        })

        const { username, email, password } = this.state;
        const response = await register({ 
          variables: { username, email, password },
        });
        const { ok, errors } = response.data.register;

        if (ok) {
            this.props.history.push('/');
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
              err[`${path}Error`] = message;
            });
            console.log('err', err);
            this.setState(err);
        }
        console.log(response);
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    render() {
        const { username, email, password, usernameError, emailError, passwordError } = this.state;

        const errorList = [];
        if (usernameError) {
            errorList.push(usernameError);
        }
        if (emailError) {
            errorList.push(emailError);
        }
        if (passwordError) {
            errorList.push(passwordError);
        }

        return(
          <Mutation mutation = { registerMutation }>
            {(register, { data }) => (
              <Container text>
                <Header as = "h2">Register</Header>
                <Input error = { !!usernameError } name = "username" onChange = { this.onChange } value = {username} placeholder = "Username" fluid />
                <Input error = { !!emailError } name = "email" onChange = { this.onChange } value = {email} placeholder = "Email" fluid />
                <Input error = { !!passwordError } name = 'password' onChange = { this.onChange } value = {password} type =  'password' placeholder = "password" fluid />
                <Button onClick = { () => this.onSubmit(register) }>Submit</Button>
                { (usernameError || emailError || passwordError) ? (
                  <Message 
                   error
                   header =  "There was some errors with your submission"
                   list = { errorList }
                  />
                ) : null }
              </Container>
            )}
          </Mutation> 
        )
    }
}

export default Register;