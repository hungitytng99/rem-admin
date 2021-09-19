import React, { useEffect, useState } from "react";
// components
import {
    EditTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';
import { notification, Popconfirm } from 'antd';
import { categoryService } from "data-services/category";
import CategoryDropdown from "components/Dropdowns/CategoryDropdown";
import { REQUEST_STATE } from "app-configs";

export default function CardListCategory(props) {
    const { mainCategory, handleDeleteMainCategory } = props;
    const [ subCategory, setSubCategory ] = useState([]);
    function confirm() {
        handleDeleteMainCategory(mainCategory.id)
    }
    const handleDeleteSubCategory = async (mainId, subId) => {
        const response = await categoryService.deleteCategory(subId);
        console.log("RESPONSE: ", response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            const categoryTmp = subCategory.filter((item) => {
                if (Number(item.id) !== Number(subId)) {
                    return item;
                }
            })
            console.log("DELETE RESULT: ", categoryTmp);
            notification['success']({
                message: 'Xóa danh mục phụ',
                description:
                    "Thành công",
            });
            setSubCategory(categoryTmp);
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Xóa danh mục phụ',
                description:
                    'Một lỗi đã xảy ra khi xóa danh mục',
            });
        }
    }
    useEffect(() => {
        (async function () {
            const detailMainCategory = await categoryService.detailMainCategoryById(mainCategory.id);
            setSubCategory(detailMainCategory.data.sub_category)
        })();
    },[])
    return (
        <>
            <div
                className="w-full lg:w-6/12 mb-6 px-4 "
            >
                <div className="shadow-lg rounded bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="relative px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className="font-semibold text-lg text-blueGray-700 mb-0"
                                >
                                    {mainCategory.name}
                                </h3>
                            </div>
                            <div className="mb-2 flex text-lg">
                                <a href={`/admin/edit-main-category/${mainCategory.id}`} className="block mr-2 hover:cursor-pointer">
                                    <EditTwoTone />
                                </a>
                                <Popconfirm
                                    title="Điều này sẽ xóa toàn bộ sản phẩm thuộc danh mục này. Bạn chắc chứ?"
                                    onConfirm={confirm}
                                    okText="Đồng ý"
                                    cancelText="Không"
                                >
                                    <div
                                        className="mr-2 hover:cursor-pointer"
                                    >
                                        <DeleteTwoTone />
                                    </div>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    {subCategory.length !== 0 &&
                                        <tr>
                                            <th
                                                className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            >
                                                ID
                                            </th>

                                            <th
                                                className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            >
                                                Tên
                                            </th>
                                            <th
                                                className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            >
                                            </th>
                                        </tr>
                                    }

                                </thead>
                                <tbody>
                                    {subCategory.length === 0 &&
                                        <tr>
                                            <td
                                                className="px-6 text-center align-middle py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            >
                                                No subcategory
                                            </td>

                                        </tr>
                                    }
                                    {subCategory.map((item) => {
                                        console.log(item);
                                        return (
                                            <tr key={item.id} >
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {item.id}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {item.name}
                                                </td>

                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-right">
                                                    <CategoryDropdown
                                                        handleDeleteSubCategory={handleDeleteSubCategory}
                                                        subCategoryId={item.id}
                                                        mainCategoryId={item.main_category_id.id}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
