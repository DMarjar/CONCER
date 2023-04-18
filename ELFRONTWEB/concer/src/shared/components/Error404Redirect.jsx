import { useEffect } from "react";



export const Error404Redirect = () => {

    useEffect(() => {
        window.location.href = "/404";
    }, []);

};

export default Error404Redirect;