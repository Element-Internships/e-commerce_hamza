import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProductListByRemark } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import CollectionLoading from '../PlaceHolder/CollectionLoading';

const Collection = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(getProductListByRemark("COLLECTION")); // Use the named import function
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollection();
  }, []);

  const collectionView = productData.map((product, i) => (
    <Col key={i} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
      <Link className="text-link" to={`/productdetails/${product.id}`}>
        <Card className="image-box card w-100">
          <img className="center w-75" src={product.image} alt={product.title} />
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
      <CollectionLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>PRODUCT COLLECTION</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <Row>{collectionView}</Row>
        </Container>
      </div>
    </>
  );
};

export default Collection;
