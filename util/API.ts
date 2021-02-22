import axios from "axios";

export default axios.create({
  baseURL: "https://maniacmc.ddns.net/api",
  responseType: "json"
});