import "./Input.css";

//message , setMesaage , sendMessage undefined, Chat.js <Input /> da tanımlanmalı
const Input = ({ message, setMessage, sendMessage }) => (

    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            //ternary operator
            onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send Message</button>
    </form >


)

export default Input;