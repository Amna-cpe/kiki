import React, { useState ,useContext} from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import {AuthContext} from "../context/auth"

function Register(props) {
  const [errors, serErrors] = useState({});
 const context = useContext(AuthContext);
  const { handleChange, submit, values } = useForm(RegisterUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(SUBMIT_REGISTER_INPUT, {
    update(proxy, result) {
      console.log(result);
      context.login(result.data.register)
      props.history.push("/");
    }, //trigger if the mutauon succed
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      serErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  // cuz all of functions are hoisted firm
 function RegisterUser (){
   addUser();
 }


  return (
    <div className="form-div">
      <Form onSubmit={submit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          error={errors ? (errors.username ? true : false) : false}
        />

        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors ? (errors.email ? true : false) : false}
        />

        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          helperText={errors && (errors.password ? errors.password : false)}
          error={errors ? (errors.password ? true : false) : false}
        />

        <Form.Input
          label="confirmPassword"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          type="password"
          helperText={errors && (errors.password ? errors.password : false)}
          error={errors ? (errors.password ? true : false) : false}
        />

        <Button type="submit" color="green">
          Register
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


const SUBMIT_REGISTER_INPUT = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
