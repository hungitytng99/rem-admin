import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components

export default function CardEditMainCategory(props) {
    const { detailCategory, submitEditMainCategory } = props;

    const [, setIsReload] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Trường này không được để trống'),
        description: Yup.string()
            .required('Trường này không được để trống'),
        url_image: Yup.string()
            .required('Trường này không được để trống'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            url_image: ''
        },
        onSubmit: (values) => {
            submitEditMainCategory(values);
        },
        validationSchema: validationSchema,
    });

    useEffect(() => {
        if (detailCategory?.state === "SUCCESS") {
            console.log("DETAIL: ", detailCategory);
            formik.values.name = detailCategory.data.name;
            formik.values.description = detailCategory.data.description;
            formik.values.url_image = detailCategory.data.url_image;
            setIsReload(true);
        }
    }, [detailCategory])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Danh mục
                        </h6>
                        <div className="flex flex-wrap">
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
                                        placeholder="Tên danh mục"
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
                                        Ảnh <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image}
                                        autoComplete="off"
                                        name="url_image"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ảnh danh mục"
                                    />
                                    {formik.touched.url_image && formik.errors.url_image ? (
                                        <div className="text-rose-600">{formik.errors.url_image}</div>
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
                                    <textarea
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        autoComplete="off"
                                        name="description"
                                        rows={4}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
                                        placeholder="Mô tả"
                                    />
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className="text-rose-600">{formik.errors.description}</div>
                                    ) : null}
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
