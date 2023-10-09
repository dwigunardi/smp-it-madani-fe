import axios from "axios";
import { baseurl } from "../config/baseUrl";

const url = {
  getLogin: () => `${baseurl}/auth/login`,
  getRoles: () => `${baseurl}/auth/roles`,
  getLoginGuest: () => `${baseurl}/auth/login-as-guest`,
  putRoles: (id) => `${baseurl}/users/update-roles/${id}`,
  putPassword: (id) => `${baseurl}/users/update-password/${id}`,
  delUser: (id) => `${baseurl}/users/${id}`,
};

const api = {
    createUsers(data) {
      return axios.post(url.getUsers(), data);
    },
    updateRoles(id,data) {
      return axios.post(url.putRoles(id), data);
    },
    updatePassword(id,data) {
      return axios.post(url.putPassword(id), data);
    },
    deleteUser(id) {
      return axios.del(url.delUser(id));
    },
    useLogin(data) {
      return axios.post(url.getLogin(), data);
    },
    useLoginGuest() {
      return axios.get(url.getLoginGuest());
    },
  };

  export const usersRepository = {
    url,
    api,
  };
