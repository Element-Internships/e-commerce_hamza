import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProductListByRemark } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import FeaturedLoading from '../PlaceHolder/FeaturedLoading';

const FeaturedProducts = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(getProductListByRemark("FEATURED")); // Use the named import function
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const featuredView = productData.map((product, i) => (
    <Col key={i} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
      <Link className="text-link" to={`/productdetails/${product.id}`}>
        <Card className="image-box card">
          <img className="center" src={product.image} alt={product.title} />
          <Card.Body>
            <p className="product-name-on-card">{product.title}</p>
            {product.special_price === "na" ? (
              <p className="product-price-on-card">Price : ${product.price}</p>
            ) : (
              <p className="product-price-on-card">
                Price : <strike className="text-secondary">${product.price}</strike> ${product.special_price}
              </p>
            )}
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ));

  return (
    <>
      <FeaturedLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>FEATURED PRODUCTS</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <Row>{featuredView}</Row>
        </Container>
      </div>
    </>
  );
};

export default FeaturedProducts;
