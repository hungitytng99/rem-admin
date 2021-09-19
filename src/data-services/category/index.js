// Data Flow: Step 2

import { productService } from "data-services/product";
import { apiDeleteCategory } from "data-source/category";
import { apiUpdateCategory } from "data-source/category";
import { apiDetailMainCategoryId } from "data-source/category";
import { apiCreateMainCategory } from "data-source/category";
import { apiUpdateMainCategory } from "data-source/category";
import { apiDeleteMainCategory } from "data-source/category";
import { apiListMainCategory } from "data-source/category";
import { apiCreateCategory } from "data-source/category";
import { apiDetailCategoryBySlug } from "data-source/category";
import { apiListCategory } from "data-source/category";
import { apiDetailCategoryById } from "data-source/category";

// transform data to fit with UI;
export const categoryService = {
    listCategory: function (params) {
        return apiListCategory(params).then(response => {
            response.data = response.data.map(category => {
                return filterFieldCategory(category);
            })
            return response;
        });
    },
    listMainCategory: function (params) {
        return apiListMainCategory(params).then(response => {
            response.data = response.data.map(category => {
                return filterFieldCategory(category);
            })
            return response;
        });
    },

    detailCategoryById: function (id) {
        return apiDetailCategoryById(id).then(response => {
            response.data = filterFieldCategory(response.data);
            return response;
        });
    },

    detailMainCategoryById: function (id, params) {
        return apiDetailMainCategoryId(id, params).then(response => {
            response.data = filterFieldMainCategory(response.data);
            return response;
        });
    },

    detailCategoryBySlug: function (slug) {
        return apiDetailCategoryBySlug(slug).then(response => {
            response.data = filterFieldCategory(response.data);
            return response;
        });
    },

    listCategoryWithProduct: async function (paramsCategory, paramsProduct) {
        let listCategoryWithProduct = await this.listCategory(paramsCategory);
        let count = 0;
        for (let i = 0; i < listCategoryWithProduct.data.length; i++) {
            if (count == 4) break; // limit 4 category at home page
            const listProduct = await productService.listProductByCategoryId(listCategoryWithProduct.data[i].id, paramsProduct);
            if (listProduct.data.length > 0) {
                count++;
                listCategoryWithProduct.data[i] = { ...listCategoryWithProduct.data[i], listProduct: listProduct.data };
            }
        }
        return listCategoryWithProduct;
    },

    deleteCategory: function (id) {
        return apiDeleteCategory(id).then(response => {
            return response;
        });
    },

    deleteMainCategory: function (id) {
        return apiDeleteMainCategory(id).then(response => {
            return response;
        });
    },

    createCategory: function (params) {
        return apiCreateCategory(params).then(response => {
            return response;
        });
    },
    createMainCategory: function (params) {
        return apiCreateMainCategory(params).then(response => {
            return response;
        });
    },

    updateCategory: function (id, params) {
        return apiUpdateCategory(id, params).then(response => {
            return response;
        });
    },

    updateMainCategory: function (id, params) {
        return apiUpdateMainCategory(id, params).then(response => {
            return response;
        });
    },

}

export const filterFieldCategory = (category) => {
    return {
        id: category.id,
        name: category.name,
        description: category.description,
        slug: "/danh-muc/" + category.slug,
        main_category_id: category.main_category_id
    }
}

export const filterFieldMainCategory = (category) => {
    return {
        id: category.id,
        name: category.name,
        description: category.description,
        slug: "/danh-muc/" + category.slug,
        sub_category: category.sub_category,
        url_image: category.url_image
    }
}
