import { fetchData, postData } from './apiFunctions';

// Example usage of reusable API calls

export const getUsers = () => fetchData<any[]>('/users');
export const getProducts = () => fetchData<any[]>('/products');

export const createOrder = (orderData: any) =>
  postData<typeof orderData, any>('/orders', orderData);