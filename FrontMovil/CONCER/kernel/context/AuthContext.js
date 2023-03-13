import {createContext, useState} from 'react'

/**
 * @typedef {{isAuth:boolean,setAuth:React.Dispatch<React.SetStateAction<boolean>>}} IAuthContext
 */

/**
 * @type {React.Context<IAuthContext>}
 */

export const AuthContext = createContext();


export function AuthProvider({children}) {
    const [isAuth, setAuth] = useState(false)
    return(
        <AuthContext.Provider value={{isAuth,setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}