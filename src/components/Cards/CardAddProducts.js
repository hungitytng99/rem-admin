import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EDITOR_OPTION } from "app-configs";
import draftToHtml from 'draftjs-to-html';
import { productService } from "data-services/product";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";


// components

export default function CardAddProducts() {
    const [categoryOption, setCategoryOption] = useState({ label: '', value: '' });
    const [categorySelected, setCategorySelected] = useState({ label: '', value: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubChange = categoryOption => {
        setCategorySelected(categoryOption);
    };

    const productSchema = Yup.object().shape({
        name: Yup.string()
            .required('Trường này không được để trống'),
        model_number: Yup.string()
            .required('Trường này không được để trống'),
        origin: Yup.string(),
        brand: Yup.string(),
        thickness: Yup.string(),
        material: Yup.string(),
        weight: Yup.string(),
        feature: Yup.string(),
        repeat_deg: Yup.string(),
        unit_cost: Yup.number()
            .min(0, "Giá bán phải lớn hơn 0VNĐ")
            .required('Vui lòng nhập đúng giá bán (đơn vị: nghìn VNĐ/m2).'),
        main_image_url: Yup.string()
            .required('Trường này không được để trống')
            .url('Trường này phải là một URL'),
        url_image1: Yup.string()
            .url('Trường này phải là một URL'),
        url_image2: Yup.string()
            .url('Trường này phải là một URL'),
        url_image3: Yup.string()
            .url('Trường này phải là một URL'),
        url_image4: Yup.string()
            .url('Trường này phải là một URL'),
        url_image5: Yup.string()
            .url('Trường này phải là một URL'),

    });

    useEffect(() => {
        const listCategory = async () => {
            let listCategory = await categoryService.listCategory();
            listCategory.data = listCategory.data.map((category) => {
                return {
                    label: category.name,
                    value: category.id,
                }
            });
            setCategoryOption(listCategory.data);
        }
        listCategory();
    }, [])

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Thêm sản phẩm</h6>
                        <a
                            href='/admin/list-products'
                            className="flex items-center bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                        >
                            Trở về
                        </a>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: '', model_number: '', origin: '', brand: 'Rèm Vương Hồng', unit_cost: '',
                            thickness: '', material: '', weight: '', feature: '', repeat_deg: '',
                            main_image_url: '', url_image1: '', url_image2: '', url_image3: '', url_image4: '', url_image5: ''
                        }}
                        validationSchema={productSchema}
                        onSubmit={async (values, { resetForm }) => {
                            // same shape as initial values
                            let listImage = [values.main_image_url, values.url_image1, values.url_image2, values.url_image3, values.url_image4];
                            listImage = listImage.filter(image => {
                                if (image !== "") {
                                    return image;
                                }
                            })
                            const params = {
                                name: values.name,
                                model_number: values.model_number,
                                list_product_images: listImage,
                                origin: values.origin,
                                brand: values.brand,
                                thickness: values.thickness,
                                material: values.material,
                                weight: values.weight,
                                feature: values.feature,
                                repeat_deg: values.repeat_deg,
                                unit_cost: values.unit_cost,
                                category_id: categorySelected.value
                            }
                            console.log(params);
                            setIsLoading(true);
                            const response = await productService.createProduct(params);
                            if (response.state === REQUEST_STATE.SUCCESS) {
                                notification['success']({
                                    message: 'Thêm sản phẩm',
                                    description:
                                        'Thêm sản phẩm thành công',
                                });
                                resetForm();
                            }
                            console.log("RESPONSE: ", response);
                            if (response.state === REQUEST_STATE.ERROR) {
                                let message = "Một lỗi đã xảy ra khi thêm sản phẩm";
                                if (response.message.errno === 1062) {
                                    message = "Mã sản phẩm cho sản phẩm này đã tồn tại"
                                }
                                if (response.message.errno === 1366) {
                                    message = "Vui lòng chọn danh mục"
                                }
                                notification['error']({
                                    message: 'Thêm sản phẩm',
                                    description: message
                                });
                            }
                            setIsLoading(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Thông tin về sản phẩm
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Mã SP <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="model_number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Mã sản phẩm" />
                                            {errors.model_number && touched.model_number ? (
                                                <div className="text-rose-600">{errors.model_number}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Tên <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="name"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Tên sản phẩm" />
                                            {errors.name && touched.name ? (
                                                <div className="text-rose-600">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Thương hiệu
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="brand"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Thương hiệu" />
                                            {errors.brand && touched.brand ? (
                                                <div className="text-rose-600">{errors.brand}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Nguồn gốc
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="origin"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Nguồn gốc" />
                                            {errors.origin && touched.origin ? (
                                                <div className="text-rose-600">{errors.origin}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Độ dày
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="thickness"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Độ dày" />
                                            {errors.thickness && touched.thickness ? (
                                                <div className="text-rose-600">{errors.thickness}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Nguyên liệu
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="material"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Nguyên liệu" />
                                            {errors.material && touched.material ? (
                                                <div className="text-rose-600">{errors.material}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Trọng lượng
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="weight"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Trọng lượng" />
                                            {errors.weight && touched.weight ? (
                                                <div className="text-rose-600">{errors.weight}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Đặc tính
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="feature"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Đặc tính" />
                                            {errors.feature && touched.feature ? (
                                                <div className="text-rose-600">{errors.feature}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Độ lặp
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="repeat_deg"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Độ lặp" />
                                            {errors.repeat_deg && touched.repeat_deg ? (
                                                <div className="text-rose-600">{errors.repeat_deg}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Giá bán (nghìn VND/m2) <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="unit_cost"
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Giá bán (nghìn VND/m2)" />
                                            {errors.unit_cost && touched.unit_cost ? (
                                                <div className="text-rose-600">{errors.unit_cost}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Hình ảnh sản phẩm
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh chính <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="main_image_url"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url ảnh chính" />
                                            {errors.main_image_url && touched.main_image_url ? (
                                                <div className="text-rose-600">{errors.main_image_url}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh phụ 1
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image1"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image1 && touched.url_image1 ? (
                                            <div className="text-rose-600">{errors.url_image1}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh phụ 2
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image2"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image2 && touched.url_image2 ? (
                                            <div className="text-rose-600">{errors.url_image2}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh phụ 3
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image3"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image3 && touched.url_image3 ? (
                                            <div className="text-rose-600">{errors.url_image3}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh phụ 4
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image4"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image4 && touched.url_image4 ? (
                                            <div className="text-rose-600">{errors.url_image4}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh phụ 5
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image5"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image5 && touched.url_image5 ? (
                                            <div className="text-rose-600">{errors.url_image5}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Danh mục
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Danh mục <span className="text-rose-600">*</span>
                                            </label>
                                            <Select
                                                className="w-64"
                                                placeholder="Chọn danh mục"
                                                onChange={handleSubChange}
                                                options={categoryOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add product
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

        </>
    );
}
