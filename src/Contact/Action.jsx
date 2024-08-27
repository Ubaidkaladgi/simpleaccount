import authApi from "../utils/auth_api";

export const getContactList = () => {
    let data = {
        method: 'GET',
        url: '/rest/contact/getContactList',
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