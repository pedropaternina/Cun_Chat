'use client'
import { createContext, use, useCallback, useEffect, useState } from "react";
import {baseUrl, getRequest, postRequest} from '../utils/service'
import { useUser } from "../components/user-provider";
import {io} from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const { user, setUser } = useUser();
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrenChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setMessagesLoading] = useState(null);
    const [messagesError, setMessageError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    console.log("OnlineUsers: ", onlineUsers)

    //activar el socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)
        
        return () => {
            newSocket.disconnect()
        }
    }, [user])

    useEffect(() => {
        if (!socket || !user?._id) return;

        socket.emit("addNewUser", user._id);

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket, user]);

    //send message
      useEffect(() => {
        if (!socket || !user?._id) return;

        const recipientId = currentChat.menbers.find((id) => id !== user._id);
        socket.emit("sendMessage", {...newMessage, recipientId});
    }, [newMessage]);

    //recivir mensages
    useEffect(() => {
        if (!socket || !user?._id) return;

        socket.on("getMessage", res => {
            if(currentChat?._id !== res.chatId) return

            setMessages((prev) => [...prev, res])

        })

        return () => {
            socket.off("getMessage")
        }
    }, [socket,currentChat]);

    useEffect(() => {
        const getUsers = async() => {
            const response = await getRequest(`${baseUrl}/users`)
            if(response?.error){
                return console.log("Error llamando a usuarios", response)
            }

            const pChats = response?.filter((u) => {
                let isChatCreated = false
                if(user?._id === u._id) return false

                if(userChats){
                   isChatCreated = userChats?.some((chat) => {
                        return chat?.menbers[0] === u._id || chat?.menbers[1] === u._id
                    })
                }
                
                return !isChatCreated
            })
            setPotentialChats(pChats)
        }

        getUsers()
    },[userChats])


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

     useEffect(() => {
        const getMessaages = async() => {
          
                setMessagesLoading(true)
                setMessageError(null)
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
                                
                setMessagesLoading(false)
                if(response.error){
                    return setMessageError(response)
                }

                setMessages(response)
            
        }
        getMessaages()
    }, [currentChat])


    const sendTextMessage = useCallback( async(textMessage, sender, currentChatId, setTextMessage) => {
        if(!textMessage) return console.log("You must type something...")

        const response = await postRequest(`${baseUrl}/messages`, {
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        })

        if(response.error){
                    return setSendTextMessageError(response)
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")
    },[])


    const updateCurrentChat = useCallback((chat) => {
        setCurrenChat(chat)
    },[])



    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chat/`, {
            firstId,
            secondId
        })
        if(response?.error){
            return console.log("Error creating chat", response)
        }

        setUserChats((prev) => [...prev, response]);

    },[])

    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessageLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
    }}>
        {children}</ChatContext.Provider>
}