"use client";

import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../store/loadingSlice";
import { CATEGORY_URL, PRODUCT_URL, SHOP_URL, STATUS_CODE } from "../store/constants";
import axios from "axios";
import { getAll } from "../store/categorySlice";
import { getAll as getProducts } from "../store/productSlice";
import { RootState } from "../store";

export default function Home() {
    const dispatch = useDispatch();
    const {categories} = useSelector((state: RootState) => state.category);
    const {products} = useSelector((state: RootState) => state.product);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentProducts, setCurrentProducts] = useState([]);
    useEffect(() => {
        getDashBoardData();
    }, []);

    const getDashBoardData = async () => {
        dispatch(showLoading());
        try {
            const categoryRes = await axios.get(CATEGORY_URL);
            const productRes = await axios.get(PRODUCT_URL);
            if (categoryRes.status === STATUS_CODE.SUCCESS && productRes.status === STATUS_CODE.SUCCESS) {
                dispatch(getAll(categoryRes.data));
                dispatch(getProducts(productRes.data));
                setCurrentCategory(categoryRes.data[0]?.category_id);
                setCurrentProducts(productRes.data);
            }
        } catch (error) {
            console.error("Error submitting data", error);
            throw error;
        }
        dispatch(hideLoading());
    }
    const getProductsByCategory = (categoryId: number) => {
        setCurrentCategory(categoryId);
        setCurrentProducts((products || []).filter((s: any) => s.categories.category_id === categoryId));
    }
    // const items = [
    //     { name: "Gà Rán", imageSrc: "/images/Ga.png", description: "Thức ăn nhanh" },
    //     { name: "Burger", imageSrc: "/images/burger.jpg", description: "Thức ăn nhanh" },
    //     { name: "Bún", imageSrc: "/images/noddle.png", description: "Thức ăn nhanh" },
    //     { name: "Mì", imageSrc: "/images/noddle.png", description: "Thức ăn nhanh" },
    //     { name: "Burger", imageSrc: "/images/noddle.png", description: "Thức ăn nhanh" },
    // ];

    const banneritems = [
        {
            id: '1',
            name: 'anh 1',
            url: '/images/map1.png',
        },
        {
            id: '2',
            name: 'anh 2',
            url: '/images/map2.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map3.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map4.png',
        }
    ]
    const TodayFood = {
        title: 'Hôm Nay ăn gi',
        items: currentProducts?.map((s: any) => ({
            ...s,
            address: s.shops.address,
            img: '/food/ga1.jpg',
            kind: s.categories.name
        }))
    }
    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
                        <span>Thực đơn </span>
                        {(categories || []).map((item, index) => (
                            <button onClick={() => getProductsByCategory(item.category_id)} key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100">
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={'/images/Ga.png'} width={30} height={30} alt={item.description} />
                                    <span>{item.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} ></ScrollBar>
                    <ScrollFood items={TodayFood}></ScrollFood>
                </div>

            </div>

        </>
    )
}