import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListTag = async (params) => {
    try {
        const response = await GET("/tag/", params, { isFullPath: false });
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

export const apiCreateTag = async (id, params) => {
    try {
        const response = await POST("/tag/" + id, params);
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

export const apiDetailTagById = async (id, params) => {
    try {
        const response = await GET("/tag/" + id, params);
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


export const apiUpdateTag = async (id, params) => {
    try {
        const response = await PUT("/tag/" + id, params);
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

export const apiDeleteTag = async (id) => {
    try {
        const response = await DELETE("/tag/" + id);
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

