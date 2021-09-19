import React, { useEffect, useState } from "react";

// components
import CardListCategory from "components/Cards/CardListCategory";
import { notification } from 'antd';
import { REQUEST_STATE } from "app-configs";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function ListCategory() {
    const [mainCategory, setMainCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getCategory = async () => {
            const categoryFetch = await categoryService.listMainCategory();
            console.log(categoryFetch);
            if (JSON.stringify(mainCategory) !== JSON.stringify(categoryFetch.data)) {
                setMainCategory(categoryFetch.data);
            }
        }
        getCategory();
    }, [mainCategory])

    const handleDeleteMainCategory = async (id) => {
        setIsLoading(true);
        const response = await categoryService.deleteMainCategory(id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            const categoryTmp = mainCategory.filter((item) => {
                if (Number(item.id) !== Number(id)) {
                    return item;
                }
            })
            notification['success']({
                message: 'Xóa danh mục',
                description:
                    "Thành công",
            });
            setMainCategory(categoryTmp);
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Xóa danh mục',
                description:
                    'Một lỗi đã xảy ra khi xóa danh mục',
            });
        }
        setIsLoading(false);

    }
    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="flex flex-wrap">
                <div className="relative w-full rounded-t px-4 mb-2 border-0 ">
                    <div className="px-8 py-3 rounded-t flex flex-wrap justify-between items-center bg-white">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h3 className="mb-0 font-semibold text-lg text-blueGray-700">
                                Tất cả danh mục
                            </h3>
                        </div>
                        <button
                            onClick={() => window.location.href = '/admin/add-category'}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Thêm danh mục
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-12/12">
                    <div
                        className="relative flex flex-wrap"
                    >
                        {mainCategory.map((item) => {
                            return (
                                <CardListCategory
                                    handleDeleteMainCategory={handleDeleteMainCategory}
                                    key={item.id}
                                    mainCategory={item}
                                />
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}