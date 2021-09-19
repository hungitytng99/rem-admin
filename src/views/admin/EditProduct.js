import React, { useEffect, useState } from "react";
import { notification } from 'antd';
import CardEditProduct from "components/Cards/CardEditProduct";
import { productService } from "data-services/product";
import { REQUEST_STATE } from "app-configs";

export default function EditProduct(props) {
  const productId = props.match.params.id;
  const [detailProductState, setDetailProductState] = useState({});

  useEffect(() => {
    const getDetailProduct = async () => {
      const detailProduct = await productService.detailProductById(productId);
      setDetailProductState(detailProduct);
    }
    getDetailProduct();
  }, [])

  const submitEditCategory = async (params) => {
    const response = await productService.updateProduct(productId, params)
    if(response.state === REQUEST_STATE.SUCCESS) {
      
      notification['success']({
          message: 'Cập nhật sản phẩm',
          description:
              "Thành công",
      });
  }

  if(response.state === REQUEST_STATE.ERROR) {
    let message = "Một lỗi đã xảy ra khi cập nhật sản phẩm";
    if( response.message.errno === 1062) {
        message = "Mã sản phẩm cho sản phẩm này đã tồn tại"
    }
    if( response.message.errno === 1366) {
        message = "Vui lòng chọn danh mục"
    }
      notification['error']({
          message: 'Cập nhật sản phẩm',
          description: message,
      });
  }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardEditProduct
            detailProduct={detailProductState}
            productId={productId} 
            submitEditCategory={submitEditCategory}
            />
        </div>
      </div>
    </>
  );
}