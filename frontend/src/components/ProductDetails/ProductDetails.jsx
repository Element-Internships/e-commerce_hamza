import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import SuggestedProduct from './SuggestedProduct';
import ReviewList from './ReviewList';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import { addToCart as addToCartAPI, addFavourite as addFavouriteAPI } from '../../api/AppURL';

const ProductDetails = (props) => {
    const [previewImg, setPreviewImg] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productCode, setProductCode] = useState('');
    const [buttonText, setButtonText] = useState({
        addToCart: 'Add To Cart',
        orderNow: 'Order Now',
        addToFav: 'Favourite',
    });
    const [pageRedirectStatus, setPageRedirectStatus] = useState(false);
    const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
   
   


   

useEffect(() => {
     const productAllData = props.data;
     const image = productAllData['productList'][0]['image'];
     const code = productAllData['productList'][0]['product_code'] || '';
   
     if (code) {
         setPreviewImg(image || '');
         setProductCode(code);
        
     } else {
         console.error('Product code is missing');
     }
 }, [props.data]);
 

    const handleImgClick = (event) => setPreviewImg(event.target.getAttribute('src'));

    const validateAndProceed = () => {
        if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
            return false;
        }
        if (props.data['productList'][0]['color'] === 'YES' && !color) {
            cogoToast.error('Please Select Color', { position: 'top-right' });
            return false;
        }
        if (props.data['productList'][0]['size'] === 'YES' && !size) {
            cogoToast.error('Please Select Size', { position: 'top-right' });
            return false;
        }
        if (!quantity) {
            cogoToast.error('Please Select Quantity', { position: 'top-right' });
            return false;
        }
        return true;
    };

    const addToCartHandler = () => {
        if (!validateAndProceed()) return;

        setButtonText(prevState => ({ ...prevState, addToCart: 'Adding...' }));

        const formData = new FormData();
        formData.append('color', color);
        formData.append('size', size);
        formData.append('quantity', quantity);
        formData.append('product_code', productCode);
        formData.append('email', props.user.email);

        axios.post(addToCartAPI(), formData)
            .then(response => {
                if (response.data === 1) {
                    cogoToast.success('Product Added Successfully', { position: 'top-right' });
                    setButtonText(prevState => ({ ...prevState, addToCart: 'Add To Cart' }));
                    setPageRefreshStatus(true);
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                    setButtonText(prevState => ({ ...prevState, addToCart: 'Add To Cart' }));
                }
            })
            .catch(() => {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setButtonText(prevState => ({ ...prevState, addToCart: 'Add To Cart' }));
            });
    };

    const orderNowHandler = () => {
        if (!validateAndProceed()) return;

        setButtonText(prevState => ({ ...prevState, orderNow: 'Ordering...' }));

        const formData = new FormData();
        formData.append('color', color);
        formData.append('size', size);
        formData.append('quantity', quantity);
        formData.append('product_code', productCode);
        formData.append('email', props.user.email);

        axios.post(addToCartAPI(), formData)
            .then(response => {
                if (response.data === 1) {
                    cogoToast.success('Product Added Successfully', { position: 'top-right' });
                    setButtonText(prevState => ({ ...prevState, orderNow: 'Order Now' }));
                    setPageRedirectStatus(true);
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                    setButtonText(prevState => ({ ...prevState, orderNow: 'Order Now' }));
                }
            })
            .catch(() => {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setButtonText(prevState => ({ ...prevState, orderNow: 'Order Now' }));
            });
    };

    const addToFavHandler = () => {
        if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
            return;
        }

        setButtonText(prevState => ({ ...prevState, addToFav: 'Adding...' }));

        axios.get(addFavouriteAPI(productCode, props.user.email))
            .then(response => {
                if (response.data === 1) {
                    cogoToast.success('Product Added to Favourite', { position: 'top-right' });
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                }
                setButtonText(prevState => ({ ...prevState, addToFav: 'Favourite' }));
            })
            .catch(() => {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setButtonText(prevState => ({ ...prevState, addToFav: 'Favourite' }));
            });
    };

    const handleColorChange = (event) => setColor(event.target.value);
    const handleSizeChange = (event) => setSize(event.target.value);
    const handleQuantityChange = (event) => setQuantity(event.target.value);

    if (pageRedirectStatus) return <Navigate to="/cart" />;
    if (pageRefreshStatus) return <Navigate to="/cart" />;

    const productAllData = props.data;
    const product = productAllData['productList'][0];
    const details = productAllData['productDetails'][0];
    
    const { title, brand, category, subcategory, image, price, product_code, special_price, star } = product;
    const { image_one, image_two, image_three, image_four, color: productColor, size: productSize, product_id, short_description, long_description } = details;

    const ColorDiv = productColor !== 'na' ? '' : 'd-none';
    const SizeDiv = productSize !== 'na' ? '' : 'd-none';

    const ColorOptions = productColor !== 'na' ? productColor.split(',').map((color, i) => (
        <option key={i} value={color}>{color}</option>
    )) : null;

    const SizeOptions = productSize !== 'na' ? productSize.split(',').map((size, i) => (
        <option key={i} value={size}>{size}</option>
    )) : null;

    return (
        <Container fluid className="BetweenTwoSection">
            <div className="breadbody">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/productcategory/${category}`}>{category}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/productsubcategory/${category}/${subcategory}`}>{subcategory}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/productdetails/${product_id}`}>{title}</Link></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Row className="p-2">
                <Col className="shadow-sm bg-white pb-3 mt-4">
                    <Row>
                        <Col className="p-3" md={6}>
                            <InnerImageZoom className="detailimage" zoomScale={1.8} zoomType={"hover"} src={previewImg} zoomSrc={previewImg} />
                            <Container className="my-3">
                                <Row>
                                    {[image_one, image_two, image_three, image_four].map((imgSrc, i) => (
                                        <Col key={i} className="p-0 m-0" md={3}>
                                            <img onClick={handleImgClick} className="w-100 smallimage product-sm-img" src={imgSrc} alt={`small view ${i + 1}`} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                        <Col className="p-3" md={6}>
                            <h4 className="text-start">{title}</h4>
                            <h6 className="text-start">Brand : {brand}</h6>
                            <h6 className="text-start">Category : {category}</h6>
                            <h6 className="text-start">Subcategory : {subcategory}</h6>
                            <hr />
                            <h5 className="text-start">Price : {price}</h5>
                            {special_price !== 'na' && <h6 className="text-start text-danger">Special Price : {special_price}</h6>}
                            <h6 className="text-start">Product Code : {product_code}</h6>
                            <h6 className="text-start">Rating : {star} <i className="fa fa-star text-warning"></i></h6>
                            <hr />
                            <Form>
                                <Form.Group className={`mb-3 ${ColorDiv}`} controlId="formBasicColor">
                                    <Form.Label>Select Color</Form.Label>
                                    <Form.Select onChange={handleColorChange} aria-label="Color">
                                        <option>Select Color</option>
                                        {ColorOptions}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className={`mb-3 ${SizeDiv}`} controlId="formBasicSize">
                                    <Form.Label>Select Size</Form.Label>
                                    <Form.Select onChange={handleSizeChange} aria-label="Size">
                                        <option>Select Size</option>
                                        {SizeOptions}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicQuantity">
                                    <Form.Label>Select Quantity</Form.Label>
                                    <Form.Control type="number" placeholder="Quantity" onChange={handleQuantityChange} />
                                </Form.Group>
                                <Button onClick={addToCartHandler} className="btn btn-primary" variant="primary" type="button">
                                    {buttonText.addToCart}
                                </Button>
                                <Button onClick={orderNowHandler} className="btn btn-warning mx-2" variant="warning" type="button">
                                    {buttonText.orderNow}
                                </Button>
                                <Button onClick={addToFavHandler} className="btn btn-danger" variant="danger" type="button">
                                    {buttonText.addToFav}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <h5>Description</h5>
                            <p>{short_description}</p>
                            <p>{long_description}</p>
                        </Col>
                        <Col md={6}>
                            <h5>Suggested Product</h5>
                            <SuggestedProduct subcategory={subcategory} />

                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={12}>
                            <ReviewList code={productCode} />
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
