import React, { useState, useEffect } from 'react';
import HomeSlider from './HomeSlider';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllSlider } from '../../api/AppURL'; // Correct named import
import axios from 'axios';

const HomeTopMobile = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get(getAllSlider()); // Use the named import function
        setSliderData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSliderData();
  }, []);

  return (
    <Container className="p-0 m-0 overflow-hidden" fluid={true}>
      <Row className="p-0 m-0 overflow-hidden">
        <Col lg={12} md={12} sm={12}>
          <HomeSlider data={sliderData} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeTopMobile;
