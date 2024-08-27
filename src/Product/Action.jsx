import authApi from "../utils/auth_api";
export const getProductList = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/product/getList',
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