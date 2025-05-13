import { useContext, useState } from "react"
import { useUser } from "../user-provider"
import { ChatContext } from "@/app/context/ChatContex"
import { useFetchRecipient } from "@/app/hooks/useFetchRecipient"
import InfinityLoader from "../Loader"
import { Stack } from "react-bootstrap"
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {
    const {user} = useUser()
    const {currentChat, messages, isMessageLoading, sendTextMessage} = useContext(ChatContext)
    const [textMessage, setTextMessage] = useState("");

    /** @type {{ _id: string, name: string }} */    
    const {recipientUser} = useFetchRecipient(currentChat, user) || {};
    
    console.log("recipientUser; ",recipientUser)

    if(!recipientUser) return(
        <p style={{textAlign: "center", width: "100%"}}>
            Ninguna conversacion seleccionada....
        </p>
    )
    
    if(isMessageLoading) return(
        <InfinityLoader></InfinityLoader>
    
    )
    return (

    <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.name || "Usuario"}</strong>
        </div>
        <Stack gap={3} className="messages">
            {messages && messages.map((message, index) => 
                <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0" }`}> 
                    <span>{message.text}</span>
                    <span className="message-footer">{moment(message.createdAt).calendar()}</span> 
                </Stack>
                
            )}
        </Stack>
        <Stack direction="horizontal" gap={3} className="chat-input">
            <InputEmoji value={textMessage} onChange={setTextMessage} shouldReturn={false} shouldConvertEmojiToImage={false} fontFamily="nunito" borderColor="rgba(72,112,223, 0.3)"></InputEmoji>
            <button onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)} className="send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                </svg>            
            </button>
        </Stack>
    </Stack>
    )
}

export default ChatBox