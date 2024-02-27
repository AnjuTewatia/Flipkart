import React, {useState} from 'react';
import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import {BASE_URL} from './baseUrl';
import {useAppContext} from '../Components/AppContext';
import {getLocalLoginDetail} from './functions';
import Toast from 'react-native-toast-message';

const useFetch = (url, config) => {
  const {setIsUserLogin, setApiMsg, userData} = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [response, setResponse] = useState(undefined);

  const clearUser = () => {};
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  const newurl = `${url}`;

  const loadQuery = async (data, rest) => {
    setLoading(true);
    const userToken = userData?.token;
    const headers = !userToken
      ? {}
      : {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        };

    return new Promise((resolve, reject) => {
      instance({
        url: newurl,
        ...config,
        headers,
        data,
        ...rest,
      })
        .then(response => {
          console.log('headers', headers);
          if (response.data.status === 200) {
            setError(undefined);
            setResponse(response.data);
            resolve(response.data);
            setLoading(false);
          } else if (
            response?.data?.code === 401 ||
            response?.data?.code === 403
          ) {
            clearUser();
          } else {
            setError(response.data);
            resolve(response.data);
            setLoading(false);
          }
        })
        .catch(e => {
          const resData = e.response.data;
          console.log('error ==>', resData);
          if (resData?.status === 400) {
            setError(e?.response);
            Toast.show({
              type: 'error',
              text1: resData?.message ?? resData?.error,
            });
          } else if (resData.code === 401 || resData.code === 403) {
            clearUser();
          } else if (resData.code === 101) {
            setApiMsg(resData);
            setDeactivatedModal(true);
          } else {
            setResponse(null);
            setError(e.response);
            reject(e.response);
          }
          setLoading(false);
        });
    });
  };

  return [loadQuery, {response, loading, error}];
};

export default useFetch;
