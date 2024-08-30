import React, { useState } from "react";
import { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = (props) => {
  const [name, setName] = useState(props.user ? props.user.name : "");
  const [email, setEmail] = useState(props.user ? props.user.email : "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/update",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Profile updated successfully.");
      setMessageType("success");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
      setMessageType("error");
    }
  };

  return (
    <Fragment>
      <div className="section-title text-center mb-55">
        <h2>User Profile Page</h2>
      </div>

      <Container>
        <Row>
          <Col lg={4} md={4} sm={12}>
            <Card style={{ width: "18rem" }}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Link className="text-link" to="/orderlist">
                    <p className="product-name-on-card">Order List</p>
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          <Col lg={8} md={8} sm={12}>
            <ul className="list-group">
              <li className="list-group-item">
                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </Form>
              </li>
              {message && (
                <li
                  className={`list-group-item mt-3 ${
                    messageType === "success" ? "text-success" : "text-danger"
                  }`}
                >
                  <p>{message}</p>
                </li>
              )}
              {/* Add this section */}
              <li className="list-group-item mt-3">
                <p>
                  <b>Change Your Password? </b>
                  <Link to="/forget">
                    <b>Change Password</b>
                  </Link>
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
