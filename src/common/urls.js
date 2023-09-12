import axios from "axios";

export const POSTS = 'http://localhost:7070/posts'

export const fetch = (url, method, data) => {
  return axios[method](url, data)
    .then(res => res.data)
    .catch(e => console.log(e))
}
