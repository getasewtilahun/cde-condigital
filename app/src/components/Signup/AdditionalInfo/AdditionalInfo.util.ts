import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";

export const register = (value: any) =>
  axios.post(API_BASE_URI + `/user`, value);
