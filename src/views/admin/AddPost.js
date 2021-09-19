import { notification } from "antd";
import CardAddPost from "components/Cards/CardAddPost";
import { postService } from "data-services/post";
import React from "react";

export default function AddPost() {
  const addPost = async (params, resetForm, resetPost) => {
    const response = await postService.addPost(params);
    if (response.data.status === 200) {
      notification['success']({
        message: 'Đăng bài viết',
        description:
          'Thành công',
      });
      resetForm();
      resetPost('');
    } else {
      notification['success']({
        message: 'Đăng bài viết',
        description:
          'Một lỗi đã xảy ra khi đăng bài viết',
      });
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardAddPost addPost={addPost} />
        </div>
      </div>
    </>
  );
}