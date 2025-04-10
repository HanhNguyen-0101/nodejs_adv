import { removeItem } from '@/store/cartSlice';
import { formatCurrency } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { InputNumber } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

type PropsType = {
  product: any;
  onQuantityChange: any;
};
export const ItemCart = ({ product, onQuantityChange }: PropsType) => {
  const dispatch = useDispatch();
  const handleChangeAmount = (type: string) => {
    switch (type) {
      case '+':
        onQuantityChange(product, product.quantity + 1);
        break;
      case '-':
        if (product.quantity === 1) return;
        onQuantityChange(product, product.quantity - 1);
        break;
      default:
        break;
    }
  };
  const handleQuantityChange = (value: any) => {
    if (+value && +value > 0 && Number.isInteger(+value))
      onQuantityChange(product, +value);
  };
  const handleRemove = () => {
    dispatch(removeItem(product));
  };
  const shipping = {
    type: (product.maxDeliveryDay || 0) < 5 ? 'fast' : 'normal',
    date: product.maxDeliveryDay,
  };
  const imagesArr = product?.images?.split(';');
  return (
    <div className='ml-2 flex mb-5'>
      <Link
        href={`/detail/${product.productid}`}
        className='flex w-[45%] w-max-[45%] flex-row items-center'
      >
        <Image
          className='w-[80px] h-[80px] mx-3'
          src={`/products/${imagesArr?.[0]}`}
          alt='product'
          width={80}
          height={80}
          unoptimized
        />

        <div className='w-[51%] gap-2 flex flex-col'>
          <div className='flex flex-row items-center gap-1'>
            {product.shops?.official && (
              <Image
                src='/chinh-hang.png'
                alt='chinh-hang'
                width={89}
                height={20}
                unoptimized
              />
            )}

            <Image
              src='/doi-y.png'
              alt='doi-y'
              width={89}
              height={20}
              unoptimized
            />
          </div>
          <span className='text-sm'>{product.name}</span>
          <div className='flex flex-row items-center gap-1'>
            {shipping.type === 'fast' ? (
              <>
                <Image
                  src={'/now.png'}
                  width={32}
                  height={16}
                  alt={'shipping'}
                  unoptimized
                />
                <span className='text-xs'>
                  Giao siêu tốc {shipping.date} day(s)
                </span>
              </>
            ) : (
              <>
                <Image
                  src={'/weather.png'}
                  width={32}
                  height={16}
                  alt={'shipping'}
                  unoptimized
                />
                <span className='text-xs text-gray-500'>
                  Giao {shipping.date} day(s)
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
      {product.discount ? (
        <div className='w-[15%] w-max-[15%] flex flex-col items-start justify-center'>
          <div className='line-through text-gray-500 inline ml-1'>
            {formatCurrency('us-US', 'USD', product.price)}
          </div>
          <div className='text-[#ff424e] font-semibold inline px-1 w-fit'>
            {formatCurrency('us-US', 'USD', product.price - product.discount)}
          </div>
        </div>
      ) : (
        <span className='w-[15%] w-max-[15%]  font-semibold flex items-center'>
          {formatCurrency('us-US', 'USD', product.price)}
        </span>
      )}

      <div className='w-[15%] w-max-[15%] flex items-center'>
        <InputNumber
          className='w-[90%] flex justify-center items-center text-center'
          defaultValue={product.quantity}
          value={product.quantity}
          controls={false}
          keyboard={false}
          variant='filled'
          type='number'
          onChange={handleQuantityChange}
          addonAfter={
            <div
              className='cursor-pointer'
              onClick={() => {
                handleChangeAmount('+');
              }}
            >
              +
            </div>
          }
          addonBefore={
            <div
              className='cursor-pointer'
              onClick={() => {
                handleChangeAmount('-');
              }}
            >
              -
            </div>
          }
        />
      </div>

      <span className='font-semibold text-red-500 w-[15%] w-max-[15%] flex items-center'>
        {formatCurrency(
          'us-US',
          'USD',
          (product.price - product.discount) * product.quantity,
        )}
      </span>
      <div className='text-gray-500 w-[10%] pr-5 flex justify-end items-center'>
        <button onClick={handleRemove}>
          <TrashIcon className='size-5' />
        </button>
      </div>
    </div>
  );
};
