import React, { useEffect, useState } from "react";

// components
import { productService } from "data-services/product/index.js";
import CardListHotProducts from "components/Cards/CardListHotProducts";
import { notification } from 'antd';
import { REQUEST_STATE } from "app-configs";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function ListHotProduct() {
    const [listProducts, setListProducts] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getListProduct = async () => {
            const listResult = await productService.listHotProduct();
            for (let i = 0; i < listResult.data.length; i++) {
                const subCategory = await categoryService.detailCategoryById(listResult.data[i].category_id);
                listResult.data[i].category_name = subCategory.data.name;
            }
            setListProducts(listResult);
        }
        getListProduct();
    }, [isReload])
    const handleUnSetHotProduct = async (id) => {
        setIsLoading(true);
        const response = await productService.unSetHotProduct(id);
        setIsReload(!isReload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Xóa sản phẩm bán chạy',
                description:
                    "Thành công",
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Xóa sản phẩm bán chạy',
                description:
                    'Một lỗi đã xảy ra khi xóa sản phẩm này',
            });
        }
        setIsLoading(false);

    }

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3
                                        className="mb-0 font-semibold text-lg text-blueGray-700"
                                    >
                                        Danh sách sản phẩm bán chạy
                                    </h3>
                                </div>
                                <a
                                    href='/admin/add-products'
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                                >
                                    Thêm sản phẩm
                                </a>
                                <a
                                    href='/admin/list-products'
                                    className="bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                                >
                                    Trở về
                                </a>

                            </div>
                        </div>
                    </div>
                    <CardListHotProducts
                        handleUnSetHotProduct={handleUnSetHotProduct}
                        listProducts={listProducts.data}
                    />
                </div>
            </div>
        </>
    );
}
