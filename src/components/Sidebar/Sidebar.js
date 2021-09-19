/*eslint-disable*/
import jsCookie from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const handleLogout = () => {
    jsCookie.remove('token');
    window.location.href = '/auth/login';
  }
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Rèm Vương Hồng
          </Link>
          {/* User */}
          <div className="block md:hidden">
            <button onClick={() => handleLogout()} className="bg-gray-500 text-white px-4 py-1 rounded-md focus:outline-none"> Logout</button>
          </div>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Rèm Vương Hồng
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-sm uppercase font-bold block pt-1 pb-3 no-underline">
              Thao tác
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-sm uppercase py-2 font-bold block " +
                    (window.location.href.indexOf("/admin/list-products") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/list-products"
                >
                  <i
                    className={
                      "fab fa-product-hunt mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/list-products") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Sản phẩm
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-sm uppercase py-2 font-bold block " +
                    (window.location.href.indexOf("/admin/category") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/category"
                >
                  <i
                    className={
                      "fas fa-list mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/category") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Danh mục
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-sm uppercase py-2 font-bold block " +
                    (window.location.href.indexOf("/admin/list-inquiry") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/list-inquiry"
                >
                  <i
                    className={
                      "fas fa-address-book mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/list-inquiry") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Liên hệ
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-sm uppercase py-2 font-bold block " +
                    (window.location.href.indexOf("/admin/list-post") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/list-post"
                >
                  <i
                    className={
                      "far fa-newspaper mr-2 text-sm" +
                      (window.location.href.indexOf("/admin/list-post") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Đăng bài
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
