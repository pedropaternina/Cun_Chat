import { useFetchRecipient } from "@/app/hooks/useFetchRecipient";
import InfinityLoader from "../Loader";
import { Stack } from "react-bootstrap";

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
        src="https://th.bing.com/th/id/OIP.JYja9sPrMkY9BOHMq2IeBAHaJb?cb=iwp1&rs=1&pid=ImgDetMain"
        alt=""
      />
      <span className="user-online"></span>
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
