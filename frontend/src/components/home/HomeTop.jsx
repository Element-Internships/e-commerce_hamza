import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MegaMenu from './MegaMenu';
import HomeSlider from './HomeSlider';
import { getAllCategoryDetails, getAllSlider } from '../../api/AppURL'; // Correct named imports
import axios from 'axios';
import SliderLoading from '../PlaceHolder/SliderLoading';

const HomeTop = () => {
  const [menuData, setMenuData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await axios.get(getAllCategoryDetails()); 
        setMenuData(menuResponse.data);

        const sliderResponse = await axios.get(getAllSlider()); 
        setSliderData(sliderResponse.data);
        setIsLoading("d-none");
        setMainDiv("");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SliderLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="p-0 m-0 overflow-hidden" fluid={true}>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <MegaMenu data={menuData} />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <HomeSlider data={sliderData} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomeTop;
