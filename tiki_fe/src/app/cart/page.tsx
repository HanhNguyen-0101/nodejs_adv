'use client';
import { Tooltip } from 'antd';
import { InformationCircleIcon, TicketIcon } from '@heroicons/react/24/outline';

import { ItemCart } from '@/components/cart/ItemCart';
import { formatCurrency } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { showModal } from '@/store/modalSlice';
import { addItem } from '@/store/cartSlice';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);

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

  const handlePayNow = () => {
    // if (user) {
    router.push('/payment');
    // } else {
    //   dispatch(
    //     showModal({func: () => {
    //       router.push('/payment');
    //     }}),
    //   );
    // }
  };
  const onQuantityChange = (product: any, quantity: number) => {
    dispatch(
      addItem({
        ...product,
        quantity,
      }),
    );
  };
  console.log(
    '------',
    carts,
    user,
    coupons,
    totalPrice,
    totalCoupon,
    totalDiscount,
  );
  return (
    <div className='w-[75%]'>
      <div className='uppercase font-medium text-xl mb-2'>Giỏ hàng</div>
      {carts && carts.length ? (
        <div className='flex-row flex'>
          <div className='mb-7'>
            <div className='h-8 rounded-md flex flex-row  bg-white items-center text-sm'>
              <div className='ml-2 w-[45%] max-w-[45%] flex items-center gap-3'>
                <span className='text-sm'>Tất cả sản phẩm </span>
              </div>
              <span className='text-gray-500 w-[15%]'> Đơn giá</span>
              <span className='text-gray-500 w-[15%]'>Số lượng</span>
              <span className='text-gray-500 w-[15%]'>Thành tiền</span>
              <span className='text-gray-500 w-[10%] pr-5 flex justify-end'></span>
            </div>
            <div className='w-full flex flex-col bg-white mt-2 pt-5 rounded-md mb-5'>
              {(carts || []).map((product: any) => (
                <ItemCart
                  product={product}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </div>
          </div>
          <div className='w-[25%] ml-5'>
            {user && (
              <div className='bg-white rounded-md p-4 mb-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Giao tới</span>
                </div>
                <span className='text-sm font-semibold'>
                  {user?.name}
                  <span className='text-gray-200 inline-block px-1'>
                    |
                  </span>{' '}
                  {user?.phone}
                </span>
                <div className='text-gray-500 text-sm'>{user?.address}</div>
              </div>
            )}
            <div className='bg-white p-4 rounded-md'>
              <div className='flex flex-row justify-between items-center'>
                <span className='text-xs font-medium'>Khuyến Mãi </span>
                <div className='text-gray-500 flex flex-row items-center gap-1'>
                  <Tooltip
                    placement='bottom'
                    title={'Áp dụng các Mã giảm giá đã chọn'}
                  >
                    <InformationCircleIcon className='size-4 cursor-pointer' />
                  </Tooltip>
                </div>
              </div>
              <div>
                <div className='text-blue-500 mt-5 mb-2 flex flex-row items-center gap-2'>
                  <TicketIcon className='size-5 font-semibold' />
                  <span className='text-xs'>Coupons đang áp dụng</span>
                </div>
                {coupons && coupons.length ? (
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
                ) : (
                  <div className='text-xs text-gray-500 flex flex-col gap-1 items-start font-medium'>
                    Không có coupon tồn tại
                  </div>
                )}
              </div>
            </div>
            <div className='bg-white p-4'>
              <div className='flex flex-row justify-between'>
                <span className='text-gray-700 text-sm'>Tạm tính</span>
                <span className='text-sm'>
                  {formatCurrency('us-US', 'USD', totalPrice)}
                </span>
              </div>
              <div className='flex flex-row justify-between mt-2'>
                <span className='text-gray-700 text-sm'>Giảm giá</span>
                <span className='text-sm'>
                  -{formatCurrency('us-US', 'USD', totalDiscount)}
                </span>
              </div>
              {coupons && coupons.length ? (
                <div className='flex flex-row justify-between mt-2'>
                  <span className='text-gray-700 text-sm'>Coupons</span>
                  <span className='text-sm'>
                    -{formatCurrency('us-US', 'USD', totalCoupon)}
                  </span>
                </div>
              ) : (
                ''
              )}
              <hr className='my-5' />
              <div className='flex flex-row justify-between mt-2'>
                <span className='text-gray-700 text-sm'>Tổng tiền</span>
                <div className='flex flex-col justify-start items-end'>
                  <span className='text-red-600 text-2xl'>
                    {formatCurrency(
                      'us-US',
                      'USD',
                      totalPrice - totalDiscount - totalCoupon,
                    )}
                  </span>
                  <span className='text-xs text-gray-500'>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handlePayNow}
              className='w-full bg-red-500 block mt-3 rounded-md text-white text-md py-3 text-center'
            >
              Mua hàng
            </button>
          </div>
        </div>
      ) : (
        <div className='rounded-md bg-white items-center text-lg p-4'>
          Không có sản phẩm tồn tại
        </div>
      )}
    </div>
  );
}
