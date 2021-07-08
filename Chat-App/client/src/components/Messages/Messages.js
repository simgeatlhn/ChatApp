import "./Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message"; //Messages parent , Message child

//name current user
//render message
const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
)
export default Messages;