'use client';
import { Input, Radio, Tooltip } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { InformationCircleIcon, TicketIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils';
import { SliderBanner } from '@/components/home';
import Link from 'next/link';
import { banners, SHIPPING, STATUS_CODE } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { addOrder } from '@/store/cartSlice';
import { hideModal, showModal } from '@/store/modalSlice';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { showAlert } from '@/store/alertSlice';
import { onSaveUser } from '@/store/userSlice';
import { createOrder } from '@/axios/apiService';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { carts } = useSelector((state: RootState) => state.cart);
  const [currentMethod, setCurrentMethod] = useState({
    deliveryMethod: 1,
    paymentMethod: 1,
  });

  const handleMethodChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setCurrentMethod({
      ...currentMethod,
      [name]: value,
    });
  };
  const handleMakeOrder = async () => {
    dispatch(
      addOrder({
        user,
        carts,
        ...currentMethod,
      }),
    );
    router.push('/order');

    // dispatch(showLoading());
    // try {
    //   const orderRes = await createOrder({
    //     user,
    //     carts,
    //     ...currentMethod,
    //   });
    //   if (orderRes.status === STATUS_CODE.CREATE_SUCCESS) {
    //     dispatch(addOrder(orderRes.data));
    //     router.push('/order');
    //   }
    // } catch (error) {
    //   console.error('Error submitting data', error);
    //   throw error;
    // }
    // dispatch(hideLoading());
  };
  const coupons = [];
  carts.forEach((cart) => {
    const index = coupons?.findIndex((coupon) => coupon.id == cart.coupon?.id);
    if (index == -1 && cart.coupon) coupons.push(cart.coupon);
  });
  const totalPrice = carts.reduce((totalPrice, item) => {
    return (totalPrice += +item.price * +item.quantity);
  }, 0);
  const totalDiscount = carts.reduce((totalDiscount, item) => {
    return (totalDiscount += +item.discount * +item.quantity);
  }, 0);
  const totalCoupon = coupons.reduce((totalCoupon, item) => {
    return (totalCoupon += +item?.discount);
  }, 0);
  const shippingFee =
    SHIPPING.FEES.find((i) => i.id == currentMethod.deliveryMethod)?.fee || 0;

  if (!(carts && carts.length && user)) {
    router.push('/');
    return;
  }
  return (
    <div className='w-[75%] flex flex-row gap-5'>
      <div className='w-[75%] flex flex-col gap-5'>
        <div className='bg-white p-4 rounded-md'>
          <div className='font-semibold text-lg mb-4'>
            Chọn hình thức giao hàng
          </div>
          <div className='w-[50%] bg-sky-100 rounded-lg p-5 flex flex-col gap-5'>
            <Radio.Group
              onChange={handleMethodChange}
              value={currentMethod.deliveryMethod}
              className='flex flex-col gap-5'
              size={'small'}
              name='deliveryMethod'
            >
              {SHIPPING.FEES.map((f) => {
                return (
                  <Radio key={f.id} value={f.id}>
                    <span className=' mr-2'>{f.name}</span>
                    <span className='bg-white text-sm rounded-md text-green-500 p-1 font-medium'>
                      {formatCurrency('us-US', 'USD', f.fee)}
                    </span>
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>

        <div className='bg-white p-4 rounded-md'>
          <span className='font-semibold text-lg mb-5'>
            Chọn hình thức thanh toán
          </span>

          <div className='w-[50%] mt-5 rounded-lg  flex flex-col gap-5'>
            <Radio.Group
              onChange={handleMethodChange}
              value={currentMethod.paymentMethod}
              className='flex flex-col gap-5'
              size={'small'}
              name='paymentMethod'
            >
              {SHIPPING.METHODS.map((m) => {
                return (
                  <Radio
                    key={m.id}
                    value={m.id}
                    className='flex flex-row items-center gap-2'
                  >
                    <div className='flex-row flex gap-2 items-center'>
                      <Image src={m.img} width={30} height={30} alt={m.img} />
                      <span className=' mr-2'>{m.name}</span>
                    </div>
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className='w-[25%] flex flex-col gap-3'>
        {user && (
          <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between'>
              <span>Giao tới</span>
            </div>
            <hr className='my-2' />
            <span className='text-sm font-semibold'>
              {user?.name}
              <span className='text-gray-200 inline-block px-1'>|</span>{' '}
              {user?.phone}
            </span>
            <div className='text-gray-500 text-sm my-1'>{user?.address}</div>
          </div>
        )}
        {coupons && coupons.length ? (
          <div className='bg-white p-4 rounded-md'>
            <div className='flex flex-row justify-between items-center'>
              <span>Khuyến Mãi </span>
              <div className='text-gray-500 flex flex-row items-center gap-1'>
                <Tooltip
                  placement='bottom'
                  title={'Áp dụng các Mã giảm giá đã chọn'}
                >
                  <InformationCircleIcon className='size-4 cursor-pointer' />
                </Tooltip>
              </div>
            </div>
            <hr className='my-2' />
            <div>
              <div className='text-blue-500 mt-3 flex flex-row items-center gap-2'>
                <TicketIcon className='size-5 font-semibold' />
                <span className='text-xs'>Coupons đang áp dụng</span>
              </div>
              <div className='flex flex-col gap-1 items-start text-blue-600 font-medium'>
                {coupons?.map((i: any) => {
                  return (
                    <button
                      key={i?.id}
                      disabled={true}
                      className='text-xs bg-blue-600 text-white border rounded-lg border-gray-200 p-1 px-2'
                    >
                      {i?.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='bg-white p-4 rounded-md'>
          <div className='flex justify-between'>
            <span className='text-gray-900 font-medium'>Đơn hàng</span>
            <Link href={'/cart'} className='text-blue-500 text-sm'>
              Thay đổi
            </Link>
          </div>
          <hr className='mt-2 mb-3' />
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
              <span className='text-gray-500 text-sm'>Tạm tính</span>
              <span className='text-gray-900 text-sm'>
                {formatCurrency('us-US', 'USD', totalPrice)}
              </span>
            </div>

            <div className='flex flex-row justify-between items-center'>
              <span className='text-gray-500 text-sm'>Phí vận chuyển</span>
              <span className='text-gray-900 text-sm'>
                {formatCurrency('us-US', 'USD', shippingFee)}
              </span>
            </div>
            <div className='flex flex-row justify-between items-center'>
              <span className='text-gray-500 text-sm'>Giảm giá</span>
              <span className='text-green-500 text-sm'>
                -{formatCurrency('us-US', 'USD', totalDiscount)}
              </span>
            </div>
            <div className='flex flex-row justify-between items-center'>
              <span className='text-gray-500 text-sm'>Coupons</span>
              <span className='text-green-500 text-sm'>
                -{formatCurrency('us-US', 'USD', totalCoupon)}
              </span>
            </div>
            <hr className='mt-2' />

            <div className='flex flex-row justify-between items-center'>
              <span className='text-gray-500 text-sm'>Tổng tiền</span>
              <span className='text-red-500 text-xl font-medium'>
                {formatCurrency(
                  'us-US',
                  'USD',
                  totalPrice + shippingFee - totalDiscount - totalCoupon,
                )}
              </span>
            </div>
            <button
              onClick={handleMakeOrder}
              className='flex items-center justify-center text-white bg-red-500 p-2 rounded-md'
            >
              Đặt hàng
            </button>
          </div>
        </div>

        <SliderBanner className='h-fit w-full'>
          {banners.map((i) => {
            return (
              <div
                key={i.src1}
                className='w-full h-32 flex flex-row shrink-0 gap-3'
              >
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
