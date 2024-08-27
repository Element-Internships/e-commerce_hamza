import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllSiteInfo } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

const Privacy = () => {
    const [privacy, setPrivacy] = useState('');
    const [loaderDiv, setLoaderDiv] = useState('block');
    const [mainDiv, setMainDiv] = useState('hidden');

    useEffect(() => {
        axios.get(getAllSiteInfo()).then(response => { // Use the named import function
            if (response.status === 200) {
                const jsonData = response.data[0]['privacy'];
                setPrivacy(jsonData);
                setLoaderDiv('hidden');
                setMainDiv('block');
            }
        }).catch(error => {
            console.error('Error fetching privacy info:', error);
        });
    }, []);

    return (
        <Fragment>
            <Container className="py-8">
                <div className="mb-6">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Row className="p-4 bg-white shadow-lg rounded-lg">
                    <Col md={12}>
                        {/* Placeholder loading animation */}
                        <div className={`${loaderDiv} flex justify-center items-center`}>
                            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
                        </div>
                        {/* Actual content */}
                        <div className={`${mainDiv} transition-opacity duration-500 ease-in-out`}>
                            <h4 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h4>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {ReactHtmlParser(privacy)}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Privacy;
