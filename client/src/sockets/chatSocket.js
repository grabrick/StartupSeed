import { socket } from "./socket"

export const connectToChatSocket = (data) => {
    socket.emit("connectChat", data)
}

export const leaveFromChatSocket = () => {
    socket.emit("leaveChat")
}

export const sendNewMessageSocket = (data) => {
    socket.emit("sendMessage", data)
}

export const setIsOpenChatSocket = () => {
    socket.emit("setIsOpen")
}

export const setIsCloseChatSocket = () => {
    socket.emit("setIsClose")
}

export const notificationSocket = () => {
    socket.emit('notification')
}