import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getProductBySearch } from '../api/AppURL'; // Import the named export
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import axios from 'axios';
import SearchList from '../components/ProductDetails/SearchList';

const SearchPage = () => {
    const { searchkey } = useParams(); // Use useParams to get the search key from the route
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (searchkey) { // Check if searchkey exists before making the request
            axios.get(getProductBySearch(searchkey)) // Use the named export
                .then(response => {
                    setProductData(response.data);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching products by search:', error);
                });
        }
    }, [searchkey]);

    return (
        <>
            <div className="Desktop">
                <NavMenuDesktop />
            </div>
            <div className="Mobile">
                <NavMenuMobile />
            </div>
            <SearchList SearchKey={searchkey} ProductData={productData} />
            <div className="Desktop">
                <FooterDesktop />
            </div>
            <div className="Mobile">
                <FooterMobile />
            </div>
        </>
    );
};

export default SearchPage;
