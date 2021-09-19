export const localSaveData = (key, value) => {

    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        console.log("error", error);
    }
};


export const localGetData = (key) => {
    
    try {
        const response = sessionStorage.getItem(key);
        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const localRemoveData = (key) => {
    try {
        sessionStorage.removeItem(key);
    } catch(error) {
        console.log("error", error);
    }
}