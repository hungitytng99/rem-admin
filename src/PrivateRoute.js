import { REQUEST_STATE } from "app-configs";
import FullPageLoading from "components/Loading/FullPageLoading";
import { inquiryService } from "data-services/inquiry";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
    const [isAuth, setIsAuth] = useState(0);
    const { component: Component, ...rest } = props;
    React.useEffect(() => {
        async function validateToken() {
            const accessToken = Cookies.get('token');
            if (accessToken) {
                const res = await inquiryService.getCustomerInquiry();
                if (res.state === REQUEST_STATE.SUCCESS) {
                    setIsAuth(1);
                } else if (res.state === REQUEST_STATE.ERROR) {
                    Cookies.remove('token');
                    setIsAuth(2)
                }
            } else {
                setIsAuth(2);
            }
        }
        validateToken();
    }, [isAuth]);
    switch (isAuth) {
        case 0:
            return <FullPageLoading hidden={true} />
        case 1:
            return <Route {...rest} render={props => (
                <Component {...props} />
            )} />
        case 2:
            return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />;
    }
}