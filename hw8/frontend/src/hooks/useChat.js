import { useRef, useState, useEffect } from 'react'

import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { CHATROOM_QUERY } from '../graphql/queries';
import { SEND_MESSAGE_QUERY, CREATE_CHATROOM_QUERY, CLEAR_MESSAGES_QUERY } from '../graphql/mutations';
import { NEW_MESSAGE_QUERY, MESSAGES_CLEARED_QUERY } from '../graphql/subscriptions';


const useChat = () => {
    const [userName, setUserName] = useState("Tom")

    const [chatRoomLoadingStatus, setChatRoomLoadingStatus] = useState('loading')
    const [chatRoomList, setChatRoomList] = useState([])
    const [activeRoomIndex, setActiveRoomIndex] = useState(-1)

    const [status, setStatus] = useState({})

    const chatboxBottomRef = useRef(null)

    const [qlGetChatRoom] = useLazyQuery(CHATROOM_QUERY)

    const [qlCreateChatRoom] = useMutation(CREATE_CHATROOM_QUERY)
    const [qlSendMessage] = useMutation(SEND_MESSAGE_QUERY)
    const [qlClearMessages] = useMutation(CLEAR_MESSAGES_QUERY)

    const { data: qlNewMessage } = useSubscription(NEW_MESSAGE_QUERY, {
        variables: { receiver: userName },
    })
    const { data: qlMessagesCleared } = useSubscription(MESSAGES_CLEARED_QUERY, {
        variables: { receiver: userName },
    })

    useEffect(() => {
        chatboxBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatRoomList])

    useEffect(() => {
        console.log(qlNewMessage)
        // TODO add new message
    }, [qlNewMessage])

    useEffect(() => {
        // console.log(qlMessagesCleared)
        // TODO clear messages
    }, [qlMessagesCleared])

    const login = (userNameToLogin) => {
        setUserName(userNameToLogin);
    }

    const onOpenChatRoomSuccess = (chatRoom) => {
        console.log(chatRoom)
        setActiveRoomIndex(chatRoomList.length)
        setChatRoomList((prev) => [...prev, chatRoom])

        setChatRoomLoadingStatus('success')
        showStatus('success', 'Chat room opened')
    }

    const onOpenChatRoomError = (error) => {
        console.log(error)
        setChatRoomLoadingStatus('error')
        showStatus('error', 'Failed to open chat room')
    }

    const createChatRoom = (chatRoomName, userList) => {
        qlCreateChatRoom({
            variables: {
                chatRoomName: chatRoomName,
                userList: userList
            }
        }).then((result) => {
            const chatRoom = result.data.createChatRoom;
            onOpenChatRoomSuccess(chatRoom)
        }).catch((error) => {
            onOpenChatRoomError(error)
        })
    }

    const openChatRoom = (chatRoomName) => {
        qlGetChatRoom({
            variables: {
                chatRoomName: chatRoomName,
                userName: userName
            }
        }).then((result) => {
            const { status, chatRoom } = result.data.chatRoom;
            if (status) {
                onOpenChatRoomSuccess(chatRoom)
            } else {
                setChatRoomLoadingStatus('not found')
            }
        }).catch((error) => {
            onOpenChatRoomError(error)
        })

        setChatRoomLoadingStatus('loading')
    }

    const removeChatRoom = (removeKey) => {
        let newChatRoomList = [];
        chatRoomList.forEach((room, key) => {
            if (key !== removeKey) {
                newChatRoomList.push(room);
            }
        })
        setChatRoomList(newChatRoomList);
        if (activeRoomIndex >= newChatRoomList.length) {
            setActiveRoomIndex(newChatRoomList.length - 1);
        }
    }

    const changeChatRoom = (newActiveRoomIndex) => {
        setActiveRoomIndex(newActiveRoomIndex);
    }

    const sendMessage = (content) => {
        qlSendMessage({
            variables: {
                chatRoomName: chatRoomList[activeRoomIndex].name,
                sender: userName,
                content: content
            }
        }).then((result) => {
            const status = result.data.addMessage;
            if (status) {
                showStatus('success', 'Message sent')
            } else {
                showStatus('error', 'Failed to send message')
            }
        }).catch((error) => {
            showStatus('error', 'Failed to send message')
        })
    }

    const clearMessages = () => {
        if (activeRoomIndex >= 0) {
            qlClearMessages({
                variables: {
                    chatRoomName: chatRoomList[activeRoomIndex].name,
                }
            }).then((result) => {
                // console.log(result)
                const status = result.data.clearMessages;
                if (status) {
                    showStatus('success', 'Message cleared')
                } else {
                    showStatus('error', 'Failed to clear message')
                }
            }).catch((error) => {
                showStatus('error', 'Failed to send message')
            })
        }
    }

    const showStatus = (type, msg) => {
        setStatus({ type: type, msg: msg });
    }

    return {
        userName, login,
        openChatRoom, createChatRoom,
        removeChatRoom, changeChatRoom,
        chatRoomLoadingStatus,
        chatRoomList, activeRoomIndex,
        sendMessage, clearMessages,
        status, showStatus,
        chatboxBottomRef,
    }
}

export default useChat