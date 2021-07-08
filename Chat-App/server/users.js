const users = [];

const addUser = ({ id, name, room }) => {
    //Trim( ) metodu, kendisini çağıran string tipinde değişkenin içerisindeki veriyi alır. 

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //if user second log
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: "Username is taken" };
    }

    //create a user
    const user = { id, name, room };

    users.push(user); //push user new array
    return { user } //user pushed
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

//4 functions export
module.exports = { addUser, removeUser, getUser, getUsersInRoom };