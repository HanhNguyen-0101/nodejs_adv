'use client';
import { Suspense, useEffect, useState } from 'react';
import { CardProduct } from '@/components/shared/CardProduct';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { PAGING } from '@/constants';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { showAlert } from '@/store/alertSlice';
import { getSearchProducts } from '@/axios/apiService';
import { Button } from 'antd';

export default function Page() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    search();
  }, [query]);

  const search = async () => {
    dispatch(showLoading());
    try {
      const payload = {
        skip: 0,
        take: PAGING.TAKE,
        searchTerm: query,
      };

      const productsRes = await getSearchProducts(payload);
      setProducts(productsRes);
    } catch (error) {
      console.error('Error submitting data', error);
      setProducts({});
      dispatch(
        showAlert({
          type: 'error',
          message: error?.response.data.message || error?.message,
        }),
      );
    }
    dispatch(hideLoading());
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const payload = {
        skip: currentPage * PAGING.TAKE,
        take: PAGING.TAKE,
        searchTerm: query,
      };

      const productsRes = await getSearchProducts(payload);
      productsRes.products = [...products.products, ...productsRes.products];

      setProducts(productsRes);
      setCurrentPage(currentPage + 1);
    } catch (error) {}
    setLoading(false);
  };
  return (
    <>
      <div className='mt-4 mb-8 text-lg font-bold'>
          Kết quả tìm kiếm của "{query}"
      </div>
      <Suspense fallback={<>Loading</>}>
        <div className='flex flex-row flex-wrap gap-2 px-8 max-w-7xl mb-5 w-full'>
          {products?.products?.map((product: any) => (
            <CardProduct className='w-[23%]' key={product.id} data={product} />
          ))}
        </div>
        {products?.total > products.products?.length && (
          <Button
            onClick={handleLoadMore}
            loading={loading}
            className='text-lg hover:bg-transparent bg-transparent p-5 border mt-10 px-20 self-center rounded-md text-blue-500 border-blue-500'
          >
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </Suspense>
    </>
  );
}
