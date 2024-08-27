import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Forget from '../../assets/images/forget.jpg';
import { userResetPassword } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(userResetPassword(), formData) // Use the named import function
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        setFormData({ token: '', email: '', password: '', password_confirmation: '' });
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
              <Form className="onboardForm" onSubmit={formSubmit} id="fromreset">
                <h4 className="section-title-login"> RESET PASSWORD </h4>
                <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Enter Your Pin Code"
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
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
                  placeholder="Your New Password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                  className="form-control m-2"
                  type="password"
                  placeholder="Confirm Your Password"
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                />
                <Button type="submit" className="btn btn-block m-2 site-btn-login"> Reset Password </Button>
              </Form>
            </Col>
            <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
              <img className="onboardBanner" src={Forget} alt="Reset Password" />
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ResetPassword;
