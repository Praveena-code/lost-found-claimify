import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

export const saveMatchItem = (matchItem) => {
  return axios.post(`${BASE_URL}/match`, matchItem, {
    withCredentials: true,
  });
};


export const getAllMatchedItems = () => {
  return axios.get("http://localhost:9595/lostfound/list", {
    withCredentials: true
  });
};
