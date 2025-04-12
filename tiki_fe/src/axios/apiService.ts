import { fetchData, postData } from './apiFunctions';

// Example usage of reusable API calls
export const login = (data: any) =>
  postData<typeof data, any>('/auth/login', data);
export const register = (data: any) =>
  postData<typeof data, any>('/auth/signup', data);

export const getUsers = () => fetchData<any[]>('/users');

export const getProducts = (p0?: {
  where?: string;
  relate?: string;
  skip?: number;
  take?: number;
  searchTerm?: string;
}) => fetchData<any[]>('/products', p0);
export const getProduct = (slug: string) => fetchData<any>(`/products/${slug}`);

export const getCategories = () => fetchData<any[]>('/categories');
export const getTags = () => fetchData<any[]>('/tags');

export const createOrder = (orderData: any) =>
  postData<typeof orderData, any>('/orders/makepayment', orderData);
