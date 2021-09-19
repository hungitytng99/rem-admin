import React from "react";
import { createPopper } from "@popperjs/core";
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { Modal } from 'antd';

const CategoryDropdown = (props) => {
  const { subCategoryId, mainCategoryId, handleDeleteSubCategory } = props;

  // confirm
  const [confirm, setConfirm] = React.useState(false);
  const showModal = () => {
    setConfirm(true);
  };
  const handleOk = () => {
    handleDeleteSubCategory(mainCategoryId, subCategoryId);
    setConfirm(false);
  }
  const handleCancel = () => {
    setConfirm(false);
  }

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <a
          href={`/admin/edit-sub-category/${subCategoryId}`}
          className={
            "text-sm py-1 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Edit
        </a>
      </Menu.Item>
      <Menu.Item key={2}>
        <div
          className={
            "text-sm py-1 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:text-lightBlue-500"
          }
          onClick={() => showModal()}
        >
          Delete
        </div>
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="hover:cursor-pointer hover:text-lightBlue-500">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </Dropdown>
      <Modal
        title="Xóa danh mục"
        visible={confirm}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Hành động này sẽ xóa tất cả sản phẩm của danh mục này. Bạn chắc chắn chứ?</p>
      </Modal>
    </>
  );
};

export default CategoryDropdown;
