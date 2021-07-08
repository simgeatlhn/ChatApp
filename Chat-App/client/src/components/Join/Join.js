//hooks => function based components , less code , readability
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {

    //parameter -> name,setName , name simple variable name, setName simple functions
    const [name, setName] = useState("");  //empty string for initial value
    const [room, setRoom] = useState(""); //empty string for initial value

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Whats App?</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>

                {/* 
                //Link to ile button a tıkladığımızda sign bölümünden chat kısmına geçeriz
                //name ve room , Chat component dan gelir */}

                {/* http://localhost:3000/chat?name=simge&room */}

                {/* //sign up buttonuna tıklandığında Chat componentine geçiş Link to ile yapılır */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join</button>
                </Link>
            </div>
        </div >
    );

}

export default Join;