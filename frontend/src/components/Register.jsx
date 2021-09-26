import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Register.css';

function Register() {

  const [registerFormInput, setRegisterFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onSubmitRegisterForm = async e => {
    e.preventDefault();
    try {
      const body = {
        firstName: registerFormInput.firstName, 
        lastName: registerFormInput.lastName,
        email: registerFormInput.email, 
        password: registerFormInput.password 
      };
      const response = await fetch("http://localhost:5000/register", {
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
    <div className="register">
      <Form>
      <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="firstName" 
            placeholder="First Name" 
            value={registerFormInput.firstName}
            onChange={e => {
              setRegisterFormInput({
                ...registerFormInput,
                firstName: e.target.value
              })
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="lastName" 
            placeholder="Last Name" 
            value={registerFormInput.lastName}
            onChange={e => {
              setRegisterFormInput({
                ...registerFormInput,
                lastName: e.target.value
              })
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={registerFormInput.email}
            onChange={e => {
              setRegisterFormInput({
                ...registerFormInput,
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
            value={registerFormInput.password}
            onChange={e => {
              setRegisterFormInput({
                ...registerFormInput,
                password: e.target.value
              })
            }}
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit"
          onClick={e => onSubmitRegisterForm(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register;
