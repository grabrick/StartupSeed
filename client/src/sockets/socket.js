import * as io from "socket.io-client";

// export const socket = io.connect("http://localhost:5000");
export const socket = io.connect("/socket.io");

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});