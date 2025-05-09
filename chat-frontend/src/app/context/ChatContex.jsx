'use client'
import { createContext, useEffect, useState } from "react";
import {baseUrl, getRequest} from '../utils/service'
import { useUser } from "../components/user-provider";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const { user, setUser } = useUser();
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const getUserChats = async() => {
            if (user?._id){
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const response = await getRequest(`${baseUrl}/chat/${user?._id}`)
                                
                setIsUserChatsLoading(false)
                if(response.error){
                    return setUserChatsError(response)
                }

                setUserChats(response)
            }
        }
        getUserChats()
    }, [user])


    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError
    }}>
        {children}</ChatContext.Provider>
}