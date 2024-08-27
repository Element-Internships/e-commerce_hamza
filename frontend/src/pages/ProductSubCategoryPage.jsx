import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getProductListBySubCategory } from '../api/AppURL'; // Import the named export
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import axios from 'axios';
import SubCategory from '../components/ProductDetails/SubCategory';

const ProductSubCategoryPage = () => {
    const { category, subcategory } = useParams(); // Use useParams to get route parameters
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(getProductListBySubCategory(category, subcategory)) // Use the named export
            .then(response => {
                setProductData(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching products by subcategory:', error);
            });
    }, [category, subcategory]);

    return (
        <>
            <div className="Desktop">
                <NavMenuDesktop />
            </div>
            <div className="Mobile">
                <NavMenuMobile />
            </div>
            <SubCategory Category={category} SubCategory={subcategory} ProductData={productData} />
            <div className="Desktop">
                <FooterDesktop />
            </div>
            <div className="Mobile">
                <FooterMobile />
            </div>
        </>
    );
};

export default ProductSubCategoryPage;
