import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { userLogin } from '../../api/AppURL';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Login from '../../assets/images/login.png';

const UserLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(userLogin(), formData)
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Row className="p-2">
        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
          <Row className="text-center">
            <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
              <Form className="onboardForm" onSubmit={formSubmit}>
                <h4 className="section-title-login"> USER SIGN IN </h4>

                <InputGroup className="m-2">
  <FormControl
    type="email"
    placeholder="Enter Your Email"
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />
  <InputGroup.Text>
    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.25rem', color: 'black' }} />
  </InputGroup.Text>
</InputGroup>

<InputGroup className="m-2">
  <FormControl
    type={showPassword ? "text" : "password"}
    placeholder="Enter Your Password"
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
  />
  <InputGroup.Text>
    <Button variant="outline-secondary" onClick={togglePasswordVisibility} >
      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '1rem', color: 'black' }} />
    </Button>
  </InputGroup.Text>
</InputGroup>


                <Button type="submit" className="btn btn-block m-2 site-btn-login"> Login </Button>
                <hr />
                <p> <b> Forget My Password? </b><Link to="/forget"><b> Forget Password </b> </Link> </p>
                <p> <b> Don't Have An Account? </b><Link to="/register"><b> Register </b> </Link> </p>
              </Form>
            </Col>
            <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
              <img className="onboardBanner" src={Login} alt="Login" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLogin;
