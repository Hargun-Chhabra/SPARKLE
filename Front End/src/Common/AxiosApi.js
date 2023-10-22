/**
 * Author : Sakshi Chaitanya Vaidya
 * Banner No : B00917159
 * Email: sakshi.vaidya@dal.ca
 */

import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://sparkle-api.onrender.com",
  //baseURL: "http://localhost:3000/",

});

export default axiosApi;