import * as React from "react";
import useUser from "./useUser";

const UserContext = React.createContext({});

export function UserProvider({ children }) {
  const {
    user,
    setUser,
    getUserInfo,
    isUserLoading,
    loginUser,
    updateUserProfile,
    registerUser,
    logoutUser,
  } = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUserProvider = () => {
    const ctx = React.useContext(UserContext)
    if(!ctx) {
        console.log('context error')
    }
    return ctx
}