import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ToastNotify from "../components/ToastNotify";
import { getUserDataFromLocalStorage } from "../utils/functions";
import {
  login
 } from "../features/auth/authSlice";
import AuthenticationForm from "./auth/AuthenticationForm/AuthenticationForm";
import ChatGroup from "./chat-group/ChatGroup";
import {
  Grid,Button, Flex
} from '@mantine/core';
import globalAxios from "../configs/axios/axios";
import { API } from "../utils/constants/api";
import { GroupChat } from "../interfaces/group-chat.interface";
const Home = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const navigate = useNavigate();
  const handleLogin = async () => {
    dispatch(login());
    ToastNotify("Successfully logged in");
  };

  const getData = async () => {
    try {
     
      
      const data = await globalAxios.get(API.GROUPS) as GroupChat[]
      console.log(data);
        setGroupChats(data)
    } catch (error) {
      console.log(error);
    }

  }
  
 useEffect(() => {
   getData();
 
 }, [])
 

  return (
    <Flex direction={"column"} gap="sm" >
     <Button onClick={()=> navigate('/group/new')}>Create Group</Button>

     <h2>List Group Chat</h2>
        {groupChats.map((item, index) => {
          return <Button onClick={() => navigate(`/group/${item._id}`)} key={index}>
            {item.name}
          </Button>
        })}
    </Flex>
  );
};

export default Home;
