import { createContext, useState } from "react";



export const UserNameContext = createContext();



export const UserContextProvider = (props) => {

    const [ userName, setUserName ] = useState("");
    const [ randomId, setRandomId ] = useState("");

    return(
        <UserNameContext.Provider value={{ userName, setUserName, randomId, setRandomId }}>
            {props.children}
        </UserNameContext.Provider>
    )
}







