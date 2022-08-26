import axios from "axios";

import settings from "config/settings";

export const getApiKey = () =>
  axios
    .get(`${settings.thenticUrl}/key`)
    .then(({ data }) => data)
    .catch(console.error);

export const createContract = (data) =>
  axios
    .post(`${settings.thenticUrl}/nfts/contract`, data)
    .then(({ data }) => data)
    .catch(console.error);

export const getContracts = () =>
  axios
    .get(`${settings.thenticUrl}/contracts`)
    .then(({ data }) => data)
    .catch(console.error);
