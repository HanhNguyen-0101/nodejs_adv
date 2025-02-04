import { Button } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import { hideAlert, showAlert } from "../store/alertSlice";

export default function DetailsCart({ Details }: { Details: any[] }) {
  const dispatch = useDispatch();
  const removeCartItem = (product: any) => {
    dispatch(removeItem(product));
  };
  const onChangeInput = (e: any, product: any) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch(hideAlert());
    if (+value > 0) {
      const productUpdated = {
        ...product,
        quantity: +value - product.quantity,
      };
      dispatch(addItem(productUpdated));
    } else {
      dispatch(
        showAlert({
          type: "warning",
          message: "Please enter a valid value",
        })
      );
    }
  };
  return (
    <>
      {Details.map((items, index) => (
        <div
          key={items.name}
          className="w-full flex flex-col  bg-white rounded-md "
        >
          <div className=" flex flex-row my-7 ml-8 items-center gap-3">
            <span className="text-base font-normal"> {items.name}</span>
            <div className=" bg-beamin p-1 rounded-md">
              {items.quandoitac && (
                <span className="text-sm font-normal text-white">
                  Quán đối tác
                </span>
              )}
            </div>
          </div>
          <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
            {items.items.map((item: any, index: any) => (
              <div
                key={index}
                className={
                  index === items.items.length - 1
                    ? "w-full grid grid-cols-12"
                    : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"
                }
              >
                <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                  <div className="relative h-36 w-36">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.img}
                      alt={""}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-base ">{item.namefood}</span>
                    <span className="text-sm text-gray-600">
                      {item.description}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                  {item.price}
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                  <input
                    minLength={0}
                    onChange={(e) => onChangeInput(e, item)}
                    type="number"
                    id="quantity"
                    className="w-16 text-center border border-gray-300 rounded"
                    defaultValue={item.quantity}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                  {item.totalprice}
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                  <button
                    onClick={() => removeCartItem(item)}
                    className=" hover:text-red-600 cursor-pointer"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
