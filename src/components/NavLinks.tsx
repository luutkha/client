import { Center, Flex, Text,Box } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteUserDataFromLocalStorage } from "../utils/functions";
import authSlice from "../features/auth/authSlice";
import {
 logout
} from "../features/auth/authSlice";
type Link = {
  isActive: boolean;
  isPending: boolean;
};

const NavLinks = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    deleteUserDataFromLocalStorage();
    dispatch(logout())
    navigate("/")
  }
  return (
    <Center py={20}>
      <Flex gap={20}>
        <NavLink
          to="/"
          className={({ isActive, isPending }: Link) =>
            isPending
              ? "pending"
              : isActive
              ? "text-green-500"
              : "text-gray-400"
          }
        >
          <Text>HOME</Text>
        </NavLink>
        <NavLink
          to="contact/number"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-green-500"
              : "text-gray-400"
          }
        >
          <Text>ABOUT</Text>
        </NavLink>
       
        {isAuth && (
           <Box
          onClick={handleLogout}
           className={
                "text-gray-400"
           }
         >
           <Text>LOG OUT</Text>
         </Box>
        )}
      </Flex>
    </Center>
  );
};

export default NavLinks;
