import authApi from "../utils/auth_api";
import api from "../utils/api";

export const getCOAlist = () => {
    let data = {
        method: 'GET',
        url: '/rest/transactioncategory/getList',
    };
    return (
        authApi(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw err;
            })
    )
};