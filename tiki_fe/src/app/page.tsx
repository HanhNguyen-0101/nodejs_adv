'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Button } from 'antd';
import { RootState } from '@/store';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { getAll as getCategoriesSlice } from '@/store/categorySlice';
import { getAll as getTagsSlice } from '@/store/tagSlice';
import { getAll as getProductsSlice } from '@/store/productSlice';
import { getCategories, getProducts, getTags } from '@/axios/apiService';
import { CardProduct } from '@/components/shared/CardProduct';
import { SliderBanner } from '@/components/home';
import categoriesData from '@/data/categories.json';
import tagsData from '@/data/tags.json';
import productsData from '@/data/products_1.json';
import { banners, PAGING } from '@/constants';

export default function Home() {
  const { categories } = useSelector((state: RootState) => state.category);
  const { tags } = useSelector((state: RootState) => state.tag);
  const { products } = useSelector((state: RootState) => state.product);

  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState({
    categoryId: 0,
    tagId: 0,
  });
  const [paging, setPaging] = useState({
    page: 1,
    take: PAGING.TAKE,
  });
  const [loading, setLoading] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    getProductData();
  }, []);

  useEffect(() => {
    getProductData();
  }, [filter.categoryId, filter.tagId]);

  const getData = async () => {
    dispatch(showLoading());
    try {
      // const categoriesRes = await getCategories();
      // const tagsRes = await getTags();
      const categoriesRes = categoriesData.categories;
      const tagsRes = tagsData.tags;
      dispatch(getCategoriesSlice(categoriesRes));
      dispatch(getTagsSlice(tagsRes));
    } catch (error) {}
    dispatch(hideLoading());
  };

  const getProductData = async () => {
    dispatch(showLoading());
    try {
      // const productsRes = await getProducts({
      //   filter,
      //   paging: { skip: (paging.page - 1) * paging.take, take: paging.take },
      // });
      const productsRes = productsData;
      dispatch(getProductsSlice(productsRes));
    } catch (error) {}
    dispatch(hideLoading());
  };

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: 0.5, // 50% of target visible
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  });
  console.log('0000', categories, tags, products);

  const handleCategoryChange = (categoryId: number) => {
    setFilter({
      ...filter,
      categoryId,
    });
  };
  const handleTagChange = (tagId: number) => {
    setFilter({
      ...filter,
      tagId,
    });
  };
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      // const productsRes = await getProducts({
      //   filter,
      //   paging: { skip: paging.page * paging.take, take: paging.take },
      // });
      const productsRes = {...productsData};

      productsRes.products = [
        ...products.products,
        ...productsRes.products,
      ];

      setPaging({...paging, page: paging.page + 1});
      dispatch(getProductsSlice(productsRes));
    } catch (error) {}
    setLoading(false);
  };

  return (
    <>
      <SliderBanner>
        {banners.map((i: any) => {
          return (
            <div
              key={i.url1}
              className='w-full h-full flex flex-row shrink-0 gap-3'
            >
              {Object.values(i).map((j) => {
                return (
                  <div className='w-1/2 h-full relative'>
                    <Image
                      className='rounded-lg'
                      src={`/${j}`}
                      fill
                      unoptimized
                      alt=''
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </SliderBanner>
      <div className='bg-white h-32 rounded-lg flex flex-row gap-5 justify-center p-4 mb-3'>
        {(categories || []).map((i: any) => {
          return (
            <Button
              key={i.id}
              onClick={() => handleCategoryChange(i.id)}
              className={`${filter.categoryId == i.id ? 'border-blue-500' : ''} flex flex-col items-center h-auto w-auto text-sm font-medium gap-2`}
            >
              <Image
                className='rounded-xl border border-gray-200'
                src={`/${i.img}`}
                width={44}
                height={44}
                unoptimized
                alt={i.name}
              />
              <span className='text-center'>{i.name}</span>
            </Button>
          );
        })}
      </div>

      <div
        className='w-full relative rounded-lg mb-4 flex flex-col'
        ref={targetRef}
      >
        <div className='bg-white rounded-tl-xl rounded-tr-xl pr-1 pt-4 mb-2'>
          <span className='font-semibold text-md ml-3'>Gợi ý hôm nay</span>
          <div className='flex flex-row mt-5'>
            <Button
              onClick={() => handleTagChange(0)}
              className={`${filter.tagId == 0 ? 'bg-blue-100 border-b border-blue-500' : ''} w-36 h-16 border-transparent rounded-none flex flex-col items-center justify-center cursor-pointer`}
            >
              <span className='text-gray-500 text-xs'>Dành cho bạn</span>
            </Button>
            {(tags || []).map((i: any) => {
              return (
                <Button
                  onClick={() => handleTagChange(i.id)}
                  key={i.id}
                  className={`${filter.tagId == i.id ? 'bg-blue-100 border-b border-blue-500' : ''} w-36 h-16 border-transparent rounded-none flex flex-col items-center justify-center cursor-pointer`}
                >
                  <span className='text-gray-500 text-xs'>{i.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className='flex flex-row flex-wrap gap-2 mt-2'>
          {(products?.products || []).map((product: any) => {
            return <CardProduct data={product} key={product.id} />;
          })}
        </div>
        {products?.total > products.products?.length && <Button
          onClick={handleLoadMore}
          loading={loading}
          className='text-lg hover:bg-transparent bg-transparent p-5 border mt-10 px-20 self-center rounded-md text-blue-500 border-blue-500'
        >
          {loading ? 'Loading...' : 'Load more'}
        </Button>}
      </div>
    </>
  );
}
