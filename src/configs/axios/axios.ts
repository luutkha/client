import {setupInterceptorsTo} from "./interceptor";
import axios from "axios";
const globalAxios =  setupInterceptorsTo(axios);

export default globalAxios;

