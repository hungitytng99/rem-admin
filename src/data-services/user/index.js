
// Data Flow: Step 2
import { apiChangePwd } from "data-source/user";
import { apiSignIn } from "data-source/user";

// transform data to fit with UI;
export const userService = {
    signIn: function (params) {
        return apiSignIn(params).then(response => {
            return response;
        });
    },

    changePwd: function (params) {
        return apiChangePwd(params).then(response => {
            return response;
        });
    },


   
}
