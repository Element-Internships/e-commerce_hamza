import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { getFavouriteList, removeFavourite } from '../../api/AppURL';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const Favourite = ({ user }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("d-block");
  const [mainDiv, setMainDiv] = useState("d-none");
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);

  useEffect(() => {
    fetchFavouriteList();
  }, []);

  const fetchFavouriteList = async () => {
    try {
      const response = await axios.get(getFavouriteList(user.email));
      setProductData(response.data);
      setIsLoading("d-none");
      setMainDiv("");
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      setIsLoading("d-none");
    }
  };

  const removeItem = async (event) => {
    const productCode = event.target.getAttribute('data-code');
    const email = user.email;

    try {
      await axios.get(removeFavourite(productCode, email));
      cogoToast.success("Product Item Removed", { position: 'top-right' });
      setPageRefreshStatus(true);
    } catch (error) {
      cogoToast.error("Your Request is not done! Try Again", { position: 'top-right' });
    }
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  if (pageRefreshStatus) {
    const URL = window.location.href;
    return <Navigate to={URL} />;
  }

  return (
    <>
      <Container className="text-center" fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>MY FAVOURITE ITEMS</h2>
          <p>Some Of Our Exclusive Collection, You May Like</p>
        </div>

        <Row>
          {productData.length > 0 ? (
            productData.map((product, i) => (
              <Col key={i} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className="image-box card w-100">
                  <img className="center w-75" src={product.image} alt={product.product_name} />
                  <Card.Body>
                    <p className="product-name-on-card">{product.product_name}</p>
                    <Button onClick={removeItem} data-code={product.product_code} className="btn btn-sm">
                      <i className="fa fa-trash-alt"></i> Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No favorite items found.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Favourite;
