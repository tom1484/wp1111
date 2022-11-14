import './App.css'
import { Button, Input, message, Tag } from 'antd'

import { useState, useEffect } from 'react'
import useChat from './hooks/useChat'

function App() {
  const { status, messages, sendMessage } = useChat();
  const [username, setUsername] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content);
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status]);

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {
          messages.length === 0 ? (
            <p style={{ color: '#ccc' }}>
              No messages...
            </p>
          ) :
            messages.map(({ name, message }, index) => {
              return (
                <p key={index}>
                  <Tag color="blue">{name}</Tag>
                  {message}
                </p>
              )
            })
        }
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        enterButton="Send"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          sendMessage({ name: username, message: messageInput })
          setMessageInput("")
        }}
      ></Input.Search>
    </div>
  )
}

export default App
