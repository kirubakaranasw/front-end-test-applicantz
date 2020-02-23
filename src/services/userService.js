import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.usernameF,
    password: user.passwordF
  });
}

export function login(username, password) {
  return http.get(apiEndpoint + "/" + username + "/" + password);
}

export function checkUser(username) {
  return http.get(apiEndpoint + "/" + username);
}
