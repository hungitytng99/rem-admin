import React from "react";
// components
import {
    EditTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';
import { Popconfirm } from "antd";

export default function CardListInquiry(props) {
    const { listInquiry, handleDeleteInquiry } = props;
    function confirm(id) {
        handleDeleteInquiry(id);
    }
    return (
        <>
            <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            >
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    ID
                                </th>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Tên khách hàng
                                </th>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Email
                                </th>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                >
                                    Số điện thoại
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Lời nhắn
                                </th>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Sản phẩm
                                </th>
                                <th
                                    className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                </th>
                            </tr>
                        </thead>


                        <tbody>
                            {listInquiry.length === 0 && <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Hiện chưa có lời nhắn nào
                                </td>
                            </tr>}
                            {listInquiry.map(inquiry => {
                                return (
                                    <tr key={inquiry.id} >
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            {inquiry.id}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            {inquiry.customer_name}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            {inquiry.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            {inquiry.phone}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            {inquiry.message}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            <a className="text-gray-800" href={inquiry.product_link}>
                                                {inquiry.product_name}
                                            </a>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                            <Popconfirm
                                                title="Bạn chắc chắn xóa lời nhắn này chứ?"
                                                onConfirm={() => confirm(inquiry.id)}
                                                placement="topRight"
                                                okText="Đồng ý"
                                                cancelText="Không"
                                            >
                                                <DeleteTwoTone />
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
