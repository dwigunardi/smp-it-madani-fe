import React from 'react';
import axios from "axios";
import { useAuthPersist } from '../store/authPersist';
import { baseurl } from '../config/baseUrl';

const {data} = useAuthPersist()
const instance = axios.create({
    baseURL: baseurl,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data[0].credential.accessToken
    },
});

export const http = {
    fetcher: async (url) => {
        const resp = await instance.get(baseurl + url);
        return resp.data;
    },
    get: async (url, opts = {}) => {
        const resp = await instance.get(baseurl + url);
        return resp.data;
    },
    post: async (url, data, opts) => {
        const resp = await instance.post(baseurl + url, data);
        return resp.data;
    },
    put: async (url, data, opts) => {
        const resp = await instance.put(baseurl + url, data);
        return resp.data;
    },
    del: async (url, opts) => {
        const resp = await instance.delete(baseurl + url);
        return resp.data;
    },
    upload: async (url, data) => {
        let req = await instance.post(baseurl + url, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return req.data;
    },
    // uploadAntd: (args) => {
    //     const file = args.file;
    //     const request = http.upload(file)
    //         .use(AuthIntercept);
    //
    //     request
    //         .on('progress', event => {
    //             args.onProgress(event);
    //         })
    //         .then(it => {
    //             args.onSuccess(it);
    //         }).catch(err => {
    //         args.onError(err);
    //     });
    //
    //     return request;
    // },
};
