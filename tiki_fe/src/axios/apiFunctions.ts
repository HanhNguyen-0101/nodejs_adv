import axiosInstance from './axiosInstance';

export const fetchData = async <T>(url: string, params: any): Promise<T> => {
  try {
    let response;
    if (params) {
      response = await axiosInstance.get(url, { params });
    } else {
      response = await axiosInstance.get(url);
    }
    return response.data as T;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const postData = async <Req, Res>(
  url: string,
  body: Req,
): Promise<Res> => {
  try {
    const response = await axiosInstance.post<Res>(url, body);
    return response.data; // Type-safe response data
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    throw error;
  }
};
