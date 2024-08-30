import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router';
import { getNotificationHistory, getUserData } from '../../api/AppURL';

const Notification = () => {
    const [show, setShow] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [notificationMsg, setNotificationMsg] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationDate, setNotificationDate] = useState('');

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return;
        }

        // Fetch user details
        axios.get(getUserData(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setUserEmail(response.data.email);
                
                // Fetch notifications
                return axios.get(getNotificationHistory());
            })
            .then(response => {
                // Filter notifications by user email
                const filteredNotifications = response.data.filter(notification => notification.email === userEmail);
                setNotificationData(filteredNotifications);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [userEmail]);

    const handleClose = () => setShow(false);

    const handleShow = (event) => {
        setShow(true);
        const msg = event.target.getAttribute('data-message');
        const title = event.target.getAttribute('data-title');
        const date = event.target.getAttribute('data-date');
        setNotificationMsg(msg);
        setNotificationTitle(title);
        setNotificationDate(date);
    };

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    const myView = notificationData.map((notification, i) => (
        <Col key={i} className="p-1" md={6} lg={6} sm={12} xs={12}>
            <Card onClick={handleShow} className="notification-card">
                <Card.Body>
                    <h6>{notification.title}</h6>
                    <p className="py-1 px-0 text-primary m-0">
                        <i className="fa fa-bell"></i> Date: {notification.date} | Status: Unread
                    </p>
                    <Button 
                        data-title={notification.title}
                        data-date={notification.date}
                        data-message={notification.message}
                        className="btn btn-danger"
                    >
                        Details
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    ));

    return (
        <>
            <Container className="TopSection">
                <Row>
                    {isLoading ? <p> the notifactions are Loading...</p> : myView}
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h6><i className="fa fa-bell"></i> Date: {notificationDate}</h6>
                </Modal.Header>
                <Modal.Body>
                    <h6>{notificationTitle}</h6>
                    <p>{notificationMsg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Notification;
