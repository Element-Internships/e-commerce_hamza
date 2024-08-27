import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { getAllSiteInfo } from '../../api/AppURL';
import Userimage from "../../assets/images/User.png";

const About = () => {
    const [about, setAbout] = useState('');
    const [loaderDiv, setLoaderDiv] = useState('');
    const [mainDiv, setMainDiv] = useState('d-none');

    useEffect(() => {
        axios.get(getAllSiteInfo()).then(response => {
            if (response.status === 200) {
                const jsonData = response.data[0]['about'];
                setAbout(jsonData);
                setLoaderDiv('d-none');
                setMainDiv('');
            }
        }).catch(error => {
            console.error('Error fetching about info:', error);
        });
    }, []);

    return (
        <Fragment>
            <Container>
              
                <div className="mb-4">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Row className="p-2">
                    <Col md={12} className="shadow-lg bg-white mt-2 rounded-lg p-6">
                        
                        <div className={loaderDiv}>
                            <div className="animate-pulse text-center text-lg font-semibold">Loading...</div>
                        </div>

                        
                        <div className={mainDiv}>
                        <div>
                                        <h1 className="text-5xl font-extrabold">Welcome to SaveMart Company</h1>
                                        <p className="text-lg mt-4">Your trusted partner in quality and affordability.</p>
                                    </div>
                            
                            <section className="hero-section bg-cover bg-center relative" style={{ backgroundImage: `url(${Userimage})` , height: '400px' }}>
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-4">
                                   
                                </div>
                            </section>

                            
                            <section className="our-story my-12">
                                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                                <p className="text-gray-700 text-lg leading-relaxed">{ReactHtmlParser(about)}</p>
                            </section>

                            
                            <section className="our-values my-12">
                                <h2 className="text-4xl font-bold mb-6">Our Values</h2>
                                <Row className="space-y-6 md:space-y-0 md:space-x-6">
                                    <Col md={3} className="mb-4">
                                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out">
                                            <h3 className="text-2xl font-bold mb-2">Customer First</h3>
                                            <p className="text-gray-700">We put our customers at the heart of everything we do.</p>
                                        </div>
                                    </Col>
                                    <Col md={3} className="mb-4">
                                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out">
                                            <h3 className="text-2xl font-bold mb-2">Quality</h3>
                                            <p className="text-gray-700">We ensure that every product we offer meets the highest standards.</p>
                                        </div>
                                    </Col>
                                    <Col md={3} className="mb-4">
                                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out">
                                            <h3 className="text-2xl font-bold mb-2">Affordability</h3>
                                            <p className="text-gray-700">Providing value without compromising on quality.</p>
                                        </div>
                                    </Col>
                                    <Col md={3} className="mb-4">
                                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out">
                                            <h3 className="text-2xl font-bold mb-2">Integrity</h3>
                                            <p className="text-gray-700">We operate with honesty and transparency in all our business dealings.</p>
                                        </div>
                                    </Col>
                                </Row>
                            </section>

                            <section className="meet-the-team my-12">
    <h2 className="text-4xl font-bold mb-6 text-center">Meet the Team</h2>
    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out text-center">
            <img src={Userimage} alt="Hamza AbuAmrea" className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-gray-300 shadow-xl" />
            <h5 className="text-xl font-bold text-gray-800">Hamza AbuAmrea</h5>
            <p className="text-gray-700">CEO</p>
        </div>
        <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out text-center">
            <img src={Userimage} alt="Khader Handal" className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-gray-300 shadow-xl" />
            <h5 className="text-xl font-bold text-gray-800">Khader Handal</h5>
            <p className="text-gray-700">COO</p>
        </div>
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg shadow-lg hover:bg-white transition-all ease-in-out text-center">
            <img src={Userimage} alt="Sohaib Alkhateb" className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-gray-300 shadow-xl" />
            <h5 className="text-xl font-bold text-gray-800">Sohaib Alkhateb</h5>
            <p className="text-gray-700">CTO</p>
        </div>
    </div>
</section>


                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default About;
