import authApi from "../utils/auth_api";

export const getCountryDetails =() =>{
    let data = {
      method: 'GET',
      url: '/rest/company/getCountry',
  
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