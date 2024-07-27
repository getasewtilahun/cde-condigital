import { io } from "socket.io-client";
import { BASE_URI } from "../redux/ApiCall";

export const socket = io(BASE_URI, {
    auth: {
        token: localStorage.getItem("token"),
    },
});