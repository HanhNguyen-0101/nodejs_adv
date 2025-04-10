'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import Image from 'next/image';
import { CheckIcon, TagIcon } from '@heroicons/react/20/solid';

import {
  TruckIcon,
  InformationCircleIcon,
  ArchiveBoxXMarkIcon,
  ReceiptRefundIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { Input, Rate, Tag, Tooltip } from 'antd';
import { formatCurrency } from '@/utils';
import { SliderBanner } from '@/components/home';
import { ListProduct } from '@/components/shared';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { getProduct, getProducts } from '@/axios/apiService';
import { RootState } from '@/store';
import { banners } from '@/constants';
import { addItem } from '@/store/cartSlice';
import { showAlert } from '@/store/alertSlice';

export default function Page({ params }: { params: { slug: string } }) {
  const dispatch = useDispatch();
  moment.locale('vi');
  const { user } = useSelector((state: RootState) => state.user);
  const { carts } = useSelector((state: RootState) => state.cart);

  const cartOfProduct = carts?.find((c) => c?.productid == params.slug);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(
    cartOfProduct?.quantity || 1,
  );
  const [coupon, setCoupon] = useState(cartOfProduct?.coupon || null);

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    getProductData();
  }, [product]);

  const getProductDetail = async () => {
    dispatch(showLoading());
    try {
      const productRes = await getProduct(params.slug);
      const imagesArr = productRes?.images?.split(';');
      setProduct(productRes);
      setImage(imagesArr?.[0]);
    } catch (error) {
      console.error('Error submitting data', error);
      throw error;
    }
    dispatch(hideLoading());
  };

  const getProductData = async () => {
    dispatch(showLoading());
    try {
      const productsResponse = await getProducts({
        relate: JSON.stringify({ categoryid: product?.categoryid }),
      });
      const productsRes = [...productsResponse?.products];
      setProducts(productsRes);
    } catch (error) {}
    dispatch(hideLoading());
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    if (
      (+e.target.value &&
        +e.target.value > 0 &&
        Number.isInteger(+e.target.value)) ||
      !e.target.value
    )
      setQuantity(+e.target.value);
  };

  const handlePrice = (type: string) => {
    switch (type) {
      case '+': {
        setQuantity((prev) => prev + 1);
        break;
      }
      case '-': {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
        break;
      }
      default:
        console.log('default');
    }
  };

  const handleCouponChange = (coupon: any) => {
    setCoupon(coupon);
  };

  const handelAddToCard = () => {
    if (quantity) {
      dispatch(
        addItem({
          ...product,
          quantity,
          coupon,
        }),
      );
    } else {
      dispatch(
        showAlert({
          type: 'error',
          message: 'Vui lòng thêm số lượng',
        }),
      );
    }
  };

  const imagesArr = product?.images?.split(';');
  return (
    <div className='flex flex-row mb-5 gap-6 w-[90%]'>
      <div className='flex flex-col w-[27%] bg-white p-4 rounded-md sticky h-fit top-5'>
        <Image
          className='rounded-lg w-full'
          src={`/products/${image}`}
          width={368}
          height={368}
          alt='Product'
          unoptimized
        />
        <div className='flex flex-row gap-2 mt-2'>
          {imagesArr?.map((i: string) => {
            return (
              <Image
                key={i}
                className='border-gray-100 border p-1 rounded-md '
                src={`/products/${i}`}
                width={47}
                height={47}
                onMouseEnter={() => {
                  setImage(`/${i}`);
                }}
                alt='Product'
                unoptimized
              />
            );
          })}
        </div>
      </div>
      <div className='w-[40%] flex flex-col gap-4'>
        <div className='bg-white p-3 rounded-lg h-fit'>
          <div className='flex flex-row gap-2 items-center'>
            {product?.shops?.official && (
              <Image
                src='/chinh-hang.png'
                width={120}
                height={20}
                alt='Product'
                unoptimized
              />
            )}
            <span className='text-sm flex-1 text-right'>
              Thương hiệu:{' '}
              <span className='text-blue-500'>{product?.shops?.name}</span>
            </span>
          </div>
          {product?.product_tags && product?.product_tags.length && (
            <div className='my-3 text-right'>
              {product?.product_tags.map((i) => {
                return (
                  <Tag
                    key={i?.tags.tagid}
                    color='red'
                    className='w-fit font-bold'
                  >
                    <TagIcon className='h-4 w-3 inline-block' /> {i?.tags.name}
                  </Tag>
                );
              })}
            </div>
          )}
          <span className='font-medium text-2xl mt-2 inline-block'>
            {product?.name}
          </span>
          <div className='flex flex-row items-center gap-2 mt-2'>
            <span className='text-md font-medium'>{product?.rating}</span>
            <Rate
              value={product?.rating}
              allowHalf
              disabled
              className='text-[16px]'
            />
          </div>
          <div>
            <span className='font-semibold text-2xl mt-2 inline-block'>
              {formatCurrency('us-US', 'USD', product?.price)}
            </span>
          </div>
          {product?.discount && (
            <div className='border border-gray-200 rounded-lg p-2 mt-2 flex flex-col'>
              <span>Giá sau khuyến mãi:</span>
              <span className='text-red-500 text-3xl font-semibold mb-2 inline-block'>
                {formatCurrency(
                  'us-US',
                  'USD',
                  product?.price - product?.discount,
                )}
              </span>
              <div className='flex flex-row items-center gap-2'>
                <CheckIcon className='size-4 text-blue-500' />
                <span className='font-medium'>
                  Giảm {formatCurrency('us-US', 'USD', product?.discount)}
                  <span className='ml-1 text-gray-500 font-normal'>
                    từ coupon của Tiki
                  </span>
                </span>
              </div>
              <div className='text-sm my-2'>Khuyến mãi có thể hết sớm</div>
            </div>
          )}
        </div>
        <div className='bg-white p-4 rounded-lg h-fit'>
          <span className='text-lg font-semibold block mb-2'>
            Thông tin vận chuyển
          </span>
          {user && <span className='mb-4'>{user?.address}</span>}
          <div className='flex flex-row items-center gap-2 mt-3'>
            <TruckIcon className='size-6 text-gray-500' />
            <span className=' text-md font-medium'>
              Giao{' '}
              <span className='capitalize'>
                {moment().add(product?.maxDeliveryDay, 'days').format('dddd')}:
              </span>
            </span>
            <span className=''>
              Trước{' '}
              {moment()
                .add(product?.maxDeliveryDay, 'days')
                .format('HH[h], DD/MM')}
            </span>
          </div>
        </div>
        {product?.product_coupons && product?.product_coupons?.length && (
          <div className='bg-white p-4 rounded-lg h-fit'>
            <span className='text-lg font-semibold block mb-2'>
              Ưu đãi khác
            </span>
            <div className='flex flex-col justify-between'>
              <div className='mb-2'>{product?.product_coupons?.length} Mã giảm giá</div>
              <div className='flex flex-row gap-3 items-center text-blue-600 font-medium'>
                {product?.product_coupons.map((i: any) => {
                  return (
                    <button
                      key={i.coupons.couponid}
                      onClick={() => handleCouponChange(i.coupons)}
                      className={`${coupon?.couponid == i.coupons.couponid ? 'bg-blue-600 text-white' : ''} border rounded-lg border-gray-200 p-1 px-2`}
                    >
                      {i.coupons.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className='bg-white p-4 rounded-lg h-fit'>
          <span className='text-lg font-semibold block mb-2'>
            Sản phẩm liên quan
          </span>
          <div className='gap-3 h-fit overflow-hidden'>
            <ListProduct data={products} cardStyle='w-[50%]' />
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg h-fit'>
          <span className='text-lg font-semibold block mb-2'>
            Thông tin bảo hành
          </span>
          <div>
            <div>
              <span>Thời gian bảo hành: </span>
              <span className='font-medium '>12 Tháng</span>
              <hr className='mt-3' />
            </div>

            <div>
              <span>Hình thức bảo hành: </span>
              <span className='font-medium '>Phiếu bảo hành</span>
              <hr className='mt-3' />
            </div>
            <div>
              <span>Nơi bảo hành: </span>
              <span className='font-medium '>
                Bảo hành bởi nhà bán hàng thông qua Tiki
              </span>
              <hr className='mt-3' />
            </div>
            <div>
              <span>Hướng dẫn bảo hành: </span>
              <span className='font-medium text-blue-600 '>Xem chi tiết</span>
              <hr className='mt-3' />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg h-fit'>
          <span className='text-lg font-semibold block mb-2'>
            An tâm mua sắm
          </span>
          <div>
            <div>
              <div className='flex flex-row items-center gap-2'>
                <ArchiveBoxXMarkIcon className='size-6 text-blue-600 font-medium' />
                <span>Được đồng kiểm khi nhận hàng</span>
              </div>
              <hr className='mt-3' />
            </div>

            <div>
              <div className='flex flex-row items-center gap-2'>
                <ReceiptRefundIcon className='size-6 text-blue-600 font-medium' />
                <span>Được hoàn tiền 200% nếu là hàng giả.</span>
              </div>
              <hr className='mt-3' />
            </div>

            <div>
              <div className='flex flex-row items-start gap-2'>
                <CubeIcon className='size-6 text-blue-600 font-medium' />
                <div className='flex flex-col'>
                  <div>Đổi trả miễn phí: </div>
                  <ul className='w-[90%] list-disc ml-5'>
                    <li>
                      Đổi trả miễn phí trong 30 ngày khi bạn đổi ý hoặc sản phẩm
                      không đúng cam kết.
                    </li>
                    <li>Trong 365 ngày khi có lỗi từ nhà sản xuất.</li>
                  </ul>
                  <span className='text-black underline cursor-pointer'>
                    Chi tiết
                  </span>
                </div>
              </div>
              <hr className='mt-3' />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg h-fit'>
          <span className='text-lg font-semibold block mb-2'>
            Thông tin chi tiết
          </span>
          <div className='flex flex-col w-full'>
            <div className='grid grid-cols-2'>
              <span className='text-gray-500'>
                Sản phẩm có được bảo hành không?
              </span>
              <span>Có</span>
            </div>

            <hr className='my-2' />
            <div className='grid grid-cols-2 w-full'>
              <span className='text-gray-500'>Hình thức bảo hành</span>
              <span>Phiếu bảo hành</span>
            </div>

            <hr className='my-2' />
            <div className='grid grid-cols-2'>
              <span className='text-gray-500'>Thời gian bảo hành</span>
              <span>12</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[23%] flex flex-col'>
        <div className='p-4 bg-white flex flex-col rounded-lg'>
          <div className='flex flex-row gap-2'>
            <div>
              <span className='font-medium'>{product?.shops?.name}</span>
              <div className='flex flex-row items-center gap-2'>
                {product?.shops?.official && (
                  <Image
                    src='/official.png'
                    width={72}
                    height={20}
                    alt='Tiki'
                    unoptimized
                  />
                )}
                <span className='text-xs text-gray-200 font-bold'>|</span>
                <span>{product?.shops?.rating}</span>
                <Rate
                  count={1}
                  value={product?.shops?.rating}
                  allowHalf
                  disabled
                  className='text-[17px]'
                />
              </div>
            </div>
          </div>
          <hr className='my-3 block' />
          <div>
            <span className='text-lg font-semibold mb-3 block'>Số lượng</span>
            <div className='flex flex-row gap-1 '>
              <div
                className='w-10 cursor-pointer hover:bg-gray-100 text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
                onClick={() => {
                  handlePrice('-');
                }}
              >
                -
              </div>
              <Input
                onChange={handleInputChange}
                className='w-10 h-8 text-center'
                type='number'
                value={quantity}
              />

              <div
                className='w-10 cursor-pointer hover:bg-gray-100  text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
                onClick={() => {
                  handlePrice('+');
                }}
              >
                +
              </div>
            </div>

            <span className='text-lg font-semibold mt-3 inline-block'>
              Tạm tính
            </span>
            <div className='text-3xl mt-3 font-semibold flex flex-row items-center'>
              <span>
                {formatCurrency(
                  'us-US',
                  'USD',
                  (product?.price - product?.discount) * quantity,
                )}
              </span>

              <Tooltip
                color='white'
                placement='bottom'
                title={
                  <div className='p-3'>
                    <div className='flex flex-row items-center gap-1 text-black'>
                      <div className='flex flex-row gap-2 items-center text-lg'>
                        <CheckIcon className='size-4 text-blue-500' />
                        <div className='text-md font-medium'>
                          {formatCurrency('us-US', 'USD', product?.discount)}
                        </div>
                      </div>
                      <span className='text-gray-500 text-md'>
                        từ coupon của Tiki
                      </span>
                    </div>
                    <div className='text-xs text-black mt-3'>
                      Khuyến mãi có thể hết sớm
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon className='ml-3 size-6 text-gray-500' />
              </Tooltip>
            </div>
            <div>
              <button
                onClick={handelAddToCard}
                className='bg-red-500 text-white rounded-md w-full h-10 mt-3'
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
        <SliderBanner className='h-fit mt-5 w-full'>
          {banners.map((i) => {
            return (
              <div key={i.src1} className='w-full flex flex-row shrink-0 gap-3'>
                <div className='w-full h-32 relative'>
                  <Image
                    className='rounded-lg'
                    src={`/${i.src1}`}
                    fill
                    unoptimized
                    alt=''
                  />
                </div>
              </div>
            );
          })}
        </SliderBanner>
      </div>
    </div>
  );
}
