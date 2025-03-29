"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { REGISTER_URL, STATUS_CODE } from "../store/constants";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../store/loadingSlice";
import { showAlert } from "../store/alertSlice";

const initValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Page: React.FC = () => {
  const router = useRouter();
  const [values, setValues] = useState(initValues);
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();

  const onRegister = (e: any) => {
    e.preventDefault();
    if (
      !invalid &&
      Object.values(values).every((v) => v && v.trim()) &&
      values.password === values.confirmPassword
    ) {
      handleRegister();
    } else {
      setInvalid(true);
    }
  };
  const handleRegister = async() => {
    dispatch(showLoading());
    try {
      const response = await axios.post(
        REGISTER_URL,
        {...values}
      );
      if (response.status === STATUS_CODE.CREATE_SUCCESS) {
        dispatch(showAlert({
            type: "success",
            message: "Registration is successfully!"
        }))
        router.push("/login");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      dispatch(
        showAlert({
          type: "error",
          message: error?.response.data.message || error?.message,
        })
      );
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
        onSubmit={onRegister}
        className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8"
      >
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
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
        <div className="flex flex-col w-full gap-3">
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="Email"
            className="h-[40px]"
          />
          {invalid && !values.email && (
            <p className="text-red-500">Please enter an valid value</p>
          )}
        </div>
        <div className="flex flex-col w-full ">
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
        <div className="flex flex-col w-full ">
          <Input.Password
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {invalid && !values.confirmPassword && (
            <p className="text-red-500">Please enter an valid value</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <button
            type="submit"
            className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
          >
            Đăng Nhập
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            {" "}
            Đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};
export default Page;
