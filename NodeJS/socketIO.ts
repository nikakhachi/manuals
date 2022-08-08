import { Server } from "http";
import { Socket } from "socket.io";
import * as SocketIO from "socket.io";
import dotenv from "dotenv";
dotenv.config();

let ioServer: Socket;

const setupSockets = async (server: Server) => {
  ioServer = await SocketIO(server, {
    cors: {
      origin: process.env.SOCKET_ORIGIN_URLS?.split(","),
    },
  });
};

const socketConnection = async (server: Server) => {
  await setupSockets(server);
  ioServer.on("connection", (socket: Socket) => {
    socket.on("join", async ({ user, room }: IJoiningProps) => {
      socket.join(room);
      // GET DATA FROM FRONT-END
      socket.on("streamToNode", async ({ data }: IIncomingStreamFromFront) => {
        // SEND DATA TO FRONT-END
        ioServer.to(room).emit(streamName, data);
      });
    });
    socket.on("disconnect", () => {
      // Disconnect
    });
  });
};

export default socketConnection;
