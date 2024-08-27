import authApi from "../utils/auth_api";
import api from "../utils/api";

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

export const getcountry = () => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/getcountry',
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

export const getActiveCurrencyConversion = () => {
    let data = {
        method: 'GET',
        url: '/rest/currencyConversion/getActiveCurrencyConversionList',
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

export const getContactTypes = () => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/getContactTypes',
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

export const getTaxTreatment = () => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/getTaxTreatment',
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

export const save =  (obj) => {
    let data = {
        method: 'POST',
        url: '/auth/token',
        data: obj,
    };
  return (
      api(data)
          .then((res) => {
              window['localStorage'].setItem('accessToken', res.data.token);
              window['localStorage'].setItem('language', 'en');
              // console.log(res.data.token);
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};

export const getState = (countryCode) => {
    let data = {
        method: 'GET',
        url: `/rest/datalist/getstate?countryCode=${countryCode}`,
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