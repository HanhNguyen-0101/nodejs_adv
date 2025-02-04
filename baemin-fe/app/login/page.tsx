"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../store/loadingSlice";
import axios from "axios";
import { LOGIN_URL, STATUS_CODE } from "../store/constants";
import { showAlert } from "../store/alertSlice";
import { useRouter } from "next/navigation";
import { onSaveUser } from "../store/userSlice";

const initValues = {
  username: "",
  password: "",
};

const Page: React.FC = () => {
  const [values, setValues] = useState(initValues);
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogin = (e: any) => {
    e.preventDefault();
    if (!invalid && Object.values(values).every((v) => v && v.trim())) {
      handleLogin();
    } else {
      setInvalid(true);
    }
  };

  const handleLogin = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post(LOGIN_URL, { ...values });
      if (response.status === STATUS_CODE.CREATE_SUCCESS) {
        dispatch(
          showAlert({
            type: "success",
            message: "Login is successfully!",
          })
        );
        dispatch(onSaveUser(response.data));
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      throw error;
    }
    dispatch(hideLoading());
  };
  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInvalid(false);
    setValues({
      ...values,
      [name]: value,
    });
    if (!value || !value.trim()) {
      setInvalid(true);
    }
  };
  return (
    <>
        <form
          onSubmit={onLogin}
          className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8"
        >
          <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
            Đăng Nhập
          </div>
          <div className="flex flex-col w-full gap-3">
            <Input
              name="username"
              value={values.username}
              onChange={onChange}
              placeholder="Tên đăng nhập"
              className="h-[40px]"
            />
            {invalid && !values.username && (
              <p className="text-red-500">Please enter an valid value</p>
            )}
          </div>
          <div className="flex flex-col w-full mt-3">
            <Input.Password
              name="password"
              value={values.password}
              onChange={onChange}
              placeholder="Mật khẩu"
              className="h-[40px]"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            {invalid && !values.password && (
              <p className="text-red-500">Please enter an valid value</p>
            )}
          </div>
          <div className="flex flex-col w-full mt-3">
            <button
              type="submit"
              className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
            >
              Đăng Nhập
            </button>
            {/* <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
            <span className="cursor-pointer">Quên mật khẩu </span>
            <span className="cursor-pointer">Đăng nhập bằng SMS </span>
          </div> */}
          </div>
          {/* <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <FacebookOutlined />
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <GoogleOutlined />
            <span>Google</span>
          </button>
        </div> */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-600">Bạn mới biết đến Baemin?</span>
            <Link className="text-beamin cursor-pointer" href={"/register"}>
              {" "}
              Đăng kí
            </Link>
          </div>
        </form>
    </>
  );
};
export default Page;
