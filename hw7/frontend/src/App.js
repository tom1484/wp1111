import './App.css';
import { Button, Input, message, Tag, Tabs, Modal } from 'antd';

import { useState, useEffect } from 'react';
import useChat from './hooks/useChat';

function App() {
  const {
    user, login,
    roomList, openRoom, removeRoom,
    activeRoom, changeRoom,
    status, sendMessage, clearMessages,
    chatboxBottomRef,
  } = useChat();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [newTargetUser, setNewTargetUser] = useState("");
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (user === "") {
      setLoginModalOpen(true);
    }
  }, []);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg, duration: 0.5,
      }
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content);
          break;
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status]);

  const roomTabOnEdit = (targetKey, action) => {
    if (action === "add") {
      setAddRoomModalOpen(true);
    }
    else if (action === "remove") {
      removeRoom(targetKey);
    }
  }

  return (
    <div className="App">
      <Modal
        title="Login"
        open={loginModalOpen}
        footer={null}
      >
        <Input.Search
          enterButton="Login"
          placeholder="Enter username here..."
          allowClear="true"
          onSearch={(username) => {
            login(username);
            setLoginModalOpen(false);
          }}
        ></Input.Search>
      </Modal>
      <Modal
        title="Open New Chat"
        open={addRoomModalOpen}
        footer={null}
      >
        <Input.Search
          enterButton="Open"
          placeholder="Enter another user here..."
          value={newTargetUser}
          onChange={(e) => setNewTargetUser(e.target.value)}
          onSearch={() => {
            openRoom(newTargetUser);
            setAddRoomModalOpen(false);
            setNewTargetUser("");
          }}
        ></Input.Search>
      </Modal>
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages-container">
        <Tabs
          type="editable-card"
          onChange={(newActiveRoom) => changeRoom(newActiveRoom)}
          activeKey={activeRoom}
          onEdit={roomTabOnEdit}
          items={
            roomList.map((room, roomKey) => ({
              label: room.targetUser, key: roomKey,
              closable: true,
              children: (
                <div className="App-messages">
                  {
                    room.messages.length === 0 ? (
                      <p style={{ color: '#ccc' }}>
                        No messages...
                      </p>
                    ) :
                      room.messages.map(({ name, message }, index) => {
                        return (
                          <div key={index} className='App-message-container'>
                            <p
                              className="App-message"
                              style={name === user ? { margin: "auto", marginRight: "0" } : { margin: "0" }}
                            >
                              {message}
                            </p>
                          </div>
                        );
                      })
                  }
                  <div ref={chatboxBottomRef} />
                </div>
              )
            }))
          }
        >
        </Tabs>
      </div >
      <Input.Search
        enterButton="Send"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          sendMessage({ name: user, message: messageInput });
          setMessageInput("");
        }}
      ></Input.Search>
    </div >
  );
};

export default App;
