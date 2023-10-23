import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ToastNotify from "../components/ToastNotify";
import { getUserDataFromLocalStorage } from "../utils/functions";
import {
  login
 } from "../features/auth/authSlice";

import {
  Grid
} from '@mantine/core';
export const Protected = ({ children }: any) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

    if (getUserDataFromLocalStorage()) {
      dispatch(login());
      return children!
    }
  
  
    console.warn("not auth, redirect to home");
    return <Navigate to={"/auth"} replace={true}></Navigate>
};
