import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {

  const [loginFormInput, setLoginFormInput] = useState({
    email: "",
    password: ""
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const history = useHistory();

  const onSubmitLoginForm = async e => {
    e.preventDefault();
    if (loginFormInput.email === "" || loginFormInput.password === ""){
      setIncorrectLogin(true);
      return;
    }
    try {
      const body = { email: loginFormInput.email, password: loginFormInput.password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const responseBody = await response.json();
      console.log("responseBody is ", typeof responseBody);
      if (responseBody.email){
        setCurrentUser(responseBody.email);
        setIncorrectLogin(false);
        localStorage.setItem('user_details', JSON.stringify(responseBody));
        history.push("/");
        history.go(0);
      } else {
        setIncorrectLogin(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login">
      <Form>
        <h2 className="login-heading">Login</h2>
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
        {incorrectLogin && 
          <Alert variant="danger" className="incorrect-credentials">
            Incorrect username or password. Please try again.
          </Alert>
        }
      </Form>
    </div>
  )
}

export default Login;
