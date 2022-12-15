const Query = {
    chatRoom: async (_, args, { ChatRoomModel }, info) => {
        const { chatRoomName, userName } = args;
        // TODO find chat room in db
        return {
            status: args.chatRoomName == "123",
            // status: false,
            chatRoom: {
                name: args.chatRoomName,
                userList: ["Tom", "Jerry"],
                messages: [{ sender: "Tom", content: "Hi" }],
            },
        };
    },
};

export default Query;