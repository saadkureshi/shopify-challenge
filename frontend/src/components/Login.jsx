import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {

  const [loginFormInput, setLoginFormInput] = useState({
    email: "",
    password: ""
  });

  const onSubmitLoginForm = async e => {
    e.preventDefault();
    try {
      const body = { email: loginFormInput.email, password: loginFormInput.password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={loginFormInput.email}
            onChange={e => {
              setLoginFormInput({
                ...loginFormInput,
                email: e.target.value
              })
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={loginFormInput.password}
            onChange={e => {
              setLoginFormInput({
                ...loginFormInput,
                password: e.target.value
              })
            }}
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit"
          onClick={e => onSubmitLoginForm(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login;
