'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Status from './status';
import DetailsCheckout from '../checkout/detailsCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fees, groupByFunc } from '../constants/constant';
import moment from 'moment';
import { redirect } from 'next/navigation';

const Page: React.FC = () => {
    const { orders } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.user);

    const status = [
        {
            id: '1',
            number: 1,
            name: 'Nhà hàng đã nhận đơn',
            st: false          
        },
        {
            id: '2',
            number: 2,
            name: 'Shipper đã nhận đơn',
            st: false
        },
        {
            id: '3',
            number: 3,
            name: 'Shipper đang đến nhà hàng',
            st: false
        },
        {
            id: '4',
            number: 4,
            name: 'Shipper đã đến nhà hàng',
            st: false
        },
       
        {
            id: '5',
            number: 5,
            name: 'Shipper đang giao hàng',
            st: false
        },
        {
            id: '6',
            number: 6,
            name: 'Đơn hàng hoàn tất',
            st: false
        },
    ]
    const detail: any = (orders?.order_items || []).map(p => {
        return {
            name: p.products.name,
            description: p.products.description,
            price: p.price,
            quantity: p.quantity,
            totalprice: +p.price * +p.quantity,
            img:'/food/ga1.jpg'
        }
    })
    const groupData = groupByFunc(orders?.order_items, ['products', 'shop_id']);

    if (!orders || !user || !Object.keys(orders)?.length) {
        return redirect("/dashboard");
    }
    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                    <div className="ml-10 text-4xl  text-beamin font-bold" >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl  text-beamin ">
                        |
                    </div>
                    <div className="text-3xl  text-beamin font-bold">
                        Trình trạng đơn hàng
                    </div>
                </div>
                <div className="w-1/2 h-full flex   items-center gap-3">


                </div>
            </div>
            <div className='grid grid-cols-12 '>
                <div className='col-span-3  pt-3 pb-3 pl-16'>
                    <div className='w-full h-full bg-white rounded-md flex flex-col pl-4 pt-2 pb-4'>
                        <div className='font-semibold'> Trình Trạng </div>
                        <Status items={status} />
                    </div>
                </div>
                <div className='col-span-9 pt-3 pl-6 pr-10 flex flex-col gap-2 pb-3 h-full'>
                    <div className='w-full h-[70%] rounded-md'>
                        <div className='w-full h-full relative'>
                            <Image layout="fill" objectFit="cover" src={'/images/baemin-1.jpg'} alt=''></Image>
                        </div>

                    </div>
                    <div className='w-full  bg-white rounded-md p-4 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/3 flex flex-col gap-1 pr-5'>
                                {groupData?.map(i => {
                                    const prices = i.items.reduce((result, p) => {
                                        return result += (+p.price) * p.quantity;
                                    }, 0);
                                    return <>
                                        <div>{i.items[0].products.shops.name}</div>
                                        <div className='text-sm text-gray-600'>{i.items[0].products.shops.address}</div>
                                        <div className='text-sm font-medium pb-2 border-b'>
                                            {prices.toFixed(2)} / {i.items.length} món
                                        </div>
                                    </>
                                })}
                                
                            </div>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Giao hàng đến
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Khách hàng: {user?.username.toUpperCase()}
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Email: {user?.email}
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Phương thức thanh toán: {orders.shipping[0].shipping_method.toUpperCase()}
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Địa chỉ: {`${orders.shipping[0].address}, ${orders.shipping[0].city}, ${orders.shipping[0].country}`}
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Thời gian hoàn thành: {moment(orders.order_date).add(5, 'hours').format('HH:mm DD/MM/YYYY')}
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col  gap-2 pl-5'>
                                <div className='font-medium flex flex-row justify-between '>
                                    <span> Tổng (1 món):</span>
                                    <span className='text-beamin'>{((+orders.total) - fees.shippingFee + fees.discount)?.toFixed(2)}</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between border-t'>
                                    <span> phí giao hàng (1 km):</span>
                                    <span className='text-beamin'>{fees.shippingFee?.toFixed(2)}</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> phí dịch vụ:</span>
                                    <span className='text-beamin'>{fees.service?.toFixed(2)}</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> Giảm giá:</span>
                                    <span className='text-beamin'>{fees.discount?.toFixed(2)}</span>
                                </div>
                                <div className='text-beamin w-full flex flex-row items-end justify-end text-xl font-medium pr-3 pt-3'>
                                    <span>{((+orders.total) + fees.service).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-2 border-t'>
                            <DetailsCheckout items={detail}  />
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Page;