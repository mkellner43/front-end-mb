import Chats from "../../components/Chats";
import MessageSection from "../../components/MessageSection";
import NoChats from "../../components//MessageSection/Helpers/NoChats";
import { useSelector } from "react-redux";
import MessageSectionMobile from "../../components/MessageSection/MessageSectionMobile";
import "./style.scss";
import { Divider, Typography } from "@mui/material";

const Messages = () => {
  const friend = useSelector((state) => state.messages.friend);

  return (
    <>
      {/* big screen */}
    <div className="chat-page-container hider">
      <Chats />
      <Divider orientation='vertical'/>
      {friend ? <MessageSection /> : <NoChats />}
    </div>
    {/* small screen */}
    <div className="show !h-screen !w-screen chat-page-container">
      {friend ? <MessageSectionMobile /> : <Chats />}
    </div>
    </>
  );
};

export default Messages;


// make this look better (: like an iphone on small and like teams on big screen