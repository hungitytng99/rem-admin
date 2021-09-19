
// Data Flow: Step 2

import { apiDeleteCustomerInquiry } from "data-source/inquiry";
import { apiGetCustomerInquiry } from "data-source/inquiry";
import { apiSendCustomerInquiry } from "data-source/inquiry";

// transform data to fit with UI;
export const inquiryService = {
    sendCustomerInquiry: function (params) {
        return apiSendCustomerInquiry(params).then(response => {
            return response;
        });
    },

    getCustomerInquiry: function(params) {
        return apiGetCustomerInquiry(params).then(response => {
            return response;
        })
    },

    deleteCustomerInquiry: function(id) {
        return apiDeleteCustomerInquiry(id).then(response => {
            return response;
        })
    }
   
}
