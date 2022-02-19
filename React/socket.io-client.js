import { useEffect, useState } from "react";
import styles from "./app.module.css";
import io from "socket.io-client";
import { v4 } from "uuid";

const socketClient = io.connect(API_ENDPOINT);
const SOCKET_CONNECTION_TIMEOUT = 10000;

const ROOM_ID = v4();

function App() {
  const [socketStatus, setSocketStatus] = useState(2); // 0 - TIMEOUT | 1 - CONNECTED | 2 - LOADING

  useEffect(() => {
    setupSockets();
    checkSocketConnection();
    return () => {
      socketClient.disconnect();
      socketClient.off();
    };
  }, []);

  const checkSocketConnection = () => {
    let interval = 0;
    const detectSocketConnection = setInterval(() => {
      interval++;
      if (socketClient.connected) {
        setSocketStatus(1);
        clearInterval(detectSocketConnection);
      }
      if (SOCKET_CONNECTION_TIMEOUT / 500 === interval) {
        socketClient.disconnect();
        socketClient.off();
        setSocketStatus(0);
        clearInterval(detectSocketConnection);
      }
    }, 500);
  };

  const setupSockets = () => {
    socketClient.emit("join", { user: "frontend", room: ROOM_ID }, () => {});
    socketClient.on("streamFromNode", (data) => {
      // Manage Data
    });
  };

  const sendData = (data) => {
    socketClient.emit("streamToNode", data);
  };

  return <div className={styles.appContainer}></div>;
}

export default App;
