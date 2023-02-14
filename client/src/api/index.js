import axios from "axios";

const token = localStorage.getItem("accessToken");

export function getRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function postRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function deleteRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function patchRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
