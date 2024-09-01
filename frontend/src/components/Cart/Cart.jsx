import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { Navigate } from 'react-router-dom';
import {
  addToCart,
  cartOrder,
  removeCartList,
  updateCartItemPlus,
  updateCartItemMinus,
  getCartList
} from '../../api/AppURL';

const Cart = ({ user }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pageRedirectStatus, setPageRedirectStatus] = useState(false);

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const response = await axios.get(getCartList(user.email));
        setProductData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        cogoToast.error("Failed to fetch cart data", { position: 'top-right' });
      }
    };

    fetchCartList();
  }, [user.email]);

  const removeItem = async (id) => {
    try {
      const response = await axios.get(removeCartList(id));
      if (response.data === 1) {
        cogoToast.success("Cart Item Removed", { position: 'top-right' });
        setProductData(prevData => prevData.filter(item => item.id !== id));
      } else {
        cogoToast.error("Request failed, try again", { position: 'top-right' });
      }
    } catch (error) {
      cogoToast.error("Request failed, try again", { position: 'top-right' });
    }
  };

  const itemPlus = async (id, quantity, price) => {
    try {
      
      const qty = parseInt(quantity, 10);
      const unitPrice = parseFloat(price);
  
      const response = await axios.get(updateCartItemPlus(id, qty, unitPrice));
      if (response.data === 1) {
        cogoToast.success("Item Quantity Increased", { position: 'top-right' });
        setProductData(prevData =>
          prevData.map(item =>
            item.id === id
              ? { 
                  ...item, 
                  quantity: qty + 1, 
                  total_price: Number((qty + 1) * unitPrice).toFixed(2)
                }
              : item
          )
        );
      } else {
        cogoToast.error("Request failed, try again", { position: 'top-right' });
      }
    } catch (error) {
      cogoToast.error("Request failed, try again", { position: 'top-right' });
    }
  };
  

  const itemMinus = async (id, quantity, price) => {
    try {
      if (quantity > 1) {
        const response = await axios.get(updateCartItemMinus(id, quantity, price));
        if (response.data === 1) {
          cogoToast.success("Item Quantity Decreased", { position: 'top-right' });
          setProductData(prevData =>
            prevData.map(item =>
              item.id === id
                ? { 
                    ...item, 
                    quantity: item.quantity - 1, 
                    total_price: (item.quantity - 1) * parseInt(item.unit_price) 
                  }
                : item
            )
          );
        } else {
          cogoToast.error("Request failed, try again", { position: 'top-right' });
        }
      } else {
        cogoToast.warn("Quantity can't be less than 1", { position: 'top-right' });
      }
    } catch (error) {
      cogoToast.error("Request failed, try again", { position: 'top-right' });
    }
  };
  

  const confirmOnClick = async () => {
    if (!city || !payment || !name || !address) {
      cogoToast.error("Please fill in all fields", { position: 'top-right' });
      return;
    }

    const invoice = new Date().getTime();
    const myFormData = new FormData();
    myFormData.append('city', city);
    myFormData.append('payment_method', payment);
    myFormData.append('name', name);
    myFormData.append('delivery_address', address);
    myFormData.append('email', user.email);
    myFormData.append('invoice_no', invoice);
    myFormData.append('delivery_charge', "25");

    try {
      const response = await axios.post(cartOrder(), myFormData);
      if (response.data === 1) {
        cogoToast.success("Order Request Received", { position: 'top-right' });
        setPageRedirectStatus(true);
      } else {
        cogoToast.error("Request failed, try again", { position: 'top-right' });
      }
    } catch (error) {
      cogoToast.error("Request failed, try again", { position: 'top-right' });
    }
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const totalPriceSum = productData.reduce((sum, product) => sum + parseInt(product.total_price), 0);

  const myView = productData.map((product, i) => (
    <div key={i}>
      <Card>
        <Card.Body>
          <Row>
            <Col md={3} lg={3} sm={6} xs={6}>
              <img className="cart-product-img" src={product.image} alt={product.product_name} />
            </Col>
            <Col md={6} lg={6} sm={6} xs={6}>
              <h5 className="product-name">{product.product_name}</h5>
              <h6>Quantity = {product.quantity}</h6>
              <p>{product.size} | {product.color}</p>
              {/* <h6>Price = {product.unit_price} x {product.quantity} = {product.total_price}$</h6> */}
              <h6>
               Price = {product.unit_price} x {product.quantity} = {Number(product.total_price).toFixed(2)}$
               </h6>


            </Col>
            <Col md={3} lg={3} sm={12} xs={12}>
              <Button onClick={() => removeItem(product.id)} className="btn mt-2 mx-1 btn-lg site-btn">
                <i className="fa fa-trash-alt"></i>
              </Button>
              <Button onClick={() => itemPlus(product.id, product.quantity, product.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn">
                <i className="fa fa-plus"></i>
              </Button>
              <Button onClick={() => itemMinus(product.id, product.quantity, product.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn">
                <i className="fa fa-minus"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <Fragment>
      <Container fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>Product Cart List</h2>
        </div>
        <Row>
          <Col className="p-1" lg={7} md={7} sm={12} xs={12}>
            {isLoading ? <p>Loading...</p> : myView}
          </Col>
          <Col className="p-1" lg={5} md={5} sm={12} xs={12}>
            <div className="card p-2">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <h5 className="Product-Name text-danger">Total Due: {totalPriceSum} $</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Choose City</label>
                      <select onChange={(e) => setCity(e.target.value)} className="form-control">
                        <option value="">Choose</option>
                        <option value="Bethlehem">Bethlehem</option>
                        <option value="Jerusalem">Jerusalem</option>
                        <option value="Hebron">Hebron</option>
                        <option value="Gaza">Gaza</option>
                        <option value="Ramallah">Ramallah</option>
                        <option value="Jericho">Jericho</option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Choose Payment Method</label>
                      <select onChange={(e) => setPayment(e.target.value)} className="form-control">
                        <option value="">Choose</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Stripe">Stripe</option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Your Name</label>
                      <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" />
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Delivery Address</label>
                      <textarea onChange={(e) => setAddress(e.target.value)} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <Button onClick={confirmOnClick} className="btn btn-primary form-control">Confirm Order</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {pageRedirectStatus && <Navigate to="/orderlist" />}
    </Fragment>
  );
};

export default Cart;
