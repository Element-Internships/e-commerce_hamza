import React from 'react';
import { Container } from 'react-bootstrap';

const CategoryLoading = ({ isLoading }) => {
    return (
        <div className={isLoading}>
            <Container className="text-center" fluid={true}>
                <div className="section-title text-center mb-55">
                    <h2>CATEGORIES</h2>
                    <p>Some Of Our Exclusive Collection, You May Like</p>
                </div>
                <div className="row">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100 w-100">
                                <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default CategoryLoading;
