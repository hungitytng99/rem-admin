import React, { useEffect, useState } from "react";

// components
import CardEditCategory from "components/Cards/CardEditCategory";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function EditCategory(props) {
    const categoryId = props.match.params.id;
    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getDetailCategory = async () => {
            const detailCategory = await categoryService.detailCategoryById(categoryId);
            setCategory(detailCategory)
        }
        getDetailCategory();
    }, [])

    const submitEditCategory = async (values) => {
        setIsLoading(true);
        const response = await categoryService.updateCategory(categoryId, values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Chỉnh sửa danh mục',
                description:
                    'Thành công',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Chỉnh sửa danh mục',
                description:
                    'Một lỗi đã xảy ra khi chỉnh sửa',
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
                        <h6 className="text-blueGray-700 text-xl font-bold">Chỉnh sửa danh mục phụ</h6>
                    </div>
                </div>
                <CardEditCategory
                    detailCategory={category}
                    submitEditCategory={submitEditCategory}
                />
            </div>
        </>
    );
}
