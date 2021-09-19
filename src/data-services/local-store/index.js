import {localSaveData, localGetData, localRemoveData} from "data-source/local-store/index.js";

// transform data to fit with UI;

export const LocalStore = {
    
    setItem : function(key, value) {
        
        // cover all value's type;
        const source = {
            value: value
        };

        if (key != null) {
            localSaveData(key, JSON.stringify(source));
        } else {
            console.log("LocalStore: save data error");
        }
    },

    getItem: function(key) {
        const source = localGetData(key);
        return JSON.parse(source).value;
    },

    removeItem: function(key) {
        localRemoveData(key);
    }
}