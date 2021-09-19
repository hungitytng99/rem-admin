
// Data Flow: Step 2

import { apiListProductByCategorySlug } from "data-source/product";
import { apiDetailProductBySlug } from "data-source/product";
import { apiCreateProduct } from "data-source/product";
import { apiSetHotProduct } from "data-source/product";
import { apiUpdateProduct } from "data-source/product";
import { apiListProductByMixCategorySlug } from "data-source/product";
import { apiListProductByMainCategorySlug } from "data-source/product";
import { apiUnSetHotProduct } from "data-source/product";
import { apiDeleteProduct } from "data-source/product";
import { apiListHotProduct } from "data-source/product";
import { apiDetailProductById } from "data-source/product";
import { apiListProductByCategoryId } from "data-source/product";
import { apiListProduct } from "data-source/product";

// transform data to fit with UI;
export const productService = {
    detailProductById: function (id, params) {
        return apiDetailProductById(id, params).then(response => {
            response.data = filterFieldProduct(response.data);
            return response;
        });
    },

    detailProductBySlug: function (slug, params) {
        return apiDetailProductBySlug(slug, params).then(response => {
            response.data = filterFieldProduct(response.data);
            return response;
        });

    },

    listProduct: function (params) {
        return apiListProduct(params).then(response => {
            console.log(response)
            response.data.listProductReturn = response.data.listProductReturn.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByCategoryId: function (id, params) {
        return apiListProductByCategoryId(id, params).then(response => {
            response.data.listProductReturn = response.data.listProductReturn.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByCategorySlug: function (slug, params) {
        return apiListProductByCategorySlug(slug, params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByMainCategorySlug: function (slug, params) {
        return apiListProductByMainCategorySlug(slug, params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByMixCategorySlug: function (slug, params) {
        return apiListProductByMixCategorySlug(slug, params).then(response => {
            response.data.listProductReturn = response.data.listProductReturn.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listHotProduct: function (params) {
        return apiListHotProduct(params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },
    //
    createProduct: function (params) {
        return apiCreateProduct(params).then(response => {
            return response;
        });
    },

    deleteProduct: function (id) {
        return apiDeleteProduct(id).then(response => {
            return response;
        });
    },

    setHotProduct: function (id) {
        return apiSetHotProduct(id).then(response => {
            return response;
        });
    },

    unSetHotProduct: function (id) {
        return apiUnSetHotProduct(id).then(response => {
            return response;
        });
    },

    updateProduct: function (id, params) {
        return apiUpdateProduct(id, params).then(response => {
            return response;
        })
    }

}

export const filterFieldProduct = (product) => {
    return {
        id: product.id || 0,
        name: product.name || '',
        description: product.description || '',
        model: product.model_number || '',
        price: product.price || '',
        material: product.material || '',
        brand: product.brand || '',
        origin: product.origin || '',
        weight: product.weight || '',
        repeat_deg: product.repeat_deg || '',
        feature: product.feature || '',
        thickness: product.thickness || '',
        size: product.size || '',
        category_id: product.category_id,
        main_category_id: product.main_category_id || '',
        slug: "/san-pham/" + product.slug || '',
        image: filterFieldImage(product.list_product_images, product.name),
    }
}

export const filterFieldImage = (listImage, alt) => {
    // [ imgSrc1 , imgSrc2, ... ]
    // => 
    // [ { src: imgSrc1, alt: imgAlt1} , { src: imgSrc2, alt: imgAlt2}, ... ]
    return listImage.map((image, index) => {
        return {
            id: index,
            isSelected: index == 0,
            src: image,
            alt: alt + "_" + String(Math.floor(Math.random() * 1000)),
        }
    })
}
