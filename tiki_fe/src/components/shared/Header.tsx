'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  ShoppingCartIcon,
  CheckBadgeIcon,
  CubeIcon,
  TruckIcon,
  TagIcon,
  CurrencyDollarIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { showAlert } from '@/store/alertSlice';
import { login, register } from '@/axios/apiService';
import { onClearUser, onSaveUser } from '@/store/userSlice';
import { PAGING, STATUS_CODE } from '@/constants';
import { hideModal, showModal } from '@/store/modalSlice';
import { Input as InputCustom } from '@/components/shared';

const initLoginValues = {
  password: '',
  phone: '',
};
const initRegisterValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
};
export const Header = () => {
  const router = useRouter();
  const refSearch = useRef<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { carts } = useSelector((state: RootState) => state.cart);
  const { isModalOpen, func } = useSelector((state: RootState) => state.modal);

  const [loginStatus, setLoginStatus] = useState(true);
  const [loginValues, setLoginValues] = useState(initLoginValues);
  const [registerValues, setRegisterValues] = useState(initRegisterValues);
  const [loginInvalid, setLoginInvalid] = useState(false);
  const [registerInvalid, setRegisterInvalid] = useState(false);

  const handleSearch = () => {
    router.push(
      `/search?query=${refSearch.current.value}&take=${PAGING.TAKE}&page=1`,
    );
  };

  const handleLoginStatusChange = () => {
    setLoginStatus((prev) => !prev);
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (
      !loginInvalid &&
      Object.values(loginValues).every((v) => v && v.trim())
    ) {
      onLogin();
    } else {
      setLoginInvalid(true);
    }
  };
  const onLogin = async () => {
    dispatch(showLoading());
    try {
      const response = await login(loginStatus);
      if (response.status === STATUS_CODE.CREATE_SUCCESS) {
        dispatch(
          showAlert({
            type: 'success',
            message: 'Login is successfully!',
          }),
        );
        dispatch(onSaveUser(response.data));
        dispatch(hideModal());
        if (typeof func == 'function') {
          func();
        }
      }
    } catch (error) {
      console.error('Error submitting data', error);
      dispatch(
        showAlert({
          type: 'error',
          message: error?.response.data.message || error?.message,
        }),
      );
    }
    dispatch(hideLoading());
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    if (
      !registerInvalid &&
      Object.values(registerValues).every((v) => v && v.trim()) &&
      registerValues.password === registerValues.confirmPassword
    ) {
      onRegister();
    } else {
      setRegisterInvalid(true);
    }
  };
  const onRegister = async () => {
    dispatch(showLoading());
    try {
      const response = register(registerValues);
      if (response.status === STATUS_CODE.CREATE_SUCCESS) {
        dispatch(
          showAlert({
            type: 'success',
            message: 'Registration is successfully!',
          }),
        );
        setLoginStatus(true);
      }
    } catch (error) {
      console.error('Error submitting data', error);
      dispatch(
        showAlert({
          type: 'error',
          message: error?.response.data.message || error?.message,
        }),
      );
    }
    dispatch(hideLoading());
  };
  const handleLogout = () => {
    dispatch(
      showAlert({
        type: 'success',
        message: 'Logout is successfully!',
      }),
    );
    dispatch(onClearUser());
    router.push('/');
  };
  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (loginStatus) {
      setLoginInvalid(false);
      setLoginValues({
        ...loginValues,
        [name]: value,
      });
      if (!value || !value.trim()) {
        setLoginInvalid(true);
      }
    } else {
      setRegisterInvalid(false);
      setRegisterValues({
        ...registerValues,
        [name]: value,
      });
      if (!value || !value.trim()) {
        setRegisterInvalid(true);
      }
    }
  };
  console.log('------Header', user, carts, isModalOpen);

  return (
    <div className='bg-white border-b border-gray-200'>
      <nav className='flex flex-row items-center h-fit gap-1 justify-center pt-3 border-b pb-2.5'>
        <Link
          href='/'
          className='w-fit flex items-center justify-center flex-col mr-10'
        >
          <Image
            src='/logo.png'
            alt='Tiki'
            width={96}
            height={40}
            className=''
            unoptimized
          />
          <span className='text-[#053B8E] font-semibold text-sm mt-1'>
            Tốt & Nhanh
          </span>
        </Link>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <InputCustom
              ref={refSearch}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              button={
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Tìm kiếm
                </button>
              }
              className='w-[58rem]'
              icon={<MagnifyingGlassIcon className='size-5 text-gray-500' />}
              placeholder='Bạn tìm kiếm gì hôm nay?'
            />

            <div className='flex flex-row gap-2 self-start ml-20'>
              <Link
                href='/'
                className='flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] font-medium w-fit p-2 rounded text-sm items-center justify-center'
              >
                <HomeIcon className='size-6 text-[#0560D9]' />
              </Link>
              {user ? (
                <div
                  onClick={handleLogout}
                  className='ml-10 relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] w-fit p-2 rounded text-sm items-center justify-center before:w-[1px] before:h-3/6 before:absolute before:bg-[#BFC4CC] before:-left-5'
                >
                  <ArrowLeftOnRectangleIcon className='size-6 text-[#0560D9]' />
                  <span className='text-[#0560D9]'>{user?.name}</span>
                </div>
              ) : (
                <div
                  onClick={() => dispatch(showModal())}
                  className='ml-10 relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] w-fit p-2 rounded text-sm items-center justify-center before:w-[1px] before:h-3/6 before:absolute before:bg-[#BFC4CC] before:-left-5'
                >
                  <ArrowRightOnRectangleIcon className='size-6 text-[#0560D9]' />
                  <span className='text-[#0560D9]'>Đăng nhập</span>
                </div>
              )}
              <Link
                href='/cart'
                className='ml-10 relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] w-fit p-2 rounded text-sm items-center justify-center before:w-[1px] before:h-3/6 before:absolute before:bg-[#BFC4CC] before:-left-5'
              >
                <ShoppingCartIcon className='size-6 text-[#0560D9]' />
                <span
                  className='text-xs bg-red-600 relative rounded w-full text-white inline-block bottom-4 right-3 text-center'
                  style={{ width: '15px', borderRadius: '50px' }}
                >
                  {carts?.length}
                </span>
              </Link>
            </div>
          </div>
          {user && (
            <div className='flex flex-row mt-2.5 text-sm justify-end'>
              <MapPinIcon className='size-5 text-gray-500' />
              <span className='text-gray-500 mr-1'>Giao đến:</span>
              <span className='color-black underline'>{user?.address}</span>
            </div>
          )}
          <div></div>
        </div>
      </nav>
      <div className='flex flex-row gap-5 mt-2.5 items-center justify-start ml-56 mb-2.5'>
        <span className='font-semibold text-sm text-[#033A8C]'>Cam kết</span>
        <div className='flex flex-row gap-1  items-center cursor-pointer'>
          <CheckBadgeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>100% hàng thật</span>
        </div>
        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CurrencyDollarIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Hoàn 200% nếu hàng giả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CubeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>30 ngày đổi trả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TruckIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giao nhanh 2h</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TagIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giá siêu rẻ</span>
        </div>
        <Modal
          closable={false}
          title={null}
          open={isModalOpen}
          onOk={() => dispatch(hideModal())}
          onCancel={() => dispatch(hideModal())}
          footer={null}
          className=''
          width={950}
        >
          <div className='w-full flex flex-row relative '>
            <div
              onClick={() => {
                dispatch(hideModal());
              }}
              className='w-10 h-10 bg-white rounded-full flex justify-center absolute items-center -top-3 -right-3 cursor-pointer font-bold'
            >
              X
            </div>

            <div className='p-16 flex flex-col mb-5 w-[70%]'>
              <div className='flex flex-col gap-5 mb-2'>
                <span className='text-3xl font-semibold'>Xin chào,</span>
                <span className='text-sm '>Đăng nhập hoặc Tạo tài khoản</span>
                {loginStatus ? (
                  <form onSubmit={handleLogin} method='post'>
                    <Input
                      onChange={onChange}
                      name='phone'
                      value={loginValues.phone}
                      type='tel'
                      className='outline-none mt-4 hover:border-red-500 focus:border-red-500 py-2 text-xl w-full'
                      placeholder='Số điện thoại'
                    />
                    {loginInvalid && !loginValues.phone && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input.Password
                      onChange={onChange}
                      name='password'
                      value={loginValues.password}
                      type='password'
                      className='outline-none mt-4 hover:border-red-500 focus:border-red-500 py-2 text-xl w-full'
                      placeholder='Password'
                    />
                    {loginInvalid && !loginValues.password && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <button
                      type='submit'
                      className='w-full bg-red-500 p-2 hover:bg-red-600 border-none my-5 text-white rounded-md text-xl'
                    >
                      Tiếp Tục
                    </button>
                    <div className='flex items-center justify-center gap-1 '>
                      <span className='text-gray-600'>
                        Bạn mới biết đến Tiki?
                      </span>
                      <Button
                        htmlType='button'
                        onClick={handleLoginStatusChange}
                        className='text-blue-500 cursor-pointer justify-self-center self-center border-none p-0'
                      >
                        Đăng kí
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} method='post'>
                    <Input
                      onChange={onChange}
                      name='username'
                      value={registerValues.username}
                      type='text'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Username'
                    />
                    {registerInvalid && !registerValues.username && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input
                      onChange={onChange}
                      name='phone'
                      value={registerValues.phone}
                      type='tel'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Số điện thoại'
                    />
                    {registerInvalid && !registerValues.phone && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input.Password
                      onChange={onChange}
                      name='password'
                      value={registerValues.password}
                      type='password'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Password'
                    />
                    {registerInvalid && !registerValues.password && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input.Password
                      onChange={onChange}
                      name='confirmPassword'
                      value={registerValues.confirmPassword}
                      type='password'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Confirm password'
                    />
                    {registerInvalid && !registerValues.confirmPassword && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input
                      onChange={onChange}
                      name='email'
                      value={registerValues.email}
                      type='email'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Email'
                    />
                    {registerInvalid && !registerValues.email && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <Input
                      onChange={onChange}
                      name='address'
                      value={registerValues.address}
                      type='text'
                      className='outline-none mt-4 py-2 text-lg w-full'
                      placeholder='Địa chỉ'
                    />
                    {registerInvalid && !registerValues.address && (
                      <p className='text-red-500'>
                        Please enter an valid value
                      </p>
                    )}
                    <button
                      type='submit'
                      className='w-full bg-blue-500 p-2 hover:bg-blue-600 border-none my-5 text-white rounded-md text-xl'
                    >
                      Tạo tài khoản
                    </button>
                    <div className='flex items-center justify-center gap-1 '>
                      <span className='text-gray-600'>
                        Bạn đã đăng kí Tiki?
                      </span>
                      <Button
                        htmlType='button'
                        onClick={handleLoginStatusChange}
                        className='text-blue-500 cursor-pointer justify-self-center self-center border-none p-0'
                      >
                        Đăng nhập
                      </Button>
                    </div>
                  </form>
                )}
              </div>
              <div className='w-[85%] mt-5 text-xs text-gray-500'>
                Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng
                và Chính sách bảo mật thông tin cá nhân của Tiki
              </div>
            </div>
            <div className='bg-sky-100 w-[30%] rounded-lg'>
              <div className='flex flex-col justify-center items-center h-full'>
                <Image
                  className='h-fit mb-7 '
                  src='/login.png'
                  width={200}
                  height={100}
                  alt='login'
                  unoptimized
                />
                <div className='text-blue-600 flex flex-col gap-2 justify-center items-center'>
                  <span className='text-lg font-semibold'>
                    Mua sắm tại Tiki
                  </span>
                  <span className='text-sm font-medium'>
                    Siêu ưu đãi mỗi ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
