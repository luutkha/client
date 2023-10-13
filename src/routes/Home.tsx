import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ToastNotify from "../components/ToastNotify";
import { getUserDataFromLocalStorage } from "../utils/functions";
import {
  login
 } from "../features/auth/authSlice";
import AuthenticationForm from "./auth/AuthenticationForm/AuthenticationForm";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const handleLogin = async () => {
    dispatch(login());
    ToastNotify("Successfully logged in");
  };

  // const getData = async () => {
  //   try {
  //     const data1 = await  globalAxios.post('http://localhost:3000/v1/auth/login',{
  //       "email": "luutkha@gmail.com",
  //       "password": "123456"
  //   } )
  //     console.log(data1);
      
  //     const data = await  globalAxios.get('http://localhost:3000/v1/users/6527a76eb27edc69e88bb64f')
  //     console.log(data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }
  
//  useEffect(() => {
//    getData();
 
//  }, [])
 const navigate = useNavigate()
 
useEffect(() => {

  if(getUserDataFromLocalStorage()) {    
      dispatch(login());   
  }
},[])
  return (
    <div>

      {!isAuth ? <AuthenticationForm/> : 'Welcome'}
    </div>
  );
};

export default Home;
