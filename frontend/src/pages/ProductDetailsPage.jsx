import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getProductDetails } from '../api/AppURL'; // Import named export
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SuggestedProduct from '../components/ProductDetails/SuggestedProduct';
import axios from 'axios';
import SliderLoading from '../components/PlaceHolder/SliderLoading';

const ProductDetailsPage = ({ user }) => {
    const { code } = useParams(); // Use useParams to get route parameters
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mainDiv, setMainDiv] = useState("d-none");

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(getProductDetails(code)) 
            .then(response => {
                setProductData(response.data);
                setIsLoading("d-none");
                setMainDiv("");
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching product details:', error);
            });
    }, [code]);

    return (
        <>
            <div className="Desktop">
                <NavMenuDesktop />
            </div>
            <div className="Mobile">
                <NavMenuMobile />
            </div>
            {mainDiv === "d-none" ? (
                <SliderLoading isLoading={isLoading} />
            ) : (
                <ProductDetails data={productData} user={user} />
            )}
            <div className="Desktop">
                <FooterDesktop />
            </div>
            <div className="Mobile">
                <FooterMobile />
            </div>
        </>
    );
};

export default ProductDetailsPage;
