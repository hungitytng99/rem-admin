import { notification } from "antd";
import { REQUEST_STATE } from "app-configs";
import CardEditPost from "components/Cards/CardEditPost";
import { postService } from "data-services/post";
import React, { useEffect, useState } from "react";

export default function EditPost(props) {
    const postId = props.match.params.id;
    const [detailPostState, setDetailPostState] = useState({ });

    const handleEditPost = async (params) => {
        const response = await postService.updatePost(postId, params);
        console.log(response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Sửa bài viết',
                description:
                    'Thành công',
            });
        } else {
            notification['error']({
                message: 'Sửa bài viết',
                description:
                    'Một lỗi đã xảy ra khi đăng bài viết',
            });
        }
    }

    useEffect(() => {
        const getDetailPost = async () => {
            const detailPost = await postService.detailPostById(postId);
            setDetailPostState(detailPost);
        }
        console.log(detailPostState);
        getDetailPost();
    }, [])


    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                    <CardEditPost detailPost={detailPostState} handleEditPost={handleEditPost} />
                </div>
            </div>
        </>
    );
}