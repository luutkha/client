import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { isNil, isNull } from "lodash";
import { getCurrentUserInfo } from "../../utils/functions";
import { ErrorResponse } from "../../interfaces/api.interface";
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig  => {
    if(isNil(config.headers.Authorization)){
        const userInfo = getCurrentUserInfo()
        if(!isNull(userInfo)){
            config.headers.Authorization = `Bearer ${userInfo.token.accessToken}`
        }
    }
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response.data;
}
const handleError = (error: AxiosError)=> {
    if(error){
        const response = error.response?.data as ErrorResponse
        const {message, code} = response 

       switch (code) {
        case 401:
            
            break;
       
        default:
            break;
       }
    }
}
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[response error] [${JSON.stringify(error)}]`);

    console.log(error)
    handleError(error)
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    console.log('setupInterceptorsTo');
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}