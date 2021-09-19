import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryService } from "data-services/category";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { EDITOR_OPTION } from "app-configs";
import draftjsToHtml from "draftjs-to-html";
// components

export default function CardEditProduct(props) {
    const { submitEditCategory, detailProduct = { data: { description: '' } } } = props;
    const [categoryOption, setCategoryOption] = useState({ label: '', value: '' });
    const [categorySelected, setCategorySelected] = useState({ label: '', value: '' });
    const [shortDesc, setShortDesc] = useState(EditorState.createEmpty());
    const [longDesc, setLongDesc] = useState(EditorState.createEmpty());
    const onShortDescChange = (shortDesc) => {
        setShortDesc(shortDesc);
    }
    const onLongDescChange = (shortDesc) => {
        setLongDesc(shortDesc);
    }
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

    const formik = useFormik({
        initialValues: {
            name: '', model_number: '', origin: '', brand: 'Rèm Vương Hồng',
            thickness: '', material: '', weight: '', feature: '', repeat_deg: '',
            main_image_url: '', url_image1: '', url_image2: '', url_image3: '', url_image4: '', url_image5: ''
        },
        onSubmit: (values) => {
            let listImage = [
                values.main_image_url,
                values.url_image1,
                values.url_image2,
                values.url_image3,
                values.url_image4,
                values.url_image5
            ];
            listImage = listImage.filter(item => item);
            let params = {
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
                category_id: categorySelected.value
            }
            submitEditCategory(params);
        },
        validationSchema: productSchema,
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

        if (detailProduct?.state === "SUCCESS") {

            // other field
            formik.values.name = detailProduct.data.name;
            formik.values.model_number = detailProduct.data.model;
            formik.values.origin = detailProduct.data.origin;
            formik.values.brand = detailProduct.data.brand;
            formik.values.thickness = detailProduct.data.thickness;
            formik.values.material = detailProduct.data.material;
            formik.values.weight = detailProduct.data.weight;
            formik.values.feature = detailProduct.data.feature;
            formik.values.repeat_deg = detailProduct.data.repeat_deg;
            formik.values.main_image_url = detailProduct.data?.image[0].src;
            formik.values.url_image1 = detailProduct.data?.image[1]?.src || '';
            formik.values.url_image2 = detailProduct.data?.image[2]?.src || '';
            formik.values.url_image3 = detailProduct.data?.image[3]?.src || '';
            formik.values.url_image4 = detailProduct.data?.image[4]?.src || '';
            formik.values.url_image5 = detailProduct.data?.image[5]?.src || '';


            // initial  category selected
            let categoryTmp = categoryOption.filter((item) => {
                if (item.value === detailProduct.data.category_id)
                    return item;
            })
            setCategorySelected(categoryTmp[0]);
        }
    }, [detailProduct])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Sửa sản phẩm</h6>
                        <a
                            href='/admin/list-products'
                            className="bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                            Back
                        </a>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Mã SP <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.model_number}
                                        autoComplete="off"
                                        name="model_number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Mã sản phẩm"
                                    />
                                    {formik.touched.model_number && formik.errors.model_number ? (
                                        <div className="text-rose-600">{formik.errors.model_number}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        autoComplete="off"
                                        name="name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Tên sản phẩm"
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-rose-600">{formik.errors.name}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.brand}
                                        autoComplete="off"
                                        name="brand"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Thương hiệu"
                                    />
                                    {formik.touched.brand && formik.errors.brand ? (
                                        <div className="text-rose-600">{formik.errors.brand}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.origin}
                                        autoComplete="off"
                                        name="origin"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Nguồn gốc"
                                    />
                                    {formik.touched.origin && formik.errors.origin ? (
                                        <div className="text-rose-600">{formik.errors.origin}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.thickness}
                                        autoComplete="off"
                                        name="thickness"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Độ dày"
                                    />
                                    {formik.touched.thickness && formik.errors.thickness ? (
                                        <div className="text-rose-600">{formik.errors.thickness}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.material}
                                        autoComplete="off"
                                        name="material"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Nguyên liệu"
                                    />
                                    {formik.touched.material && formik.errors.material ? (
                                        <div className="text-rose-600">{formik.errors.material}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.weight}
                                        autoComplete="off"
                                        name="weight"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Trọng lượng"
                                    />
                                    {formik.touched.weight && formik.errors.weight ? (
                                        <div className="text-rose-600">{formik.errors.weight}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.feature}
                                        autoComplete="off"
                                        name="feature"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Đặc tính"
                                    />
                                    {formik.touched.feature && formik.errors.feature ? (
                                        <div className="text-rose-600">{formik.errors.feature}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.repeat_deg}
                                        autoComplete="off"
                                        name="repeat_deg"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Độ lặp"
                                    />
                                    {formik.touched.repeat_deg && formik.errors.repeat_deg ? (
                                        <div className="text-rose-600">{formik.errors.repeat_deg}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Ảnh
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Ảnh chính <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.main_image_url}
                                        autoComplete="off"
                                        name="main_image_url"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh chính"
                                    />
                                    {formik.touched.main_image_url && formik.errors.main_image_url ? (
                                        <div className="text-rose-600">{formik.errors.main_image_url}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image1}
                                        autoComplete="off"
                                        name="url_image1"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh"
                                    />
                                    {formik.touched.url_image1 && formik.errors.url_image1 ? (
                                        <div className="text-rose-600">{formik.errors.url_image1}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Ảnh phụ 2
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image2}
                                        autoComplete="off"
                                        name="url_image2"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh"
                                    />
                                    {formik.touched.url_image2 && formik.errors.url_image2 ? (
                                        <div className="text-rose-600">{formik.errors.url_image2}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Ảnh phụ 3
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image3}
                                        autoComplete="off"
                                        name="url_image3"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh"
                                    />
                                    {formik.touched.url_image3 && formik.errors.url_image3 ? (
                                        <div className="text-rose-600">{formik.errors.url_image3}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Ảnh phụ 4
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image4}
                                        autoComplete="off"
                                        name="url_image4"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh"
                                    />
                                    {formik.touched.url_image4 && formik.errors.url_image4 ? (
                                        <div className="text-rose-600">{formik.errors.url_image4}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Ảnh phụ 5
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image5}
                                        autoComplete="off"
                                        name="url_image5"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Link ảnh"
                                    />
                                    {formik.touched.url_image5 && formik.errors.url_image5 ? (
                                        <div className="text-rose-600">{formik.errors.url_image5}</div>
                                    ) : null}
                                </div>
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
                                        value={categorySelected}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Lưu lại
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>

        </>
    );
}
