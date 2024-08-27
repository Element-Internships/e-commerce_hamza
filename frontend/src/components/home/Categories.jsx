import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCategoryDetails } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import CategoryLoading from '../PlaceHolder/CategoryLoading';

const Categories = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(getAllCategoryDetails()); // Use the named import function
        setMenuData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const categoryView = menuData.map((category, i) => (
    <Col key={i} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
      <Link className="text-link" to={`/productcategory/${category.category_name}`}>
        <Card className="h-100 w-100 text-center">
          <Card.Body>
            <img className="center" src={category.category_image} alt={category.category_name} />
            <h5 className="category-name">{category.category_name}</h5>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ));

  return (
    <>
      <CategoryLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>CATEGORIES</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <Row>
            {categoryView}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Categories;
