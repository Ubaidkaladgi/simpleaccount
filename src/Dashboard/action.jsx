import api from "../utils/api";
import authApi from "../utils/auth_api";
 
export const getCurrency = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/currency/getcurrency',
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
 
export const getCountryDetails = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/company/getList',
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
