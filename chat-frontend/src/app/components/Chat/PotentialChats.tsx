import { ChatContext } from "@/app/context/ChatContex";
import { useContext } from "react";
import { useUser } from "../user-provider";

const PotentialChats = () => {
    const {user} = useUser();
    const {potentialChats, createChat, onlineUsers}= useContext(ChatContext)
   
    
    return (
        <>
        <div className="all-users">
            {potentialChats && potentialChats.map((u: any,index: any) => {
                return(
                     <div className="single-user" key={index} 
                     onClick={() => createChat(user._id, u._id)}>
                    {u.name}
                    <span className={
                        onlineUsers?.some((user:any) => user?.userId === u?._id)
                            ? "user-online"
                            : "" 
                        }>

                    </span>
                </div>
                )
               
            })}
        </div>
        
        </>
    )
}

export default PotentialChats;