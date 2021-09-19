import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListPost = async (params) => {
    try {
        const response = await GET("/post/", params, { isFullPath: false });
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

export const apiCreatePost = async (params) => {
    try {
        const response = await POST("/post/",  params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailPostById = async (id) => {
    try {
        const response = await GET("/post/" + id);
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

export const apiDetailPostBySlug= async (slug) => {
    try {
        const response = await GET("/post/get-by-slug/" + slug);
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

export const apiListPostByTagSlug = async (slug) => {
    try {
        const response = await GET("/post/get-by-tag-slug/" + slug);
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

export const apiListPostByTagId = async (id) => {
    try {
        const response = await GET("/post/get-by-tag-id/" + id);
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

export const apiUpdatePost= async (id, params) => {
    try {
        const response = await PUT("/post/" + id, params);
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

export const apiDeletePost= async (id) => {
    try {
        const response = await DELETE("/post/" + id);
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

