import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Forget from '../../assets/images/forget.jpg';
import { userForgetPassword } from '../../api/AppURL'; // Use named import
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(userForgetPassword(), { email }) // Use named import function
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        setEmail('');
      })
      .catch((error) => {
        toast.error(error.response.data.message, { position: "top-right" });
      });
  };

  return (
    <Container>
      <Row className="p-2">
        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
          <Row className="text-center">
            <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
              <Form className="onboardForm" onSubmit={formSubmit}>
                <h4 className="section-title-login"> FORGET PASSWORD </h4>
                <input
                  className="form-control m-2"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="btn btn-block m-2 site-btn-login"> Reset Password </Button>
              </Form>
            </Col>
            <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
              <img className="onboardBanner" src={Forget} alt="Forget Password" />
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ForgetPassword;
