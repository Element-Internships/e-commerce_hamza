import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllSiteInfo } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Purchase = () => {
    const [purchase, setPurchase] = useState('');
    const [loaderDiv, setLoaderDiv] = useState('block');
    const [mainDiv, setMainDiv] = useState('hidden');

    useEffect(() => {
        const siteInfoPurchase = sessionStorage.getItem('SiteInfoPurchase');

        if (siteInfoPurchase === null) {
            axios.get(getAllSiteInfo()).then(response => { // Use the named import function
                if (response.status === 200) {
                    const jsonData = response.data[0]['parchase_guide'];
                    setPurchase(jsonData);
                    setLoaderDiv('hidden');
                    setMainDiv('block');
                    sessionStorage.setItem('SiteInfoPurchase', jsonData);
                } else {
                    toast.error('Something Went Wrong', {
                        position: 'bottom-center'
                    });
                }
            }).catch(error => {
                toast.error('Something Went Wrong', {
                    position: 'bottom-center'
                });
            });
        } else {
            setPurchase(siteInfoPurchase);
            setLoaderDiv('hidden');
            setMainDiv('block');
        }
    }, []);

    return (
        <Fragment>
            <Container className="py-6">
                <div className="mb-6">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/purchase" className="text-blue-600 hover:text-blue-800">Purchase</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Row className="p-4 bg-white shadow-lg rounded-lg">
                    <Col md={12}>
                        {/* Placeholder loading animation */}
                        <div className={`flex justify-center items-center ${loaderDiv}`}>
                            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
                        </div>
                        {/* Actual content */}
                        <div className={`transition-opacity duration-500 ease-in-out ${mainDiv}`}>
                            <h4 className="text-3xl font-semibold mb-4 text-gray-800">Purchase Guide</h4>
                            <p className="text-lg text-gray-600">
                                {ReactHtmlParser(purchase)}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Fragment>
    );
};

export default Purchase;
