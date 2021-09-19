import React, { useState } from "react";
import * as Yup from 'yup';
import jsCookie from "js-cookie";
import { Modal, notification } from "antd";
import { useFormik } from "formik";
import FullPageLoading from "components/Loading/FullPageLoading";
import { userService } from "data-services/user";
import { Spin } from 'antd';
import { REQUEST_STATE } from "app-configs";

export default function Navbar() {
  const [changePwdModal, setChangePwdmodal] = React.useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const changePwdSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('This field is required'),
    newPassword: Yup.string()
      .required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '', newPassword: '', newPasswordConfirm: ''
    },
    onSubmit: async (values) => {
      console.log("VALUES: ", values);
      setShowLoading(true);
      const response = await userService.changePwd(values);
      console.log("GoHERE", response);
      if (response.state === REQUEST_STATE.SUCCESS) {
        formik.resetForm();
        setChangePwdmodal(false);
        notification['success']({
          message: 'Đổi mật khẩu',
          description:
            'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
        });
        setTimeout(() => {
          handleLogout();
        }, 500)
      }
      if (response.state === REQUEST_STATE.ERROR) {
        console.log("DOIMK:", response);
        let message = "Một lỗi xảy ra khi bạn thay đổi mật khẩu";
        message = response.data.message;
        notification['error']({
          message: 'Đổi mật khẩu',
          description:
            message,
        });
      }
      console.log(response);
      setShowLoading(false);
    },
    validationSchema: changePwdSchema,
  });

  const showModal = () => {
    setChangePwdmodal(true);
  };

  const handleOkModal = () => {
    formik.handleSubmit();
  };

  const handleCancelModal = () => {
    setChangePwdmodal(false);
    formik.resetForm();
  };
  const handleLogout = () => {
    jsCookie.remove('token');
    window.location.href = '/auth/login';
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden md:block lg:inline-block font-semibold hover:text-white"
            href="/"
          >
            Bảng admin
          </a>
          {/* Form */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <button onClick={showModal} className="text-white px-4 py-1 rounded-md focus:outline-none mr-2">Đổi mật khẩu</button>
            <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-1 rounded-md focus:outline-none"> Đăng xuất</button>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
      <Modal
        title={
          <div>
            Đổi mật khẩu
            <span style={{ fontSize: '10px', marginLeft: '8px' }}>{showLoading && <Spin />}
            </span>
          </div>}
        visible={changePwdModal}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          >
            Mật khẩu cũ <span className="text-rose-600">*</span>
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            autoComplete="off"
            name="oldPassword"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Mật khẩu cũ"
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="text-rose-600">{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          >
            Mật khẩu mới <span className="text-rose-600">*</span>
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            autoComplete="off"
            name="newPassword"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Mật khẩu mới"
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-rose-600">{formik.errors.newPassword}</div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
