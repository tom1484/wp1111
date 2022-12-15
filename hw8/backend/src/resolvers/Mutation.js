const Mutation = {
    async createChatRoom(_, { inputData }, { ChatRoomModel }) {
        const { chatRoomName, userList } = inputData;
        // TODO create chat room in db
        return {
            name: chatRoomName,
            userList: ["Tom", "Jerry"],
            messages: [{ sender: "Tom", content: "Hi" }],
        };
    },
    async clearMessages(_, { inputData }, { ChatRoomModel, pubsub }) {
        const { chatRoomName } = inputData;
        // TODO find chat room in db and clear messages
        const userList = ["Tom", "Jerry"];
        for (let user of userList) {
            pubsub.publish(`messagesCleared`, user, true);
        }
        return true;
    },
    async addMessage(_, { inputData }, { ChatRoomModel, pubsub }) {
        const { chatRoomName, sender, content } = inputData;
        // TODO find chat room in db and add message
        const userList = ["Tom", "Jerry"];
        for (let user of userList) {
            pubsub.publish(`newMessage`, user, {
                sender: sender, content: content,
            });
        }
        return true;
    },
};

export default Mutation;