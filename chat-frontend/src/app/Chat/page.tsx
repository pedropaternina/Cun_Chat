'use client'

import { Key, useContext } from "react";
import { useUser } from "../components/user-provider";
import { ChatContext } from "../context/ChatContex";
import ProtectedRoute from "../components/ProtectedRoute";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import UserChat from "../components/Chat/UserChat";

const Chat = () => {
    const {user} = useUser();
    const { userChats,
        isUserChatsLoading,
        userChatsError } = useContext(ChatContext)

    console.log("UserChats", userChats);

    return (
        <ProtectedRoute>
       
            <Container>
                {userChats?.length < 1 ? null : (

                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3} >
                            {isUserChatsLoading && <p>Loading Chats...</p>}
                            {userChats?.map((chat: any,index: Key | null | undefined) =>{
                                return(
                                    <div key={index}>
                                        <UserChat chat={chat} user={user}></UserChat>
                                    </div>
                                )
                            })}

                        </Stack>
                        <p>ChatBox</p>

                    </Stack>)}
            </Container>
          

        </ProtectedRoute>
    );
}

export default Chat;