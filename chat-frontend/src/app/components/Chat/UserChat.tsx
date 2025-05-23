import { useFetchRecipient } from "@/app/hooks/useFetchRecipient";
import InfinityLoader from "../Loader";
import { Stack } from "react-bootstrap";
import { useContext } from "react";
import { ChatContext } from "@/app/context/ChatContex";

interface UserChatProps {
  chat: any;
  user: any;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}


const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);

  if(!recipientUser){
    return <InfinityLoader></InfinityLoader>
  }
  const recipient = recipientUser as unknown as User;
  console.log(recipient?.name)
  const {onlineUsers} = useContext(ChatContext);
  const isOnline =  onlineUsers?.some((user:any) => user?.userId === recipientUser?._id)
  
  return (
    <Stack
  role="button"
  direction="horizontal"
  gap={3}
  className="user-card align-items-center p-2 justify-content-between"
>
  <div className="d-flex align-items-center">
    <div className="position-relative me-2">
      <img
        src="https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
        alt=""
      />
      <span className={isOnline ?"user-online" : ""}></span>
    </div>
    <div className="text-content">
      <div className="name" style={{ color: "black" }}>
        {recipient?.name}
      </div>
      <div className="text">Text Message</div>
    </div>
  </div>

  <div className="d-flex flex-column align-items-end justify-content-between">
    <div className="date">12/12/2025</div>
    <div className="this-user-notifications mt-1">2</div>
  </div>
</Stack>
  );
};

export default UserChat;
