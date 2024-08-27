import React, { useEffect, useState, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUserData } from '../api/AppURL'; 
import AboutPage from '../pages/AboutPage';
import CartPage from '../pages/CartPage';
import ContactPage from '../pages/ContactPage';
import FavouritePage from '../pages/FavouritePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import PrivacyPage from '../pages/PrivacyPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import ProfilePage from '../pages/ProfilePage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SearchPage from '../pages/SearchPage';
import UserLoginPage from '../pages/UserLoginPage';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderListPage from '../pages/OrderListPage';
import axios from 'axios';
import Err404 from '../components/others/404';
import "../components/Loading/Loading.css";
import LoadingSubmit from '../components/Loading/Loading';

const AppRoute = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (retries = 5, delay = 1000) => {
      const token = localStorage.getItem('token');

      if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
      }

      try {
          const response = await axios.get(getUserData(), {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setUser(response.data); // Update the user state with the fetched data
      } catch (error) {
          console.error('Error fetching user data:', error.message || error);
          if (error.response && error.response.status === 429 && retries > 0) {
              // Retry after delay
              setTimeout(() => fetchUserData(retries - 1, delay * 2), delay);
          }
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchUserData();
  }, []);

  if (loading) return <div><LoadingSubmit/></div>;

  return (
      <Fragment>
          <NavMenuDesktop user={user} setUser={setUser} />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<UserLoginPage user={user} setUser={setUser} />} />
              <Route path="/register" element={<RegisterPage user={user} setUser={setUser} />} />
              <Route path="/forget" element={<ForgetPasswordPage />} />
              <Route path="/reset/:id" element={<ResetPasswordPage />} />
              <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/productdetails/:code" element={<ProductDetailsPage user={user} />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/favourite" element={<FavouritePage user={user} />} />
              <Route path="/cart" element={<CartPage user={user} />} />
              <Route path="/productcategory/:category" element={<ProductCategoryPage />} />
              <Route path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage />} />
              <Route path="/productbysearch/:searchkey" element={<SearchPage />} />
              <Route path="/orderlist" element={<OrderListPage user={user} />} />
              <Route path='/*' element={<Err404/>}/>
          </Routes>
      </Fragment>
  );
};

export default AppRoute;
