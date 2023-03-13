import React, { useState } from "react";
import instance from "../Redux/Thunks/AxiosInstance";

export default function useUser() {
  const [user, setUser] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(false);
  // const [ setIsLoggedIn] = useState(false);

  // function getIsLoggedIn() {
  //   return isLoggedIn;
  // }

  async function getUserInfo(token) {
    try {
      // console.log("in the try", token);
      const res = await instance.get(`auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")} || ${token}`,
        },
      });
      setUser(res?.data?.data || {});
      // console.log(res?.data?.data);
    } catch (error) {
      console.error({ error });
    }
  }

  async function loginUser({ email, password }) {
    let isLoggedIn = false;
    try {
      let response = await instance.post(
        `auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("after login", response?.data);
      localStorage.setItem("token", response.data.token);
      await getUserInfo(response.data.token);
      isLoggedIn=true;
      // setIsLoggedIn(true);
    } catch (error) {
      console.error({ error });
    }
    return isLoggedIn;
  }

  async function updateUserProfile({ name, email }) {
    let token= localStorage.getItem("token")
    let isUserUpdated=false;
    try {
      let response = await instance.put(
        `auth/updatedetails`,
        {
          name,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUserInfo(token);
      isUserUpdated=true;
    } catch (error) {
      console.error(error)
    }
    return isUserUpdated;
  }

  async function registerUser({ name, email, password, role }){
    let isLoggedIn = false;
    try{
      let response = await instance
      .post(
        `auth/register`,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      localStorage.setItem("token", response.data.token);
      await getUserInfo(response.data.token);
      isLoggedIn=true;
      // setIsLoggedIn(true);
    }
    catch(error){
      console.log(error)
    }

    return isLoggedIn
  }

  async function logoutUser(){
    try{
      localStorage.removeItem("token");
      setUser({});
    }
    catch(error){
      console.error(error)
    }
  }
  React.useEffect(() => {
    if (!Object.keys(user).length) {
      getUserInfo();
    }
  }, []);

  return { user, setUser, getUserInfo, isUserLoading, loginUser, updateUserProfile,registerUser,logoutUser };
}
