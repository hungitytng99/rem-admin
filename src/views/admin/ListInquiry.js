import React, { useEffect, useState } from "react";
import CardListInquiry from "components/Cards/CardListInquiry";
import { inquiryService } from "data-services/inquiry";
import { postService } from "data-services/post";
import { REQUEST_STATE } from "app-configs";

export default function ListInquiry(props) {
    const [listInquiry, setListInquiry] = useState([]);
    const handleDeleteInquiry = async (id) => {
        const response = await inquiryService.deleteCustomerInquiry(id);
        console.log(response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            let listInquiryTmp = [...listInquiry];
            listInquiryTmp = listInquiryTmp.filter(inquiry => {
                return inquiry.id !== id;
            })
            setListInquiry(listInquiryTmp);
        }
    }
    useEffect(() => {
        const getListInquiry = async () => {
            const listResult = await inquiryService.getCustomerInquiry();
            setListInquiry(listResult.data);
        }
        getListInquiry();
    }, [])
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="mb-0 font-semibold text-lg text-blueGray-700" >
                                        Danh sách lời nhắn khách hàng
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardListInquiry
                        listInquiry={listInquiry}
                        handleDeleteInquiry={handleDeleteInquiry}
                    />
                </div>
            </div>
        </>
    );
}
