import api from "../utils/api";
import authApi from "../utils/auth_api";
 
 
export const loginIn =  (obj) => {
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



export const getCompanyDetails =() =>{
  let data = {
    method: 'GET',
    url: '/rest/company/getCompanyDetails',

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


export const getUserDetails =() =>{
  let data = {
    method: 'GET',
    url: '/rest/user/current',

  };
  return (
    authApi(data).then((res) => {
    return res;
  })
  .catch((err) => {
    throw err;
  })
    )
};

// export const getCountryDetails =() =>{
//   let data = {
//     method: 'GET',
//     url: '/rest/company/getCountry',

//   };
//   return (
//     authApi(data).then((res) => {
//     return res;
//   })
//   .catch((err) => {
//     throw err;
//   })
//     )
// }