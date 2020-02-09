import axios from "axios";

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || window.location.origin,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

httpService.interceptors.response.use(
  response => Promise.resolve(response),
  e => {
    const { response } = e;
    if (!response) {
      return alert("Looks like server is down...");
    }

    const { error } = response.data;
    const [err] = response.data;
    if (!error && !err) {
      return alert("Oops, server error :(");
    }

    return Promise.reject(error ? error : err);
  }
);
