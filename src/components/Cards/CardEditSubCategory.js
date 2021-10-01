import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryService } from "data-services/category";
// components

export default function CardEditSubCategory(props) {
    const { detailSubCategory, submitEditSubCategory } = props;
    const [mainCategoryOption, setMainCategoryOption] = useState([{ label: '', value: '' }]);
    const [mainCategorySelected, setMainCategorySelected] = useState({ label: '', value: '' })

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: (values) => {
            let params = {...values, main_category_id: mainCategorySelected.value};
            submitEditSubCategory(params);
        },
        validationSchema: validationSchema,
    });

    const handleMainChange = mainCategoryOption => {
        setMainCategorySelected(mainCategoryOption)
    };


    const subCategoryStyle = {
        control: styles => ({ ...styles, height: '45px' })
    }
    useEffect(() => {
        const listMainCateogry = async () => {
            let listMainCategory = await categoryService.listMainCategoryAsync();
            listMainCategory.data = listMainCategory.data.map((subCategory) => {
                return {
                    label: subCategory.name,
                    value: subCategory.id,
                }
            });
            setMainCategoryOption(listMainCategory.data);
        }
        listMainCateogry();
        if (detailSubCategory?.data?.name) {
            formik.values.name = detailSubCategory.data.name;
            setMainCategorySelected({ label: detailSubCategory.data.main_category_name, value: detailSubCategory.data.main_category_id })
        }
    }, [detailSubCategory])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Sub category
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                    >
                                        Name <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        autoComplete="off"
                                        name="name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="name"
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
                                        Sub category <span className="text-rose-600">*</span>
                                    </label>
                                    <Select
                                        styles={subCategoryStyle}
                                        placeholder="Sub category"
                                        onChange={handleMainChange}
                                        options={mainCategoryOption}
                                        value={mainCategorySelected}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                               Chỉnh sửa danh mục phụ
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>

        </>
    );
}
