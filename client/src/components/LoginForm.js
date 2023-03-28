import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

const CustomLabel = styled.label`
  color: #4E79D4;
  font-size: 1.5em;
  font-family: 'Press Start 2P', cursive;
`;

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }


  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  })


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json.then((user) => onLogin(user))
        }
      })
    }
  })







  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <CustomLabel htmlFor="username">Username</CustomLabel>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="password">Password</CustomLabel>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;
