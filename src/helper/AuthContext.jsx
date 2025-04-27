import { createContext, useContext, useState } from "react"
import { getToken, removeToken, saveToken } from "./localstorage";



const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    //Variables
    const [token, setToken] = useState(getToken());

    // Authentication info
    // User Info

    // user Login
    const loginUser=(token)=>{
        setToken(token);
        saveToken(token);
    }

    // logout user
    const logoutUser=()=>{
        setToken(null);
        removeToken();


    }

    return <AuthContext.Provider
        value={{
            token,
            setToken,
            loginUser,
            logoutUser
        }}
    >
        {children}
    </AuthContext.Provider>

}

export const useAuth=()=> useContext(AuthContext)
