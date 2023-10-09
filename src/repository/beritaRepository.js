import axios from "axios";
import { baseurl } from "../config/baseUrl";

const url = {
  getNews: () => `${baseurl}/news`,
  getNewsById: (slug) => `${baseurl}/news/${slug}`,
  putNews: (slug) => `${baseurl}/news/${slug}`,
  delNews: (slug) => `${baseurl}/news/${slug}`,
};

const api = {
    createBerita(body, token) {
      return axios.post(url.getNews(), body, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
      });
    },
    updateBerita(id,body, token) {
      return axios.post(url.putNews(id), body,{
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
      })
    },
    deleteBerita(id) {
      return axios.del(url.delNews(id));
    },
    useBerita(controler, token) {
      return axios.get(url.getNews(),{
        signal : controler,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
      })
    },
    useBeritaId(id, token) {
      return axios.get(url.getNewsById(id),{
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        return res.data
      })
    },
  };

  export const beritaRepository = {
    url,
    api,
  };
