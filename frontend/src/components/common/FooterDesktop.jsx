import React, { useState, useEffect, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Apple from '../../assets/images/apple.png';
import Google from '../../assets/images/google.png';
import breadcrumb from '../../assets/images/breadcrumb.jpg';
import { getAllSiteInfo } from '../../api/AppURL'; // Use named import
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const FooterDesktop = () => {
  const [address, setAddress] = useState("");
  const [androidAppLink, setAndroidAppLink] = useState("");
  const [iosAppLink, setIosAppLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [loaderDiv, setLoaderDiv] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    axios.get(getAllSiteInfo()) // Use named import function
      .then(response => {
        let statusCode = response.status;
        if (statusCode === 200) {
          let jsonData = response.data[0];
          setAddress(jsonData['address']);
          setAndroidAppLink(jsonData['android_app_link']);
          setIosAppLink(jsonData['ios_app_link']);
          setFacebookLink(jsonData['facbook_link']);
          setTwitterLink(jsonData['twitter_link']);
          setInstagramLink(jsonData['instagram_link']);
          setCopyrightText(jsonData['copyright_text']);
          setLoaderDiv("d-none");
          setMainDiv("");
        }
      })
      .catch(error => {
        // Handle error if necessary
      });
  }, []);

  return (
    <Fragment>


  <div className="footerback m-0 pt-3 shadow-sm mt-3">
    <Container>
      <Row className="px-0 my-5">
        <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
          <div className={loaderDiv}>
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-row">
                  <div className="ph-col-4"></div>
                  <div className="ph-col-8 empty"></div>
                  <div className="ph-col-6"></div>
                  <div className="ph-col-6 empty"></div>
                  <div className="ph-col-12"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
            </div>
          </div>

          <div className={mainDiv}>
            <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
            {ReactHtmlParser(address)}
          </div>

          <h5 className="footer-menu-title pt-3 ">SOCIAL LINK</h5>
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
            <i className="fab m-1 h4 fa-facebook"></i>
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer">
            <i className="fab m-1 h4 fa-instagram"></i>
          </a>
          <a href={twitterLink} target="_blank" rel="noopener noreferrer">
            <i className="fab m-1 h4 fa-twitter"></i>
          </a>
        </Col>

        <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
          <h5 className="footer-menu-title">THE COMPANY</h5>
          <Link to="/about" className="footer-link">About Us</Link>
          <br />
          <Link to="/" className="footer-link">Company Profile</Link>
          <br />
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <br />
        </Col>

        <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
          <h5 className="footer-menu-title">MORE INFO</h5>
          <Link to="/purchase" className="footer-link">How To Purchase</Link>
          <br />
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <br />
          <Link to="/refund" className="footer-link">Refund Policy</Link>
          <br />
        </Col>

        <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
          <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
          <a href={androidAppLink} target="_blank" rel="noopener noreferrer">
            <img src={Google} alt="Google Play Store" />
          </a>
          <br />
          <a href={iosAppLink} target="_blank" rel="noopener noreferrer">
            <img className="mt-2" src={Apple} alt="Apple App Store" />
          </a>
          <br />
          Change Your Language
          <br />
          <div id="google_translate_element"></div>
        </Col>
      </Row>
    </Container>

    <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
      <Container>
        <Row>
         

          <section
  className="bg-cover bg-center bg-no-repeat py-16"
  style={{ backgroundImage: `url(${breadcrumb})`, height: '160px' , marginBottom: 0 }}
>
  <div className="container mx-auto">
    <div className="flex justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white pt-3">SaveMart Palestinian Company</h2>
        <div className="mt-4">
        <h6 className="text-white">{ReactHtmlParser(copyrightText)}</h6>
        </div>
      </div>
    </div>
  </div>
</section>
        </Row>
      </Container>
    </Container>
  </div>
</Fragment>

  );
};

export default FooterDesktop;
