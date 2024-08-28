import authApi from "../utils/auth_api";

export const getProductCategoryDetails =() =>{
    let data = {
      method: 'GET',
      url: '/rest/productcategory/getList',
  
    };
    return (
      authApi(data).then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    })
      )
  }