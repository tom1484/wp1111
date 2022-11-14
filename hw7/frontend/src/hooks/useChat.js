import { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"

const useChat = () => {
    const [status, setStatus] = useState({})
    const [messages, setMessages] = useState([])

    const client = new W3CWebSocket('ws://localhost:4000')

    client.onmessage = (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case "output": {
                // console.log([...messages, ...payload])
                setMessages([...messages, ...payload])
                break;
            }
            case "status": {
                setStatus(payload)
                break;
            }
            default:
                break;
        }
    }

    const sendData = async (data) => {
        client.send(JSON.stringify(data))
    }

    const sendMessage = (payload) => {
        sendData(["input", payload])
    }

    return { status, messages, sendMessage }
}

export default useChat