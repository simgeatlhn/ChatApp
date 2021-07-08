import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

const Chat = ({ location }) => {  //location - prop

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        //ES6 SYNTAX
        //emit methodu özel bir olay oluşturmak için - özel isim , özel oda
        //specific instance
        socket.emit("join", { name, room }, () => {

        });

        return () => {
            socket.emit("disconnect"); //call event
            socket.off(); //user turn off
        }

    }, [ENDPOINT, location.search]); //useEffect calls one time - one conection


    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]); //setMessages ile messages üzerine message eklenir
        })
    }, [messages]); //en son messages return //useEffect run only return messages

    //function for sending messages- event handler
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => setMessage("")); //index.js - callback()  setMessage
        }
    }

    // console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <Messages messages={messages} name={name} />
            </div>
        </div>
    )
}

export default Chat;