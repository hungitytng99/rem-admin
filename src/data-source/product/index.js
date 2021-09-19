import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListProduct = async (params) => {
    try {
        const response = await GET("/product/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiCreateProduct = async (params) => {
    try {
        const response = await POST("/product/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data,
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

export const apiListProductByCategoryId = async (id, params) => {
    try {
        const response = await GET("/product/get-by-category-id/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByMainCategorySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-main-category-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByMixCategorySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-mix-category-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByCategorySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-category-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailProductBySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailProductById = async (id, params) => {
    try {
        const response = await GET("/product/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


export const apiUpdateProduct = async (id, params) => {
    try {
        const response = await PUT("/product/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message
        };
    }
};

export const apiDeleteProduct = async (id) => {
    try {
        const response = await DELETE("/product/" + id);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListHotProduct = async (params) => {
    try {
        const response = await GET("/hot-product/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiSetHotProduct = async (id) => {
    try {
        const response = await GET("/hot-product/set/" + id, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiUnSetHotProduct = async (id) => {
    try {
        const response = await GET("/hot-product/unset/"+ id, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


