import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        console.log("Socket Connected:", socket.id);

        socket.on("join-show", (showId) => {

            socket.join(`show:${showId}`);

            console.log(`${socket.id} joined show:${showId}`);

        });

        socket.on("disconnect", () => {

            console.log(socket.id, "Disconnected");

        });

    });

    return io;
};

export const getIO = () => {

    if (!io)
        throw new Error("Socket not initialized");

    return io;
};

 