import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListCategory = async (params) => {
    try {
        const response = await GET("/category/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};



export const apiListMainCategory = async (params) => {
    try {
        const response = await GET("/main-category/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiDetailMainCategoryId = async (id, params) => {
    try {
        const response = await GET("/main-category/" + id, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiDetailCategoryById = async (categoryId) => {
    try {
        const response = await GET("/category/" + categoryId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiDetailCategoryBySlug = async (slug) => {
    try {
        const response = await GET("/category/get-by-slug/" + slug);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

//   PARAMS
//   {    
//     "name": "string",
//     "main_category_id": 0
//   }

export const apiCreateCategory = async (params) => {
    try {
        const response = await POST("/category/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiCreateMainCategory = async (params) => {
    try {
        const response = await POST("/main-category/", params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};
//   PARAMS
//   {
//     "name": "string",
//     "main_category_id": 0
//   }

export const apiUpdateCategory = async (categoryId, params) => {
    try {
        const response = await PUT("/category/" + categoryId, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiUpdateMainCategory = async (categoryId, params) => {
    try {
        const response = await PUT("/main-category/" + categoryId, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiDeleteCategory = async (categoryId) => {
    try {
        const response = await DELETE("/category/" + categoryId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

export const apiDeleteMainCategory = async (categoryId) => {
    try {
        const response = await DELETE("/main-category/" + categoryId);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: error.message
        };
    }
};

