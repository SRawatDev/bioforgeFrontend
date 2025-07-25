import axios from 'axios';
import Qs from 'qs';
import axiosInt from './axios.utils';
import { defaultConfig } from '../config';
async function callAPI(path:string, params:{}, method:string, data = {}, options = {}, headersObj = {}) {
    const API_ROOT = defaultConfig.baseAPIUrl;
    const url = API_ROOT + path;
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await localStorage.getItem('accessToken')}`,
        ...headersObj,
    };
    return axiosInt({
        method,
        url,
        params,
        paramsSerializer: { 
            serialize:function(params) {
             return Qs.stringify(params, { arrayFormat: 'brackets' })
           }
          },
        data,
        headers,
        ...options,
    });
}
function callAPIWithoutAuth(path:string, params:{}, method:string, data = {}, options = {}, headersObj = {}){
    const API_ROOT = defaultConfig.baseAPIUrl;
    const url = API_ROOT + path;
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headersObj,
    };
    return axiosInt({
        method,
        url,
        params,
        paramsSerializer: { 
            serialize:function(params) {
             return Qs.stringify(params, { arrayFormat: 'brackets' })
           }
          },
        data,
        headers,
        ...options,
    });
}

async function API(path:string, params:{}, method:string, data = {}, options = {}, headersObj = {}){
    const API_ROOT = defaultConfig.baseAPIUrl;
    const url = API_ROOT + path;
    const headers = {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${await localStorage.getItem('accessToken')}`,
        ...headersObj,
    };

    return axios({
        method,
        url,
        params,
        paramsSerializer: { 
            serialize:function(params) {
             return Qs.stringify(params, { arrayFormat: 'brackets' })
           }
          },
        data,
        headers,
        ...options,
    });
}


export { callAPI, callAPIWithoutAuth,API};