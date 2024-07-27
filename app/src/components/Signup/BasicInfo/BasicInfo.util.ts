import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";

export const validateEmail = (value: any) =>
  axios.get(API_BASE_URI + `/user/isValid?email=${value}`);
