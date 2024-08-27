import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Category = ({ ProductData, Category }) => {
    const MyView = ProductData.map((ProductList, i) => (
        <Col key={i} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
            <Link className="text-link" to={`/productdetails/${ProductList.id}`}>
                <Card className="image-box card w-100">
                    <img className="center w-75" src={ProductList.image} alt={ProductList.title} />
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
        <>
            <Container className="text-center" fluid={true}>
                <div className="breadbody">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={`/productcategory/${Category}`}>{Category}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="section-title text-center mb-40 mt-2">
                    <h2>{Category}</h2>
                </div>
                <Row>
                    {MyView}
                </Row>
            </Container>
        </>
    );
};

export default Category;
