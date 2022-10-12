import axios from "axios";

const instance = axios.create({
  baseURL: "https://greek-menu-planner.herokuapp.com/api/",
});

export default instance;
