import React, { useEffect, useState } from "react";

// components
import CardEditMainCategory from "components/Cards/CardEditMainCategory";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function EditMainCategory(props) {
    const mainCategoryId = props.match.params.id;
    const [mainCategory, setMainCategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getDetailCategory = async () => {
            const detailCategory = await categoryService.detailMainCategoryById(mainCategoryId);
            setMainCategory(detailCategory)
        }
        getDetailCategory();
    }, [])

    const submitEditMainCategory = async (values) => {
        setIsLoading(true);
        const response = await categoryService.updateMainCategory(mainCategoryId, values);
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
                        <h6 className="text-blueGray-700 text-xl font-bold">Chỉnh sửa danh mục chính</h6>
                    </div>
                </div>
                <CardEditMainCategory
                    detailCategory={mainCategory}
                    submitEditMainCategory={submitEditMainCategory}
                />
            </div>
        </>
    );
}
