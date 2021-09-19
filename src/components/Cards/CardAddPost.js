import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { convertToRaw, EditorState } from "draft-js";
import { EDITOR_OPTION } from "app-configs";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { tagService } from "data-services/tag";
// components

export default function CardAddPost(props) {
    const { addPost } = props;
    const [shortDesc, setShortDesc] = useState(EditorState.createEmpty());
    const [tagOption, setTagOption] = useState({ label: '', value: '' });
    const [tagSelected, setTagSelected] = useState({ label: '', value: '' });

    const handleTagChange = categoryOption => {
        setTagSelected(categoryOption);
    };

    const onShortDescChange = (shortDesc) => {
        setShortDesc(shortDesc);
    }

    const mainCategorySchema = Yup.object().shape({
        title: Yup.string()
            .required('Trường này không được để trống'),
        url_image: Yup.string()
            .required('Trường này không được để trống')
            .url('Trường này phải là một URL'),
    });

    useEffect(() => {
        (async () => {
            let listTag = await tagService.listTag();
            listTag.data = listTag.data.map((tag) => {
                return {
                    label: tag.name,
                    value: tag.id,
                }
            });
            setTagOption(listTag.data);
        })();
    }, [])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            title: '', url_image: ''
                        }}
                        validationSchema={mainCategorySchema}
                        onSubmit={async (values, { resetForm }) => {
                            let params = { ...values, tag_id: tagSelected.value, content: draftToHtml(convertToRaw(shortDesc.getCurrentContent())) }
                            addPost(params, resetForm, setShortDesc);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="flex justify-between py-3">
                                    <h6 className="text-blueGray-400 text-sm mt-3 font-bold uppercase">
                                        Danh mục
                                    </h6>
                                    <a
                                        href='/admin/list-post'
                                        className="bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    >
                                        Back
                                    </a>
                                </div>

                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Tiêu đề bài viết <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="title"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Tiêu đề bài viết" />
                                            {errors.title && touched.title ? (
                                                <div className="text-rose-600">{errors.title}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                            >
                                                Ảnh chính <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Ảnh chính" />
                                            {errors.url_image && touched.url_image ? (
                                                <div className="text-rose-600">{errors.url_image}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                >
                                                    Chủ đề <span className="text-rose-600">*</span>
                                                </label>
                                                <Select
                                                    className="w-64"
                                                    placeholder="Chọn chủ đề"
                                                    onChange={handleTagChange}
                                                    options={tagOption}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <label
                                            className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                        >
                                            Nội dung <span className="text-rose-600">*</span>
                                        </label>
                                        <Editor
                                            editorState={shortDesc}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="bg-white border border-gray-300"
                                            editorClassName="px-4"
                                            onEditorStateChange={onShortDescChange}
                                            toolbar={EDITOR_OPTION}
                                        />
                                    </div>

                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="mt-3 mr-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Đăng bài viết
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
