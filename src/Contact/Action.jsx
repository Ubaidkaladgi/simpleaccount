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
        url: '/rest/contact/save',
        data: obj,
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

export const getContactCouunt = (contactId) => {
    let data = {
        method: 'GET',
        url: `/rest/contact/getInvoicesCountForContact/?contactId=${contactId}`,
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

export const getdeleteContact = (contactId) => {
    let data = {
        method: 'DELETE',
        url: `/rest/contact/delete?id=${contactId}`,
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

export const getUpdateContact = (contactId) => {
    let data = {
        method: 'GET',
        url: `/rest/contact/getContactById?contactId=${contactId}`,
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