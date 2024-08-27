import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { userRegister } from '../../api/AppURL'; // Use named import
import axios from 'axios';
import Login from '../../assets/images/login.png';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(userRegister(), formData) // Use named import function
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loggedIn || localStorage.getItem('token')) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container>
      <Row className="p-2">
        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
          <Row className="text-center">
            <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
              <Form className="onboardForm" onSubmit={formSubmit}>
                <h4 className="section-title-login"> USER REGISTER </h4>
                <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  className="form-control m-2"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  className="form-control m-2"
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                  className="form-control m-2"
                  type="password"
                  placeholder="Confirm Your Password"
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                />
                <Button type="submit" className="btn btn-block m-2 site-btn-login"> Sign Up </Button>
                <hr />
                <p> <b> Forget My Password? </b><Link to="/forget"><b> Forget Password </b> </Link> </p>
                <p> <b> Already Have An Account? </b><Link to="/login"><b> Login </b> </Link> </p>
              </Form>
            </Col>
            <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
              <img className="onboardBanner" src={Login} alt="Register" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
