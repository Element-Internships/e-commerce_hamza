import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProductListByRemark } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import NewArrivalLoading from '../PlaceHolder/NewArrivalLoading';
import { Link } from 'react-router-dom';
import { Card, Container, Row } from 'react-bootstrap';

const NewArrival = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [mainDiv, setMainDiv] = useState('d-none');
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(getProductListByRemark('NEW')); // Use the correct named import
        setProductData(response.data);
        setIsLoading('d-none');
        setMainDiv('');
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <NewArrivalLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>
              NEW ARRIVAL
              <a className="btn btn-sm ml-2 site-btn" onClick={() => sliderRef.current.slickPrev()}>
                <i className="fa fa-angle-left"></i>
              </a>
              &nbsp;
              <a className="btn btn-sm ml-2 site-btn" onClick={() => sliderRef.current.slickNext()}>
                <i className="fa fa-angle-right"></i>
              </a>
            </h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <Row>
            <Slider ref={sliderRef} {...settings}>
              {productData.map((product, i) => (
                <div key={i}>
                  <Link className="text-link" to={`/productdetails/${product.id}`}>
                    <Card className="image-box card">
                      <img className="center" src={product.image} alt={product.title} />
                      <Card.Body>
                        <p className="product-name-on-card">{product.title}</p>
                        {product.special_price === 'na' ? (
                          <p className="product-price-on-card">Price : ${product.price}</p>
                        ) : (
                          <p className="product-price-on-card">
                            Price : <strike className="text-secondary">${product.price}</strike> ${product.special_price}
                          </p>
                        )}
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))}
            </Slider>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NewArrival;
