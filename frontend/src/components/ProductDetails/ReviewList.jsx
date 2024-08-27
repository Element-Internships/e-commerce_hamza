import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getReviewList } from '../../api/AppURL'; // Named import

const ReviewList = ({ code }) => {
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
           
            if (code && code.trim()) {
                
                
                try {
                    const response = await axios.get(getReviewList(code));

                    
                    setReviewData(response.data);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                    setError('Failed to fetch reviews');
                } finally {
                    setLoading(false);
                }
            } else {
                
                setReviewData([]);
                setLoading(false);
            }
        };

        fetchReviews();
    }, [loading]);

    return (
        <div>
            <h6 className="mt-2">REVIEWS</h6>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : reviewData.length > 0 ? (
                reviewData.map((review) => (
                    <div key={review.id}>
                        <p className="p-0 m-0">
                            <span className="Review-Title">{review.reviewer_name}</span>
                            <span className="text-success">
                                {Array.from({ length: parseInt(review.reviewer_rating, 10) }).map((_, j) => (
                                    <i key={j} className="fa fa-star"></i>
                                ))}
                            </span>
                        </p>
                        <p>{review.reviewer_comments}</p>
                    </div>
                ))
            ) : (
                <p>There are no reviews yet</p>
            )}
        </div>
    );
}

export default ReviewList;
