import axios from "axios";

const token = localStorage.getItem("accessToken");

export function getRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body,
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
      const response = await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function deleteRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function patchRequest(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
        body,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
