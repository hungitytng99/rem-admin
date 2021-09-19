import React from "react";
import { Menu, Dropdown, } from 'antd';


const HotProductDropdown = (props) => {
    const { productId, handleUnSetHotProduct } = props;
    // dropdown props
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <div
                    className={
                        "text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
                    }
                    onClick={() => handleUnSetHotProduct(productId)}
                >
                    Unset hot product
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <div className="w-4 hover:cursor-pointer hover:text-lightBlue-500">
                <i className="fas fa-ellipsis-v"></i>
            </div>
        </Dropdown>
    );
};

export default HotProductDropdown;
