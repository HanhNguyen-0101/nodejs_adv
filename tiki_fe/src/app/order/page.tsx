'use client';
import { Dot } from '@/components/shared/Dot';
import { RootState } from '@/store';
import { Timeline } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  moment.locale('vi');
  const { orders } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  if (!(orders && user)) {
    router.push('/');
    return;
  }
  const { carts } = orders;
  let maxDeliveryDay = 0;
  carts.forEach((c) => {
    if (c.maxDeliveryDay > maxDeliveryDay) maxDeliveryDay = c.maxDeliveryDay;
  });
  return (
    <div className=' w-[75%]'>
      <div className='text-lg font-semibold mb-4'>Đơn hàng</div>
      <div className='flex flex-row gap-4 w-full'>
        <div className='bg-white p-4 flex-col w-[70%] rounded-lg'>
          <div className='text-green-500 text-lg font-medium'>
            Giao vào{' '}
            {moment().add(maxDeliveryDay, 'days').format('dddd, DD/MM')}
          </div>
          <div className='text-xs text-gray-500'>
            Được giao bởi {user?.shops?.name}
          </div>
          <hr className='my-3' />
          <Timeline
            className='mt-10 w-[60%]'
            mode='left'
            items={[
              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg text-green-500 font-semibold'>
                      Đang giao hàng
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>

                    <div className=''>Nhân viên đang giao hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>

                    <div>Đã tới kho Bình Tân</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>
                    <div>Đã rời kho Tân tạo</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời bưu cục
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>
                    <div>Đã rời bưu cục</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đang được chuẩn bị
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>
                    <div>Người gửi đang chuẩn bị hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{moment().format('HH:mm')}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đặt hàng thành công
                    </div>
                    <span className='text-sm text-gray-500'>
                      {moment().format('HH:mm, dddd DD/MM/YYYY')}
                    </span>
                    <div>Đơn hàng đã được đặt</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className='w-[30%] bg-white h-fit p-4 rounded-lg'>
          <div>
            <span className='mb-7 text-lg font-semibold block'>
              Kiện hàng gồm
            </span>
            <div className='flex flex-col gap-3'>
              {carts &&
                carts.length &&
                carts.map((i) => {
                  return (
                    <Link
                      href={`/detail/${i.id}`}
                      className='flex flex-row items-center'
                    >
                      <Image
                        src={`/${i.image}`}
                        width={100}
                        height={100}
                        alt={i.image}
                      />
                      <div className='flex flex-col ml-2'>
                        <span className='font-semibold text-lg'>{i.name}</span>
                        <span className='text-gray-500 text-sm'>
                          Bán và giao bởi {i?.shops?.name}
                        </span>
                        <span className='text-sm mt-2 text-gray-400'>
                          Số lượng: {i.quantity}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
