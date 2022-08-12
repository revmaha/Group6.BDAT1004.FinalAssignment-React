import axios from 'axios';

export const promiseReturn = (urlData, resolve, reject) => {
  const { url, method = 'get', params = {} } = urlData;
  const methodName = axios[method];
  let updatedUrl = url;
  methodName(updatedUrl, params)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error.response);
    });
};

export const getJSON = async (url) => new Promise((resolve, reject) => promiseReturn(url, resolve, reject));

export const getAllList = async () => {
//  const url = `https://api.coindesk.com/v1/bpi/currentprice.json`;
  const url = `http://localhost:5000/one`;
  const urlData = {
    url,
    method: 'get',
  };
  return new Promise((resolve, reject) => promiseReturn(urlData, resolve, reject));
};