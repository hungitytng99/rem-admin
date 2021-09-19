import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { EDITOR_OPTION } from "app-configs";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useFormik } from 'formik';
import draftjsToHtml from "draftjs-to-html";
import Select from 'react-select';
import { tagService } from "data-services/tag";
import { TagFilled } from "@ant-design/icons";
// components

export default function CardEditPost(props) {
    const { detailPost, handleEditPost } = props;
    const [shortDesc, setShortDesc] = useState(EditorState.createEmpty());
    const onShortDescChange = (shortDesc) => {
        setShortDesc(shortDesc);
    }
    const [tagOption, setTagOption] = useState({ label: '', value: '' });
    const [tagSelected, setTagSelected] = useState({ label: '', value: '' });
    const handleTagChange = categoryOption => {
        setTagSelected(categoryOption);
    };

    const postSchema = Yup.object().shape({
        title: Yup.string()
            .required('Trường này không được để trống'),
        url_image: Yup.string()
            .required('Trường này không được để trống')
            .url('Trường này phải là một URL'),
    });

    const formik = useFormik({
        initialValues: {
            title: '', url_image: '',
        },
        onSubmit: (values) => {
            const params = { ...values, tag_id: tagSelected.value, content: draftjsToHtml(convertToRaw(shortDesc.getCurrentContent())) }
            console.log(params);
            handleEditPost(params)
        },
        validationSchema: postSchema,
    });
    const subCategoryStyle = {
        control: styles => ({ ...styles, height: '45px' })
    }

    useEffect(() => {
        if (detailPost?.state === "SUCCESS") {
            (async () => {
                let listTag = await tagService.listTag();
                listTag.data = listTag.data.map((tag) => {
                    if (tag.id === detailPost.data.tag_id) {
                        setTagSelected({
                            label: tag.name,
                            value: tag.id,
                        })
                    }
                    return {
                        label: tag.name,
                        value: tag.id,
                    }
                });
                setTagOption(listTag.data);
            })();
            // other field
            formik.values.title = detailPost.data.name;
            formik.values.url_image = detailPost.data.image;
            // handle convert initial short desc
            const blockShortHTML = convertFromHTML(detailPost.data.content);
            let shortState = ContentState.createFromBlockArray(
                blockShortHTML.contentBlocks,
                blockShortHTML.entityMap
            );
            setShortDesc(EditorState.createWithContent(shortState));
        }

    }, [detailPost])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Sửa bài đăng</h6>
                        <a
                            href='/admin/list-post'
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
                                        Tên <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        autoComplete="off"
                                        name="title"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Tên sản phẩm"
                                    />
                                    {formik.touched.title && formik.errors.title ? (
                                        <div className="text-rose-600">{formik.errors.title}</div>
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
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image}
                                        autoComplete="off"
                                        name="url_image"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="URL ảnh chính"
                                    />
                                    {formik.touched.url_image && formik.errors.url_image ? (
                                        <div className="text-rose-600">{formik.errors.url_image}</div>
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
                                            styles={subCategoryStyle}
                                            className="w-64 z-50"
                                            placeholder="Chọn chủ đề"
                                            onChange={handleTagChange}
                                            options={tagOption}
                                            value={tagSelected}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4">
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
                                className="mt-4 mr-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Lưu lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
