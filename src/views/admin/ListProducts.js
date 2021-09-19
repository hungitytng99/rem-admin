import React, { useEffect, useState } from "react";
// components
import 'antd/dist/antd.css';
import CardListProducts from "components/Cards/CardListProducts";
import { productService } from "data-services/product/index.js";
import FullPageLoading from "components/Loading/FullPageLoading";
import { REQUEST_STATE } from "app-configs";
import { notification } from 'antd';
import { categoryService } from "data-services/category";


export default function ListProducts() {
    const [listProducts, setListProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');

    useEffect(() => {
        const getListProduct = async () => {
            const listResult = await productService.listProduct();
            for (let i = 0; i < listResult.data.listProductReturn.length; i++) {
                const subCategory = await categoryService.detailCategoryById(listResult.data.listProductReturn[i].category_id);
                listResult.data.listProductReturn[i].category_name = subCategory.data.name;
            }
            setListProducts(listResult);
        }
        getListProduct();
    }, [])

    const handleDeleteProduct = async (id) => {
        setIsLoading(true);
        const response = await productService.deleteProduct(id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            let listProductsTmp = { ...listProducts };
            listProductsTmp.data.listProductReturn = listProducts.data.listProductReturn.filter((item) => {
                if (Number(item.id) !== Number(id)) {
                    return item;
                }
            })
            setListProducts(listProductsTmp);
            notification['success']({
                message: 'Xóa sản phẩm',
                description:
                    'Thành công',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Xóa sản phẩm',
                description:
                    'Một lỗi đã xảy ra',
            });
        }

        setIsLoading(false);
    }

    const handleSetHotProduct = async (id) => {
        setIsLoading(true);
        const response = await productService.setHotProduct(id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Sản phẩm bán chạy',
                description:
                    'Thành công',
            });
        }
        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Sản phẩm bán chạy',
                description:
                    'Sản phẩm này đã là sản phẩm bán chạy',
            });
        }
        setIsLoading(false);
    }

    const handleSearch = (e) => {
        setSearchProduct(e.target.value);
    }

    const pressEnterSearch = (e) => {
        if(e.key === "Enter") {
            search();
        }
    }

    const search = async () => {
        setIsLoading(true);
        const listResult = await productService.listProduct({ search: searchProduct });
        setListProducts(listResult);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-0 sm:px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="relative mt-2 lg:mt-0 flex w-full max-w-full flex-grow sm:flex-wrap flex-1">
                                    <h3
                                        className="mb-0 mr-2 whitespace-nowrap font-semibold text-lg text-blueGray-700"
                                    >
                                        Danh sách sản phẩm
                                    </h3>
                                    <div className="min-w-32 sm:min-w-48 relative">
                                        <i onClick={search} className="absolute right-0 text-gray-600 top-1/2 transform -translate-x-1/2 -translate-y-1/2 fas fa-search hover:cursor-pointer hover:text-gray-800"></i>
                                        <input value={searchProduct} onKeyDown={pressEnterSearch} onChange={handleSearch} type='text' className="border-0 w-full pl-2 pr-6 py-2 text-sm ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-lightBlue-600 rounded" placeholder="Tìm kiếm sản phẩm..." />
                                    </div>
                                </div>
                                <div className="mt-2 lg:mt-0">
                                    <a
                                        href='/admin/list-hot-products'
                                        className="whitespace-nowrap bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                                    >
                                        Sản phẩm bán chạy
                                    </a>
                                    <a
                                        href='/admin/add-products'
                                        className="whitespace-nowrap bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                                    >
                                        Thêm sản phẩm
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardListProducts
                        handleSetHotProduct={handleSetHotProduct}
                        handleDeleteProduct={handleDeleteProduct}
                        listProducts={listProducts.data}
                    />
                </div>
            </div>
        </>
    );
}
