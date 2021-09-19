import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { categoryService } from "data-services/category";

// components

export default function CardAddMainCategory(props) {
    const { addCategory, addMainCategory } = props;
    const [categorySelected, setCategorySelected] = useState({ label: '', value: '' });
    const [categoryOption, setCategoryOption] = useState({ label: '', value: '' });

    const mainCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required('Trường này không được để trống'),
        description: Yup.string()
            .required('Trường này không được để trống'),
        url_image: Yup.string()
            .required('Trường này không được để trống')
            .url('Trường này phải là một URL')

    });

    const categorySchema = Yup.object().shape({
        name: Yup.string()
            .required('Trường này không được để trống'),
    });

    const handleSubChange = categoryOption => {
        setCategorySelected(categoryOption);
    };

    useEffect(() => {
        (async function () {
            let listCategory = await categoryService.listMainCategory();
            listCategory.data = listCategory.data.map((category) => {
                return {
                    label: category.name,
                    value: category.id,
                }
            });
            setCategoryOption(listCategory.data);
        })();
    }, [])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100">

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={categorySchema}
                        onSubmit={async (values, { resetForm }) => {
                            // console.log(categorySelected);
                            addCategory({ ...values, main_category_id: categorySelected.value }, resetForm);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 font-bold uppercase">
                                    Danh mục phụ
                                </h6>
                                <div className="flex flex-wrap">
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
                                                placeholder="Tên danh mục con" />
                                            {errors.name && touched.name ? (
                                                <div className="text-rose-600">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
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
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Thêm danh mục
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />


                            </Form>
                        )}
                    </Formik>
                    <Formik
                        initialValues={{
                            name: '', description: '', url_image: ''
                        }}
                        validationSchema={mainCategorySchema}
                        onSubmit={async (values, { resetForm }) => {
                            addMainCategory(values, resetForm);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 font-bold uppercase">
                                    Danh mục chính
                                </h6>
                                <div className="flex flex-wrap">
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
                                                placeholder="Tên" />
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
                                                Ảnh <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Tên" />
                                            {errors.url_image && touched.url_image ? (
                                                <div className="text-rose-600">{errors.url_image}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Mô tả <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                component="textarea"
                                                autoComplete="off"
                                                name="description"
                                                rows={4}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
                                                placeholder="Mô tả" />
                                            {errors.description && touched.description ? (
                                                <div className="text-rose-600">{errors.description}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Thêm danh mục
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />


                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    );
}
