"use client";
import React, { useEffect, useState } from 'react';
import ResultFood from './result';
import { useRouter, useSearchParams } from 'next/navigation';
import { hideLoading, showLoading } from '../store/loadingSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SEARCH_URL, STATUS_CODE } from '../store/constants';
import { showAlert } from '../store/alertSlice';
import { Pagination } from 'antd';

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const page = searchParams.get('page') || 1;
    const take = searchParams.get('take') || 5;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(page);
    const [itemsPerPage] = useState(take);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        search();
    }, []);
    useEffect(() => {
        search();
    }, [query, currentPage, itemsPerPage]);

    const search = async () => {
        dispatch(showLoading());
        try {
        const response = await axios.get(SEARCH_URL, { params: {skip: (+page - 1)*(+take), take, searchTerm: query} });
            if (response.status === STATUS_CODE.SUCCESS) {
                setData(response?.data?.products);
                setTotalItems(response?.data?.total);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error submitting data", error);
            setData([]);
            dispatch(
                showAlert({
                    type: "error",
                    message: error?.response.data.message || error?.message,
                })
            );
        }
        dispatch(hideLoading());
    };
    const onPaginationChange = (page) => {
        setCurrentPage(page);

        const queryObj = new URLSearchParams({ query, page, take }).toString(); // Create query string
        router.push(`/sreach?${queryObj}`);

    }
    return (
        <>
            <div className='my-3 flex flex-row'>
                Kết quả tìm kiếm của "{query}"
            </div>
            {data && data.length
            ? <>
                <div className='text-right'>Total: {totalItems}</div>
                <ResultFood items={data} />
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={(page) => onPaginationChange(page)}
                    style={{ marginTop: '16px', textAlign: 'center' }}
                /></>
            : <div className='text-center'>No result</div>}
        </>
    )
}
export default Page;
