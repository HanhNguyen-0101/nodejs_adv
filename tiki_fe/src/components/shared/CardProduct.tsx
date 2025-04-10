import React, { AllHTMLAttributes } from 'react';
import Image from 'next/image';
import { Rate, Tag } from 'antd';
import { formatCurrency } from '@/utils';
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/20/solid';

type PropsType = {
  data: {
    productid: string;
    name: string;
    price: number;
    rating?: number;
    shops: { official?: boolean };
    tags: Array<any>[];
    images: string;
    stock: number;

    discount?: number;
    madeIn?: string;
    maxDeliveryDay?: number;
  };
};

export const CardProduct = ({
  data,
  ...rest
}: PropsType & AllHTMLAttributes<HTMLDivElement>) => {
  const {
    productid,
    name,
    price,
    rating,
    tags,
    shops,
    discount,
    madeIn,
    stock,
    maxDeliveryDay,
    images,
  } = data;

  const shipping = {
    type: (maxDeliveryDay || 0) < 5 ? 'fast' : 'normal',
    date: maxDeliveryDay,
  };
  const imagesArr = images?.split(';');
  return (
    <Link
      href={`/detail/${productid}`}
      className={`w-[16%] border bg-white border-gray-200 pb-1 rounded-md flex flex-col gap-1 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] cursor-pointer flex-shrink-0 ${rest.className}`}
    >
      <Image
        src={`/products/${imagesArr?.[0]}`}
        width={200}
        height={200}
        alt={name}
        unoptimized
        className='rounded-tl-md w-full rounded-tr-md'
      />
      <div className='flex flex-col gap-1'>
        <div className='flex flex-col gap-1 min-h-40'>
          <div className='flex flex-col gap-1 mt-0.5 ml-1.5 min-h-12'>
            {shops?.official && (
              <Image
                src={'/chinh-hang.png'}
                width={80}
                height={20}
                alt={name}
                unoptimized
              />
            )}
            {tags && tags.length && (
              <div className='mt-1 mb-3'>
                {tags.map((i) => {
                  return (
                    <Tag key={i.tagid} color='red' className='w-fit font-bold'>
                      <TagIcon className='h-4 w-3 inline-block' /> {i.name}
                    </Tag>
                  );
                })}
              </div>
            )}
          </div>
          <div className='text-xs leading-4 ml-1.5 max-h-8 line-clamp-2 font-bold'>
            {name}
          </div>
          <Rate
            className='block text-[10px] ml-1.5 [&>li]:!me-0.5 text-yellow-400'
            allowHalf
            disabled
            defaultValue={rating}
          />
          <div className='ml-1.5'>
            {stock < 1 && (
              <Tag color='#f50' className='w-fit font-bold'>
                Out of Stock
              </Tag>
            )}
            {discount ? (
              <>
                <span className='text-[#ff424e] font-semibold'>
                  {formatCurrency('us-US', 'USD', price - discount)}
                </span>

                <div className=''>
                  <div className='bg-gray-200 inline text-xs font-medium px-1 rounded-full w-fit text-black'>
                    {formatCurrency('us-US', 'USD', discount)}
                  </div>

                  <div className='line-through text-gray-500 inline text-[11px] ml-1'>
                    {formatCurrency('us-US', 'USD', price)}
                  </div>
                </div>
              </>
            ) : (
              <span className='text-black font-semibold tracking-tight'>
                {formatCurrency('us-US', 'USD', price)}
              </span>
            )}
          </div>
        </div>
        <div className='mb-3.5 ml-2.5'>
          {madeIn && <div className=' text-[10px] h-0'>Made in {madeIn}</div>}
        </div>
        <hr className='block w-[90%] self-center' />

        <div className='ml-0.5 text-[10px] text-gray-500 flex flex-row items-center justify-start gap-2 px-1 max-h-5'>
          {shipping.type === 'fast' ? (
            <>
              <Image
                src={'/now.png'}
                width={32}
                height={16}
                alt={'shipping'}
                unoptimized
              />
              <span>Giao siêu tốc {shipping.date} day(s)</span>
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
              <span className='text-[10px] text-gray-500'>
                Giao {shipping.date} day(s)
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
