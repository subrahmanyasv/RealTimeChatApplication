import { create } from "zustand";

//Create a store to store all the messages, room name, if user is in room or not, if user is logged in or not and username.
const useChatStore = create((set) =>({
    messages: [],       //Store all messages.
    rooms: "",          //Store a room name.
    inRoom: false,      //Check if room is joined or not.
    userLoggedIn: false,    //Check if user has logged in.
    username: "",       //Store username.

    //Actions for updating the Store.
    setMessages: (newMessage) => set((state) =>({ messages: [...state.messages, newMessage] })),
    setRooms: (room) => set( { rooms : room }),
    setInRoom: (inroom) => set( { inRoom : inroom}),
    setUserLoggedIn: (loggedIn) => set( { userLoggedIn : loggedIn }),
    setUsername: (name) => set( { username : name }),
}));

export default useChatStore;