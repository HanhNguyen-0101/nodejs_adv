export const STATUS_CODE = {
    CREATE_SUCCESS: 201,
    SUCCESS: 200,
    ERROR: 404
}
const URL = process.env.NEXT_PUBLIC_URL;

export const REGISTER_URL = URL + '/auth/signup';
export const LOGIN_URL = URL + '/auth/login';
export const CATEGORY_URL = URL + '/categories';
export const SHOP_URL = URL + '/shops';
export const PRODUCT_URL = URL + '/products';
export const ORDER_URL = URL + '/orders/makepayment';
export const SEARCH_URL = URL + '/products';
