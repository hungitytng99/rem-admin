import { userService } from "data-services/user";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { notification } from 'antd';
import { REQUEST_STATE } from "app-configs";
import 'antd/dist/antd.css';
import Cookies from 'js-cookie'

export default function Login() {
  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .required('This field is required'),
    password: Yup.string()
      .required('This field is required'),
  });

  const openNotificationWithIcon = (type, title = 'Đăng nhập thất bại', message = "Tài khoản hoặc mật khẩu của bạn không đúng") => {
    notification[type]({
      message: title,
      description:
        message,
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await userService.signIn(values);
      if (response.state === REQUEST_STATE.ERROR) {
        if (!response.data.response && response.data.message.indexOf("Network Error") !== -1) {
          openNotificationWithIcon('error', "Lỗi mạng", "Kiểm tra lại kết nối mạng của bạn");
        } else {
          openNotificationWithIcon('error');
        }
      } else if (response.state === REQUEST_STATE.SUCCESS) {
        Cookies.set('token', response.data['access-token']);
        openNotificationWithIcon('success', "Đăng nhập thành công!", "Đợi 1 chút...");
        setTimeout(() => {
          window.location.href = "/admin/list-products"
        }, 500)
      }
    },
    validationSchema: signInSchema,
  });


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10">
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tài khoản
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      autoComplete="off"
                      name="username"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="text-rose-600">{formik.errors.username}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      type="password"
                      autoComplete="off"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-rose-600">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Nhớ tôi
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
