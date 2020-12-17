import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

function Login(props) {
  const [errors, serErrors] = useState({});
  const context = useContext(AuthContext);

  const { handleChange, submit, values } = useForm(Loginuser, {
    username: "",
    password: "",
  });
  const [loginUser, { loading }] = useMutation(SUBMIT_LOGIN_USER, {
    update(proxy, result) {
      console.log(result.data.login)
      context.login(result.data.login);
      props.history.push("/");
    }, //trigger if the mutauon succed
    onError(err) {
      serErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function Loginuser() {
    loginUser();
  }

  return (
    <div className="form-div">
      <Form onSubmit={submit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          error={errors ? (errors.username ? true : false) : false}
        />

        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          error={errors ? (errors.password ? true : false) : false}
        />

        <Button type="submit" color="green">
          Login
        </Button>

        {Object.keys(errors).length > 0 && (
          <div className="ui negative message">
            <ul className="">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
}

const SUBMIT_LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
