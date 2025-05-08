interface UserChatProps {
    chat: any; 
    user: any; 
}


const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
    return (
      <>Chat Users</>
    );
};

export default UserChat;