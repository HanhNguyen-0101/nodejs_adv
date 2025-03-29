"use client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import DetailsCart from "./detailsCart";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";
import { clearOrder } from "../store/cartSlice";
import { redirect } from "next/navigation";
import { groupByFunc } from "../constants/constant";

export default function Home() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);
  const { visible } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    dispatch(clearOrder());
  }, [])

  const groupedByShop = carts?.reduce((acc, product) => {
    const shopId = product.shop_id;
    if (!acc[shopId]) {
      acc[shopId] = [];
    }
    acc[shopId].push(product);
    return acc;
  }, {});

  const detail: any = Object.values(groupedByShop).map((shop) => {
    return {
      name: shop[0].shops?.name,
      quandoitac: true,
      items: shop.map((p) => ({
        ...p,
        namefood: p.name,
        img: "/images/Ga.png",
        totalprice: +p.price * +p.quantity,
      })),
    };
  });

  const totalPrice = carts.reduce((totalPrice, item) => {
    return (totalPrice += +item.price * +item.quantity);
  }, 0);
  const groupData = groupByFunc(carts, ['shop_id']);
  const nameList = groupData?.reduce((result, i) => {
    return result += ` ${i.items[0].shops.name}/`;
  }, '');
  return (
    <>
      <div className="flex flex-row w-full h-20 bg-white ">
        <div className="w-1/2 h-full flex flex-row  items-center gap-3">
          <div className="ml-10 text-4xl  text-beamin font-bold">
            <ShoppingCartOutlined />
          </div>
          <div className="text-2xl  text-beamin ">|</div>
          <div className="text-3xl  text-beamin font-bold">Giỏ hàng</div>
        </div>
        <div className="w-1/2 h-full flex   items-center gap-3">{!carts?.length && <div className="text-center">Không có sản phẩm trong giỏ hàng</div>}</div>
      </div>
      {carts?.length && <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
        <div className=" w-full h-16  bg-white  grid grid-cols-12">
          <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
            <span className="text-base font-normal"> Món Ăn</span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Đơn giá
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số lượng
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số tiền
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Thao tác
            </span>
          </div>
        </div>
        <DetailsCart Details={detail} />
        <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  ">
          <div className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
            <div className="cursor-pointer hover:text-red-600 ">Hủy</div>
            <div> Quán Đã chọn: </div>
            <div> {nameList}</div>
          </div>
          <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
            <div className=""> Tổng thanh toán ({carts.length} Sản phẩm):</div>
            <div className="text-red-600">{totalPrice?.toFixed(2)} </div>
            <div>
              <Button
                style={{ background: "#3AC5C9", color: "white" }}
                className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105"
                disabled={visible}
              >
                <Link href="/checkout">Thanh toán</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
