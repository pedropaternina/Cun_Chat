'use client'

import { Key, useContext } from "react";
import { useUser } from "../components/user-provider";
import { ChatContext } from "../context/ChatContex";
import ProtectedRoute from "../components/ProtectedRoute";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import UserChat from "../components/Chat/UserChat";
import PotentialChats from "../components/Chat/PotentialChats";
import ChatBox from "../components/Chat/ChatBox";
import NavBar from "../components/WBootstrap/NavBar_Bootstrap";

const Chat = () => {
    const {user} = useUser();
    const { userChats,
        isUserChatsLoading,
        userChatsError,
        updateCurrentChat } = useContext(ChatContext)

    return (
        <ProtectedRoute>
            <NavBar></NavBar>
            <br></br>
            <Container>
                <PotentialChats></PotentialChats>
                {userChats?.length < 1 ? null : (

                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3} >
                            {isUserChatsLoading && <p>Loading Chats...</p>}
                            {userChats?.map((chat: any,index: Key | null | undefined) =>{
                                return(
                                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                                        <UserChat chat={chat} user={user}></UserChat>
                                    </div>
                                )
                            })}

                        </Stack>
                        <ChatBox></ChatBox>

                    </Stack>)}
            </Container>
          

        </ProtectedRoute>
    );
}

export default Chat;