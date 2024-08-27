import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSimilarProduct } from '../../api/AppURL'; // Import named export
import axios from 'axios';

const SuggestedProduct = ({ subcategory }) => {
    const [ProductData, setProductData] = useState([]);

    useEffect(() => {
        axios.get(getSimilarProduct(subcategory)) // Use named export function
            .then(response => setProductData(response.data))
            .catch(error => {
                // Handle error
                console.error("Error fetching suggested products:", error);
            });
    }, [subcategory]);

    const MyView = ProductData.map((ProductList, i) => (
        <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link className="text-link" to={`/productdetails/${ProductList.id}`}>
                <Card className="image-box card">
                    <img className="center" src={ProductList.image} alt={ProductList.title} />
                    <Card.Body>
                        <p className="product-name-on-card">{ProductList.title}</p>
                        {ProductList.special_price === "na" ? (
                            <p className="product-price-on-card">Price : ${ProductList.price}</p>
                        ) : (
                            <p className="product-price-on-card">
                                Price : <strike className="text-secondary">${ProductList.price}</strike> ${ProductList.special_price}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    ));

    return (
        <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
                <h2>YOU MAY ALSO LIKE</h2>
                <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>
            <Row>
                {ProductData.length > 0 ? MyView : <p>There have no similar product</p>}
            </Row>
        </Container>
    );
};

export default SuggestedProduct;
