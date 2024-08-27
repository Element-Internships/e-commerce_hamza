import React, { useState, useEffect } from 'react';
import { getOrderListByUser, postReview } from '../../api/AppURL';

import axios from 'axios';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { Navigate } from 'react-router-dom';

const OrderList = ({ user }) => {
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
 
  

  const fetchOrders = async () => {
     try {
       const response = await axios.get(getOrderListByUser(user.email));
       setProductData(response.data);
     } catch (error) {
       console.error(error);
     }
   };

   useEffect(() => {
     if (user && user.email) {
          fetchOrders();
     }
   }, [user]); 
   
   
   const handlePostReview = async () => {
     if (!name) {
       cogoToast.error("Name Is Required", { position: 'top-right' });
     } else if (!comment) {
       cogoToast.error("Comment Is Required", { position: 'top-right' });
     } else if (!rating) {
       cogoToast.error("Rating Is Required", { position: 'top-right' });
     } else if (comment.length > 150) {
       cogoToast.error("Comments can't be more than 150 characters", { position: 'top-right' });
     } else {
       const formData = new FormData();
     
       formData.append('product_name', productName);
       formData.append('reviewer_name', name);
       formData.append('reviewer_photo', user.profile_photo_url);
       formData.append('reviewer_rating', rating);
       formData.append('reviewer_comments', comment);
       
       try {
         const response = await axios.post(postReview(), formData);
         if (response.data === 1) {
           cogoToast.success("Review Submitted", { position: 'top-right' });
           handleReviewModalClose();
         } else {
           cogoToast.error("Your Request is not done! Try Again", { position: 'top-right' });
         }
       } catch (error) {
         cogoToast.error("Your Request is not done! Try Again", { position: 'top-right' });
       }
     }
   };
   

  const handleReviewModalOpen = (product_code, product_name) => {
    setProductCode(product_code);
    setProductName(product_name);
    setReviewModal(true);
  };

  const handleReviewModalClose = () => {
    setReviewModal(false);
  };

  

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Container>
        <div className="section-title text-center mb-55">
          <h2>Order History By ({user.name})</h2>
        </div>

        <Card>
          <Card.Body>
            <Row>
              {productData.map((product, i) => (
                <div key={i}>
                  <Col md={6} lg={6} sm={6} xs={6}>
                    <h5 className="product-name">{product.product_name}</h5>
                    <h6>Quantity = {product.quantity}</h6>
                    <p>{product.size} | {product.color}</p>
                    <h6>Price = {product.unit_price} x {product.quantity} = {product.total_price}$</h6>
                    <h6>Status = {product.order_status}</h6>
                  </Col>
                  <Button onClick={() => handleReviewModalOpen(product.product_code, product.product_name)} className="btn btn-danger">
                    Post Review
                  </Button>
                  <hr />
                </div>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={reviewModal} onHide={handleReviewModalClose}>
        <Modal.Header closeButton>
          <h6><i className="fa fa-bell"></i> Post Your Review</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Name</label>
            <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder={user.name} />
          </div>

          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Select Product Rating</label>
            <select onChange={(e) => setRating(e.target.value)} className="form-control">
              <option value="">Choose</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Comment</label>
            <textarea onChange={(e) => setComment(e.target.value)} rows={2} className="form-control" type="text" placeholder="Your Comment" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePostReview}>
            Post
          </Button>

          <Button variant="secondary" onClick={handleReviewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderList;
