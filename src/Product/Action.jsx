import authApi from "../utils/auth_api";
import api from "../utils/api";
// import axios from 'axios';
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


export const getUnitTypeList = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/getUnitTypeList',
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

export const getvatCategory = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/vatCategory',
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

export const getexiseTax = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/exciseTax',
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


export const getProductCategoryList = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/datalist/getProductCategoryList',
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

export const getTransactionCategoryListForSalesProduct = (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/product/getTransactionCategoryListForSalesProduct',
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
        url: '/rest/product/save',
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


