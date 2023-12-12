import Cookies from "js-cookie";
import { atom } from "recoil";

export const user = atom({
    key: 'user', // unique ID (with respect to other atoms/selectors)
    default: Cookies.get('login')?true:false, // default value (aka initial value)
  });