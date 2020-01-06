import React,{useState,createContext} from 'react';

export const Context = createContext({
    login: ()=>{},
    token: null

})

const ContextProvider = (props) => {
    const [token,setToken] = useState("");
    
    const login = async (body) => {
        try{
            const response = await fetch('http://localhost:3300/graphql', {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            console.log(resData);
            setToken(resData.data.login.token);
            //console.log(resData.errors[0].message)
        }
        catch(err){
            console.log(err);
            
        }
    }

    return(
        <Context.Provider value={{login: login, token: token}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;