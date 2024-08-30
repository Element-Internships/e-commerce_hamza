import React, { useState, useEffect, Fragment } from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import Bars from "../../assets/images/bars.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MegaMenuAll from "../home/MegaMenuAll";
import axios from "axios";
import { getCartCount } from "../../api/AppURL"; 
import EcomerceLogo from "../../assets/images/ecomerce.png";

const NavMenuDesktop = (props) => {
  const [SideNavState, setSideNavState] = useState("sideNavClose");
  const [ContentOverState, setContentOverState] = useState("ContentOverlayClose");
  const [Searchkey, setSearchkey] = useState("");
  const [SearchRedirectStatus, setSearchRedirectStatus] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const nav=useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    let product_code = props.product_code;
    axios.get(getCartCount(product_code)) 
      .then((response) => {
        setCartCount(response.data);
      });
  }, [props.product_code]);


  useEffect(() => {
    if (localStorage.getItem("token")){
    
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });;
        setEmail(userResponse.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }
  }, []);

  useEffect(() => {
    if (email) {
     
      const fetchFavoriteList = async () => {
        try {
          const favoriteResponse = await axios.get(`http://127.0.0.1:8000/api/favouritelist/${email}`);
          setFavoriteCount(favoriteResponse.data.length);
        } catch (error) {
          console.error('Error fetching favorite list:', error);
        }
      };

      fetchFavoriteList();
    }
  }, [email]);



  useEffect(() => {
    if (email) {
      const fetchNotificationCount = async () => {
        try {
          const notificationsResponse = await axios.get('http://127.0.0.1:8000/api/notification');
      const userNotifications = notificationsResponse.data.filter(notification => notification.email === email);
    
      setNotificationCount(userNotifications.length);
  
        } catch (error) {
          console.error('Error fetching notification count:', error);
        }
      };

      fetchNotificationCount();
    }
  }, [email]);

  const logout = () => {
    localStorage.clear();
   
    
  };

  const SearchOnChange = (event) => {
    setSearchkey(event.target.value);
  };

  const SearchOnClick = () => {
    if (Searchkey.length >= 2) {
      setSearchRedirectStatus(true);
    }
  };

  const searchRedirect = () => {
    if (SearchRedirectStatus === true) {
      return <Navigate to={`/productbysearch/${Searchkey}`} />;
    }
  };

  const MenuBarClickHandler = () => {
    SideNavOpenClose();
  };

  const ContentOverlayClickHandler = () => {
    SideNavOpenClose();
  };

  const SideNavOpenClose = () => {
    if (SideNavState === "sideNavOpen") {
      setSideNavState("sideNavClose");
      setContentOverState("ContentOverlayClose");
    } else {
      setSideNavState("sideNavOpen");
      setContentOverState("ContentOverlayOpen");
    }
  };

  let buttons;
  if (localStorage.getItem("token")) {
    buttons = (
      <div>
        <Link to="/favourite" className="btn">
          <i className="fa h4 fa-heart"></i>
          <sup>
            <span className="badge text-white bg-danger">{favoriteCount}</span>
          </sup>
        </Link>

        <Link to="/notification" className="btn">
          <i className="fa h4 fa-bell"></i>
          <sup>
            <span className="badge text-white bg-danger">{notificationCount}</span>
          </sup>
        </Link>

        <Link to="/profile" className="h4 btn">
          PROFILE
        </Link>
        <Link to="/" onClick={logout} className="h4 btn">
          LOGOUT
        </Link>

        <Link to="/cart" className="cart-btn">
          <i className="fa fa-shopping-cart"></i> {cartCount} Items{" "}
        </Link>
      </div>
    );
  } else {
    buttons = (
      <div>
        <Link to="/favourite" className="btn">
          <i className="fa h4 fa-heart"></i>
          <sup>
            <span className="badge text-white bg-danger">0</span>
          </sup>
        </Link>

        <Link to="/notification" className="btn">
          <i className="fa h4 fa-bell"></i>
          <sup>
            <span className="badge text-white bg-danger">0</span>
          </sup>
        </Link>

        <Link to="/login" className="h4 btn">
          LOGIN
        </Link>
        <Link to="/register" className="h4 btn">
          REGISTER
        </Link>

        <Link to="/cart" className="cart-btn">
          <i className="fa fa-shopping-cart"></i> 0 Items{" "}
        </Link>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="TopSectionDown">
        <Navbar fixed={"top"} className="navbar" bg="light">
          <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
              {/* i need to add in navbar my app logo ecomerce.png with very creative shape  */}
                <div className="logo-holder logo-1">  
                  <img
                    onClick={MenuBarClickHandler}
                    style={{ display: "inline-block" }}
                    className="bar-img"
                    src={Bars}
                  />
                  <Link to="/">
                    <h3>SaveMart</h3>
                  </Link>
                  <span className="free text-xl font-medium ml-5 bg-gray-200 p-2 rounded-md shadow-sm">Free Shipping for all Orders of $99</span>
                  
                </div>
                
              </Col>
              

              <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                <div className="input-group w-100">
                  <input
                    onChange={SearchOnChange}
                    type="text"
                    className="form-control"
                  />

                  <Button
                    onClick={SearchOnClick}
                    type="button"
                    className="btn site-btn"
                  >
                    <i className="fa fa-search"> </i>
                  </Button>
                </div>
              </Col>

              <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                {buttons}
              </Col>
            </Row>
            {searchRedirect()}
          </Container>
        </Navbar>
      </div>

      <div className={SideNavState}>
        <MegaMenuAll />
      </div>

      <div onClick={ContentOverlayClickHandler} className={ContentOverState}></div>
    </Fragment>
  );
};

export default NavMenuDesktop;
