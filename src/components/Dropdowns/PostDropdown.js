import React from "react";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { Menu, Dropdown, } from 'antd';

const PostDropdown = (props) => {
  const { postId, handleDeletePost } = props;
  // for confirm
  const [confirm, setConfirm] = React.useState(false);
  const showModal = () => {
    setConfirm(true);
  };
  const handleOk = () => {
    handleDeletePost(postId);
    setConfirm(false);
  }
  const handleCancel = () => {
    setConfirm(false);
  }
  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <a
          href={`/admin/edit-post/${postId}`}
          className="text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
        >
          Sửa
        </a>
      </Menu.Item>
      <Menu.Item key={2}>
        <div
          href="/"
          className={
            "text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
          }
          onClick={showModal}
        >
         Xóa
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="w-4 hover:cursor-pointer hover:text-lightBlue-500">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </Dropdown>
      <Modal
        title="Xóa bài viết"
        visible={confirm}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn chắc chắn muốn xóa bài viết này chứ?'</p>
      </Modal>
    </>
  );
};

export default PostDropdown;
