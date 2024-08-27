import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getProductListByCategory } from '../api/AppURL'; // Import named export
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import Category from '../components/ProductDetails/Category';
import axios from 'axios';

const ProductCategoryPage = () => {
    const { category } = useParams(); // Use useParams to get route parameters
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(getProductListByCategory(category)) // Use the named export
            .then(response => {
                setProductData(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching product data:', error);
            });
    }, [category]);

    return (
        <>
            <div className="Desktop">
                <NavMenuDesktop />
            </div>
            <div className="Mobile">
                <NavMenuMobile />
            </div>
            <Category Category={category} ProductData={productData} />
            <div className="Desktop">
                <FooterDesktop />
            </div>
            <div className="Mobile">
                <FooterMobile />
            </div>
        </>
    );
};

export default ProductCategoryPage;
