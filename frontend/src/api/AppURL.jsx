const BaseURL = "http://127.0.0.1:8000/api";

export const getVisitorDetails = () => `${BaseURL}/getvisitor`;
export const postContact = () => `${BaseURL}/postcontact`;
export const getAllSiteInfo = () => `${BaseURL}/allsiteinfo`;
export const getAllCategoryDetails = () => `${BaseURL}/allcategory`;

export const getProductListByRemark = (remark) => `${BaseURL}/productlistbyremark/${remark}`;
export const getProductListByCategory = (category) => `${BaseURL}/productlistbycategory/${category}`;
export const getProductListBySubCategory = (category, subcategory) => `${BaseURL}/productlistbysubcategory/${category}/${subcategory}`;

export const getAllSlider = () => `${BaseURL}/allslider`;
export const getProductDetails = (code) => `${BaseURL}/productdetails/${code}`;
export const getNotificationHistory = () => `${BaseURL}/notification`;
export const getProductBySearch = (searchkey) => `${BaseURL}/search/${searchkey}`;

export const userLogin = () => `${BaseURL}/login`;
export const getUserData = () => `${BaseURL}/user`;
export const userRegister = () => `${BaseURL}/register`;
export const userForgetPassword = () => `${BaseURL}/forgetpassword`;
export const userResetPassword = () => `${BaseURL}/resetpassword`;

export const getSimilarProduct = (code) => `${BaseURL}/similar/${code}`;
export const getReviewList = (code) => `${BaseURL}/reviewlist/${code}`;

export const addToCart = () => `${BaseURL}/addtocart`;
export const getCartCount = (email) => `${BaseURL}/cartcount/${email}`;
export const addFavourite = (productCode, email) => `${BaseURL}/favourite/${productCode}/${email}`;
export const getFavouriteList = (email) => `${BaseURL}/favouritelist/${email}`;
export const removeFavourite = (productCode, email) => `${BaseURL}/favouriteremove/${productCode}/${email}`;
export const getCartList = (email) => `${BaseURL}/cartlist/${email}`;
export const removeCartList = (id) => `${BaseURL}/removecartlist/${id}`;
export const updateCartItemPlus = (id, quantity, price) => `${BaseURL}/cartitemplus/${id}/${quantity}/${price}`;
export const updateCartItemMinus = (id, quantity, price) => `${BaseURL}/cartitemminus/${id}/${quantity}/${price}`;
export const cartOrder = () => `${BaseURL}/cartorder`;

export const getOrderListByUser = (email) => `${BaseURL}/orderlistbyuser/${email}`;
export const postReview = () => `${BaseURL}/postreview`;
