import React, { useState } from "react";
// components
import { categoryService } from "data-services/category";
import CardAddCategory from "components/Cards/CardAddCategory";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";
import FullPageLoading from "components/Loading/FullPageLoading";

export default function AddCategory(props) {
    const [isLoading, setIsLoading] = useState(false);

    const addCategory = async (values, resetForm) => {
        setIsLoading(true);
        console.log(values);
        const response = await categoryService.createCategory(values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Thêm danh mục',
                description:
                    'Thêm danh mục thành công',
            });
            resetForm();
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Thêm danh mục',
                description:
                    'Một lỗi đã xảy ra khi thêm danh mục',
            });
        }
        setIsLoading(false);
    }

    const addMainCategory = async (values, resetForm) => {
        setIsLoading(true);
        const response = await categoryService.createMainCategory(values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Thêm danh mục chính',
                description:
                    'Cập nhật danh mục chính thành công',
            });
            resetForm();
        }

        if (response.state === REQUEST_STATE.ERROR) {
            let message = "Một lỗi đã xảy ra khi cập nhật danh mục chính."
            notification['error']({
                message: 'Thêm danh mục chính',
                description: message,
            });
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Thêm danh mục</h6>
                    </div>
                </div>
                {/* ff */}
                <div className="mb-6">
                    <CardAddCategory addCategory={addCategory} addMainCategory={addMainCategory} />
                </div>
            </div>
        </>
    );
}
