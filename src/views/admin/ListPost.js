import React, { useEffect, useState } from "react";
// components
import 'antd/dist/antd.css';
import CardListProducts from "components/Cards/CardListProducts";
import { productService } from "data-services/product/index.js";
import FullPageLoading from "components/Loading/FullPageLoading";
import { REQUEST_STATE } from "app-configs";
import { notification } from 'antd';
import { categoryService } from "data-services/category";
import CardListPosts from "components/Cards/CardListPosts";
import { postService } from "data-services/post";
import { tagService } from "data-services/tag";


export default function ListPost() {
    const [listPosts, setListPosts] = useState({ postsResult: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getListPost = async () => {
            const listResult = await postService.listPost();
            for (let i = 0; i < listResult.data.postsResult.length; i++) {
              const detailTag = await tagService.detailTagById(listResult.data.postsResult[i].tag_id);
              listResult.data.postsResult[i].tag_name = detailTag.name;
            }
            console.log("RESULT CB: ", listResult);

            // postsResult
            setListPosts(listResult.data);
        }
        getListPost();
    }, [])

    const handleDeletePost = async (id) => {
        setIsLoading(true);
        const response = await postService.deletePost(id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            let listPostsTmp = { ...listPosts };
            console.log("RESPONSE: ", response);
            console.log("List post:  ", listPostsTmp);
            listPostsTmp.postsResult = listPosts.postsResult.filter((item) => {
                if (Number(item.id) !== Number(id)) {
                    return item;
                }
            })
            setListPosts(listPostsTmp);
            notification['success']({
                message: 'Xóa bài viết',
                description:
                    'Thành công',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Xóa bài viết',
                description:
                    'Một lỗi đã xảy ra',
            });
        }

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
                                        Danh sách bài viết
                                    </h3>
                                </div>
                                <div className="mt-2 lg:mt-0">
                                    <a
                                        href='/admin/add-post'
                                        className="whitespace-nowrap bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                                    >
                                        Đăng bài viết
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardListPosts
                        handleDeletePost={handleDeletePost}
                        listPosts={listPosts.postsResult}
                    />
                </div>
            </div>
        </>
    );
}
