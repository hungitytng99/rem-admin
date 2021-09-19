// config for dev;
export const Configs = {
    BASE_API: "http://103.163.118.206:1237/api",

    CURRENT_PAGE: 1,
    FILE_MAXIMUM: 2, //MB
    PAGE_SIZE_20: 20,
    PAGE_SIZE_4: 4,
};

export const REQUEST_STATE = {
    ERROR: "ERROR",
    REQUEST: "REQUEST",
    SUCCESS: "SUCCESS",
};

export const ACTION_TYPE = {
    CREATE: "CREATE",
    LIST: "LIST",
    VIEW: "VIEW",
    DELETE: "DELETE",
    UPDATE: "UPDATE",
    UNMOUNT: "UNMOUNT"
};

export const EDITOR_OPTION = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history', 'colorPicker', 'image', 'remove',],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
    }
}